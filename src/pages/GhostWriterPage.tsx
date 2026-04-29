import { useState, useEffect, useRef } from 'react';
import { GhostWriterPipeline, PostState } from '../services/ghostwriterPipeline';
import './GhostWriterPage.css';

const GhostWriterPage = () => {
  const [pipeline] = useState(() => new GhostWriterPipeline());
  const [state, setState] = useState<PostState | null>(null);
  const [inputContent, setInputContent] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sub = pipeline.getState$().subscribe(s => {
      setState(s);
    });
    return () => sub.unsubscribe();
  }, [pipeline]);

  useEffect(() => {
    // Auto-scroll to bottom of streaming body
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state?.streamingBody]);

  const handleStart = () => {
    if (!inputContent.trim()) return;
    pipeline.startPipeline(inputContent);
  };

  const handleHookSelect = (hook: string) => {
    pipeline.selectHook(hook);
  };

  const handleCopy = () => {
    if (!state?.streamingBody && !state?.selectedHook) return;
    const fullPost = `${state.selectedHook}\n\n${state.streamingBody}`;
    navigator.clipboard.writeText(fullPost);
    alert('Post copied to clipboard! 🚀');
  };

  return (
    <div className="ghostwriter-page">
      <div className="container tool-grid">
        
        {/* Left Column: Input & Controls */}
        <div className="tool-input-area animate-in">
          <header className="tool-header">
            <h1 className="gradient-text">GhostWriter AI</h1>
            <p className="subtitle">Drop your transcript and let the 1-3-1 method do the work.</p>
          </header>

          <div className="input-card glass-card">
            <textarea 
              placeholder="Paste your video transcript or blog content here..."
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              disabled={state?.isExtracting || state?.isGeneratingHooks}
            />
            <div className="tool-actions">
              <button 
                className="btn-primary" 
                onClick={handleStart}
                disabled={!inputContent.trim() || state?.isExtracting || state?.isGeneratingHooks}
              >
                {state?.isExtracting ? 'Extracting Gold...' : 'Generate Hooks'}
              </button>
              {state?.insights && (
                <button className="btn-secondary" onClick={() => pipeline.reset()}>Reset</button>
              )}
            </div>
          </div>

          {state?.error && (
            <div className="error-message glass-card">
              <span className="error-icon">⚠️</span>
              <p>{state.error}</p>
            </div>
          )}

          {/* Module 1: Insights (Only show if extracted or extracting) */}
          {(state?.isExtracting || state?.insights) && (
            <div className="insights-view animate-in">
              <h3>💎 The Gold Extracted</h3>
              <div className="insights-grid">
                <div className="insight-item glass-card">
                  <label>Contradiction</label>
                  {state.isExtracting && !state.insights ? (
                    <div className="skeleton line-mid"></div>
                  ) : (
                    <p>{state.insights?.contradiction}</p>
                  )}
                </div>
                <div className="insight-item glass-card">
                  <label>Stat/Proof</label>
                  {state.isExtracting && !state.insights ? (
                    <div className="skeleton line-short"></div>
                  ) : (
                    <p>{state.insights?.statProof}</p>
                  )}
                </div>
                <div className="insight-item glass-card">
                  <label>Punchline</label>
                  {state.isExtracting && !state.insights ? (
                    <div className="skeleton line-long"></div>
                  ) : (
                    <p>{state.insights?.punchline}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Hooks & Output */}
        <div className="tool-output-area">
          {/* Module 2: Hook Generator */}
          {(state?.isGeneratingHooks || state?.hooks) && (
            <div className="hooks-view animate-in">
              <h3>🎣 Choose your angle</h3>
              <div className="hooks-grid">
                {state.isGeneratingHooks ? (
                  [1, 2, 3].map(i => (
                    <div key={i} className="hook-card glass-card skeleton-card">
                      <div className="skeleton line-full"></div>
                      <div className="skeleton line-mid"></div>
                    </div>
                  ))
                ) : (
                  state.hooks?.map((hook, i) => (
                    <button 
                      key={i} 
                      className={`hook-card glass-card ${state.selectedHook === hook.text ? 'selected' : ''}`}
                      onClick={() => handleHookSelect(hook.text)}
                      disabled={state.isGeneratingBody}
                    >
                      <span className="hook-badge">{hook.type}</span>
                      <p>{hook.text}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Module 3 & 4: Body & Closer */}
          {(state?.selectedHook) && (
            <div className="body-view animate-in">
              <div className="body-header">
                <h3>✍️ Final Post Architect</h3>
                <button 
                  className="btn-secondary copy-btn" 
                  onClick={handleCopy}
                  disabled={state.isGeneratingBody}
                >
                  Copy to Clipboard
                </button>
              </div>
              <div className="post-container glass-card" ref={scrollRef}>
                <div className="post-content">
                  <div className="post-hook">{state.selectedHook}</div>
                  <div className="post-body">
                    {state.streamingBody}
                    {state.isGeneratingBody && <span className="cursor-blink">|</span>}
                  </div>
                </div>
              </div>
              <p className="style-guide-hint">1-3-1 Method • Grade 6 Level • AI-Free Vocab</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default GhostWriterPage;
