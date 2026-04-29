import { Subject, BehaviorSubject, of, concat } from 'rxjs';
import { scan, map, switchMap, catchError, filter, take, tap } from 'rxjs/operators';
import { extractInsights, generateHooks, generatePostParts, Insights } from './geminiService';

export interface PostState {
  isExtracting: boolean;
  insights: Insights | null;
  hooks: {type: string, text: string}[] | null;
  isGeneratingHooks: boolean;
  selectedHook: string | null;
  streamingBody: string;
  isGeneratingBody: boolean;
  error: string | null;
}

const initialState: PostState = {
  isExtracting: false,
  insights: null,
  hooks: null,
  isGeneratingHooks: false,
  selectedHook: null,
  streamingBody: '',
  isGeneratingBody: false,
  error: null,
};

export class GhostWriterPipeline {
  private state$ = new BehaviorSubject<PostState>(initialState);
  private inputAction$ = new Subject<string>();
  private selectHookAction$ = new Subject<string>();

  constructor() {
    // Pipeline 1: Input -> Insights -> Hooks
    this.inputAction$.pipe(
      tap(() => this.updateState({ ...initialState, isExtracting: true })),
      switchMap(text => 
        extractInsights(text).pipe(
          // Accumulate raw streaming string for the UI if needed, 
          // but we eventually need the parsed JSON.
          // For simplicity, we'll wait for full insight extraction to trigger hooks.
          scan((acc, val) => acc + val, ''),
          // Take the last value (full JSON string)
          catchError(err => {
            this.updateState({ error: 'Failed to extract insights' });
            return of(null);
          })
        )
      ),
      filter((jsonStr): jsonStr is string => !!jsonStr),
      map(jsonStr => {
        try {
          // Attempt to extract JSON from possible markdown wrap
          const match = jsonStr.match(/\{.*\}/s);
          return JSON.parse(match ? match[0] : jsonStr) as Insights;
        } catch (e) {
          console.error("JSON Parse Error", e);
          return null;
        }
      }),
      filter((insights): insights is Insights => !!insights),
      tap(insights => this.updateState({ insights, isExtracting: false, isGeneratingHooks: true })),
      switchMap(insights => 
        generateHooks(insights).pipe(
          tap(hooks => this.updateState({ hooks, isGeneratingHooks: false })),
          catchError(err => {
            this.updateState({ error: 'Failed to generate hooks', isGeneratingHooks: false });
            return of([]);
          })
        )
      )
    ).subscribe();

    // Pipeline 2: Selected Hook -> Body & Closer
    this.selectHookAction$.pipe(
      tap(hook => this.updateState({ selectedHook: hook, isGeneratingBody: true, streamingBody: '' })),
      switchMap(hook => {
        const insights = this.state$.value.insights;
        if (!insights) return of('');
        return generatePostParts(hook, insights).pipe(
          tap({
            next: chunk => this.updateState({ 
              streamingBody: this.state$.value.streamingBody + chunk 
            }),
            complete: () => this.updateState({ isGeneratingBody: false }),
            error: () => this.updateState({ error: 'Failed to generate post body', isGeneratingBody: false })
          })
        );
      })
    ).subscribe();
  }

  // API
  startPipeline(text: string) {
    this.inputAction$.next(text);
  }

  selectHook(hook: string) {
    this.selectHookAction$.next(hook);
  }

  reset() {
    this.updateState(initialState);
  }

  getState$() {
    return this.state$.asObservable();
  }

  private updateState(patch: Partial<PostState>) {
    this.state$.next({ ...this.state$.value, ...patch });
  }
}
