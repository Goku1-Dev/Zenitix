import { count, increment, reset } from "./SignalsDemo.state";

export default function SignalsDemo() {
  return (
    <div class="demo-module">

      {/* ── Doc pane ── */}
      <div class="demo-doc-pane">
        <div class="demo-section-label">Documentation</div>

        <h2 class="doc-heading">The Core Philosophy</h2>

        <p class="doc-body">
          At the heart of this engine lies the concept of <strong>Signals</strong>. Unlike traditional
          state management libraries that require complex "stores" or "actions", signals are simple,
          atomic values that are aware of their context. When you define a variable in a state file,
          it becomes a living entity that knows exactly which parts of your UI depend on it.
        </p>
        <p class="doc-body">
          This approach eliminates the need for virtual DOM diffing. While other frameworks must compare
          entire trees of elements to find changes, our engine performs <strong>granular DOM updates</strong>.
          If a single number changes, only the exact text node containing that number is touched in the real DOM.
        </p>

        <div class="doc-subheading">Automatic Dependency Tracking</div>
        <p class="doc-body">
          The most powerful feature of signals is their transparency. You don't need to manually subscribe
          to updates or list dependencies. When a component reads a signal during its execution, a "link"
          is automatically established.
        </p>

        <div class="tip-card">
          <strong>Fine-Grained Reactivity:</strong> The engine tracks reactivity at the expression level.
          If you have a component with ten reactive values and only one changes, the remaining nine nodes
          are never even looked at.
        </div>

        <div class="doc-subheading">Zero-Boilerplate State</div>
        <p class="doc-body">
          By leveraging a custom Vite plugin, we transform standard JavaScript <code>export let</code>{" "}
          declarations into signals. This means you write "normal" code, and the engine handles the
          complexity of reactive wrapping, proxying, and notification behind the scenes.
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
              <div class="monitor-title">Atomic Signal Track</div>
            </div>
            <div class="monitor-actions">
              <button class="demo-btn primary" onClick={() => increment()}>Increment</button>
              <button class="demo-btn" onClick={() => reset()}>Reset</button>
            </div>
          </div>
          <div class="monitor-grid">
            <div class="monitor-cell">
              <div class="monitor-label">Signal Value</div>
              <div class="monitor-value large">{count}</div>
            </div>
            <div class="monitor-cell">
              <div class="monitor-label">Dependency Status</div>
              <div class="monitor-value accent">TRACKING ACTIVE</div>
            </div>
          </div>
        </div>

        <div class="tip-card">
          <strong>Pro Tip:</strong> Open your console to see the engine's reactive cycles in action.
          Every time the number above changes, only the specific DOM node is updated — no VDOM diffing required!
        </div>

        {/* Code: state */}
        <div class="demo-section" style={{ marginTop: '36px' }}>
          <div class="demo-section-label">State Definition</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>SignalsDemo.state.ts</span></div>
            <div class="demo-code-content">
              <span class="highlight-comment">// Atomic signal: track changes at the core</span>{"\n"}
              <span class="highlight-keyword">export let</span> count = 0;{"\n\n"}
              <span class="highlight-comment">// Actions modify signals directly</span>{"\n"}
              <span class="highlight-keyword">export function</span> <span class="highlight-func">increment</span>() {"{"}{"\n"}
              {"  "}count++;{"\n"}
              {"}"}
            </div>
          </div>
        </div>

        {/* Code: component */}
        <div class="demo-section">
          <div class="demo-section-label">Component Logic</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>SignalsDemo.tsx</span></div>
            <div class="demo-code-content">
              <span class="highlight-keyword">import</span> {"{"} count, increment {"}"} <span class="highlight-keyword">from</span> <span class="highlight-string">"./SignalsDemo.state"</span>;{"\n\n"}
              <span class="highlight-comment">// Use signals directly in JSX</span>{"\n"}
              <span class="highlight-keyword">export default function</span> <span class="highlight-func">Counter</span>() {"{"}{"\n"}
              {"  "}<span class="highlight-keyword">return</span> &lt;<span class="highlight-keyword">button</span> <span class="highlight-func">onClick</span>={"{"}increment{"}"}&gt;{"{"}count{"}"}&lt;/<span class="highlight-keyword">button</span>&gt;;{"\n"}
              {"}"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}