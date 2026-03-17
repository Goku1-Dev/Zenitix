import { items, addItem, removeItem, clearItems } from "./ListDemo.state";

export default function ListDemo() {
  let inputVal = "";

  const handleAdd = () => {
    if (!inputVal.trim()) return;
    addItem(inputVal);
  };

  return (
    <div class="demo-module">

      {/* ── Doc pane ── */}
      <div class="demo-doc-pane">
        <div class="demo-section-label">Documentation</div>

        <h2 class="doc-heading">Reactive Collections</h2>

        <p class="doc-body">
          Managing lists of data is often where reactivity engines struggle with performance. Traditional
          frameworks frequently re-render entire lists when a single item changes, or require complex
          "keys" to keep track of elements. Our engine simplifies this by treating collections as
          first-class reactive citizens.
        </p>
        <p class="doc-body">
          When you use <code>.map()</code> in your JSX, the compiler doesn't just run a loop; it sets
          up a <strong>Collection Observer</strong>. This observer monitors the array for mutations.
          Because we use immutable patterns (like the spread operator) for updates, the engine can
          quickly identify that a new array reference has been provided and perform its magic.
        </p>

        <div class="doc-subheading">Efficient Reconciliation</div>
        <p class="doc-body">
          When a list is updated, the engine performs a "diff-less" reconciliation. Instead of recreating
          the entire DOM structure, it compares the new array with the old one. It strategically adds,
          removes, or moves elements only where necessary. This preserves important UI state like{" "}
          <strong>input focus</strong> and <strong>scroll position</strong> within list items.
        </p>

        <div class="tip-card">
          <strong>Internal Logic:</strong> The engine uses a persistent mapping between your data objects
          and their corresponding DOM nodes. This means that if you move an item from the bottom of a
          list to the top, the DOM node is physically moved rather than being destroyed and recreated.
        </div>

        <div class="doc-subheading">Zero-Boilerplate Collections</div>
        <p class="doc-body">
          Notice that there are no special "List Objects" or "ArrayList" wrappers. You use standard
          JavaScript arrays. The reactivity is injected at the declaration site in your{" "}
          <code>.state.ts</code> file, making the data layer stay pure and easy to test.
        </p>
      </div>

      {/* ── Demo pane ── */}
      <div class="demo-demo-pane">
        <div class="demo-section-label">Live Example</div>

        {/* Monitor */}
        <div class="monitor-card">
          <div class="monitor-card-top">
            <div class="monitor-meta">
              <div class="monitor-tag">
                <div class="monitor-pulse" />
                <span class="monitor-tag-text">Action Monitor</span>
              </div>
              <div class="monitor-title">Collection Analytics</div>
            </div>
          </div>
          <div class="monitor-grid">
            <div class="monitor-cell">
              <div class="monitor-label">Total Items</div>
              <div class="monitor-value large">{items.length}</div>
            </div>
            <div class="monitor-cell">
              <div class="monitor-label">Tracking Status</div>
              <div class="monitor-value accent">OBSERVING MUTATIONS</div>
            </div>
          </div>
        </div>

        {/* Input row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <input
            type="text"
            class="demo-input"
            style={{ flex: 1, minWidth: '140px' }}
            placeholder="What needs to be done?"
            onInput={(e: any) => (inputVal = e.target.value)}
          />
          <button class="demo-btn primary" onClick={handleAdd}>Add</button>
          <button class="demo-btn" onClick={() => clearItems()}>Clear All</button>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '36px' }}>
          {items.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-dim)', border: '1px dashed var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '.04em' }}>
              No items. Add some above!
            </div>
          ) : items.map((item: any) => (
            <div class="list-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                <div class="list-item-dot" />
                <span style={{ fontSize: '13px', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.text}
                </span>
              </div>
              <button class="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>

        {/* Code blocks */}
        <div class="demo-section">
          <div class="demo-section-label">State Logic</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>ListDemo.state.ts</span></div>
            <div class="demo-code-content">
              <span class="highlight-comment">// Reactive collections: arrays that track mutations</span>{"\n"}
              <span class="highlight-keyword">export let</span> items = [];{"\n\n"}
              <span class="highlight-comment">// Immutable updates trigger reactive observers</span>{"\n"}
              <span class="highlight-keyword">export function</span> <span class="highlight-func">addItem</span>(text) {"{"}{"\n"}
              {"  "}items = [...items, {"{"} id: Date.now(), text {"}"}];{"\n"}
              {"}"}
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section-label">UI Mapping</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>ListDemo.tsx</span></div>
            <div class="demo-code-content">
              <span class="highlight-comment">// Standard .map() → Collection Observer</span>{"\n"}
              {"{"}items.<span class="highlight-func">map</span>(item =&gt; ({"\n"}
              {"  "}&lt;<span class="highlight-keyword">div</span>&gt;{"{"}item.text{"}"}&lt;/<span class="highlight-keyword">div</span>&gt;{"\n"}
              ))
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}