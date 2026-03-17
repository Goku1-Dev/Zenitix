import { sharedCount, incrementShared, decrementShared } from "./SharedDemo.state";

function ComponentA() {
  return (
    <div class="component-box">
      <div class="component-box-label">Component A</div>
      <div class="component-box-value">{sharedCount}</div>
      <button class="demo-btn primary" style={{ width: '100%' }} onClick={() => incrementShared()}>
        Add from A
      </button>
    </div>
  );
}

function ComponentB() {
  return (
    <div class="component-box">
      <div class="component-box-label">Component B</div>
      <div class="component-box-value">{sharedCount}</div>
      <button class="demo-btn" style={{ width: '100%' }} onClick={() => decrementShared()}>
        Remove from B
      </button>
    </div>
  );
}

export default function SharedDemo() {
  return (
    <div class="demo-module">

      {/* ── Doc pane ── */}
      <div class="demo-doc-pane">
        <div class="demo-section-label">Documentation</div>

        <h2 class="doc-heading">Shared State Architecture</h2>

        <p class="doc-body">
          In modern web development, sharing state between distant components is often a major pain point.
          Developers are forced to choose between "Prop Drilling" (passing data through dozens of layers)
          or complex state management libraries like Redux or Pinia. Our engine provides a third way:{" "}
          <strong>File-Based Shared State</strong>.
        </p>
        <p class="doc-body">
          When multiple components import from the same <code>.state.ts</code> file, they aren't just
          getting a copy of the data — they are subscribing to the same reactive source. This means that
          if "Component A" updates a value, "Component B" is notified instantly, even if they share no
          common parent other than the root of the app.
        </p>

        <div class="doc-subheading">The End of Prop Drilling</div>
        <p class="doc-body">
          By decoupling state from the component tree, we free your architecture from rigid hierarchies.
          You can move components around, wrap them in new containers, or refactor your UI layout without
          ever breaking the reactive data flow.
        </p>

        <div class="tip-card">
          <strong>Scalability Note:</strong> Because updates are granular, having 100 components listen
          to the same state file is just as efficient as having one. The engine only pings the specific
          subscribers that are actually rendered on the current screen.
        </div>

        <div class="doc-subheading">Global State, Local Scope</div>
        <p class="doc-body">
          Even though the state is technically "global" (accessible from any file), it remains
          encapsulated within its module. This gives you the best of both worlds: the ease of global
          access with the safety and maintainability of modular code.
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
              <div class="monitor-title">Cross-Component Sync</div>
            </div>
          </div>
          <div class="monitor-grid">
            <div class="monitor-cell">
              <div class="monitor-label">Shared Value</div>
              <div class="monitor-value large">{sharedCount}</div>
            </div>
            <div class="monitor-cell">
              <div class="monitor-label">Sync Topology</div>
              <div class="monitor-value accent">GLOBAL BROADCAST</div>
            </div>
          </div>
        </div>

        {/* Component pair */}
        <div class="component-pair">
          <ComponentA />
          <div class="sync-divider">⇌</div>
          <ComponentB />
        </div>

        <div class="tip-card">
          <strong>Reactive Sync:</strong> Notice how both components update simultaneously. There are
          no props being passed between them — they both listen directly to the state file.
        </div>

        {/* Code blocks */}
        <div class="demo-section" style={{ marginTop: '36px' }}>
          <div class="demo-section-label">State Definition</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>SharedDemo.state.ts</span></div>
            <div class="demo-code-content">
              <span class="highlight-comment">// Central source of truth: shared across components</span>{"\n"}
              <span class="highlight-keyword">export let</span> sharedCount = 10;{"\n\n"}
              <span class="highlight-comment">// Any file calling this action triggers all subscribers</span>{"\n"}
              <span class="highlight-keyword">export function</span> <span class="highlight-func">increment</span>() {"{"}{"\n"}
              {"  "}sharedCount++;{"\n"}
              {"}"}
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section-label">Component Implementation</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>SharedDemo.tsx</span></div>
            <div class="demo-code-content">
              <span class="highlight-comment">// Import directly: no prop drilling needed</span>{"\n"}
              <span class="highlight-keyword">import</span> {"{"} sharedCount {"}"} <span class="highlight-keyword">from</span> <span class="highlight-string">"./SharedDemo.state"</span>;{"\n\n"}
              <span class="highlight-func">ComponentA</span>: &lt;<span class="highlight-keyword">div</span>&gt;Value: {"{"}sharedCount{"}"}&lt;/<span class="highlight-keyword">div</span>&gt;{"\n"}
              <span class="highlight-func">ComponentB</span>: &lt;<span class="highlight-keyword">div</span>&gt;Value: {"{"}sharedCount{"}"}&lt;/<span class="highlight-keyword">div</span>&gt;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}