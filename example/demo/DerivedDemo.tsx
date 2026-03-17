import { derive } from "../../src/index";
import { search, setSearchQuery } from "./DerivedDemo.state";

export default function DerivedDemo() {
  const users = [
    "Leanne Graham", "Ervin Howell", "Clementine Bauch", "Patricia Lebsack",
    "Chelsey Dietrich", "Mrs. Dennis Schulist", "Kurtis Weissnat",
  ];

  const filtered = derive(() => {
    const q = search.toLowerCase();
    if (!q) return users;
    return users.filter(u => u.toLowerCase().includes(q));
  });

  return (
    <div class="demo-module">

      {/* ── Doc pane ── */}
      <div class="demo-doc-pane">
        <div class="demo-section-label">Documentation</div>

        <h2 class="doc-heading">The Power of Lazy Evaluation</h2>

        <p class="doc-body">
          One of the most common pitfalls in frontend development is over-computing data. If you have a
          list of 1,000 items and you want to filter them based on a search query, you don't want to
          re-run that filter every single time the component re-renders for unrelated reasons. Our
          engine solves this with <strong>Derived State</strong> (also known as Computed Values).
        </p>
        <p class="doc-body">
          Derived state is "lazy" by default. This means the engine won't actually perform the
          calculation until something — like a component — explicitly asks for the value. Once
          computed, the result is cached. As long as the source signals haven't changed, subsequent
          reads are instant.
        </p>

        <div class="doc-subheading">Automatic Memoization</div>
        <p class="doc-body">
          You don't need to manually use <code>useMemo</code> or handle complex dependency arrays.
          The engine's dependency tracker keeps an eye on which signals are accessed during the
          calculation. If any of those signals change, the cache is invalidated and the value will
          be re-computed on the next read.
        </p>

        <div class="tip-card">
          <strong>Reactive Chains:</strong> You can even derive state from other derived state!
          The engine manages these chains automatically, ensuring that an update at the root
          propagates perfectly through the entire network of computations.
        </div>

        <div class="doc-subheading">Declarative Computation</div>
        <p class="doc-body">
          This approach promotes a declarative programming style. Instead of writing "how" to update
          your UI when data changes, you write "what" the data should be based on its sources.
          The engine takes care of the "how," keeping your code clean, readable, and performant.
        </p>
      </div>

      {/* ── Demo pane ── */}
      <div class="demo-demo-pane">
        <div class="demo-section-label">Live Example</div>

        {/* Search */}
        <div class="search-wrapper">
          <span class="search-prefix">SEARCH /</span>
          <input
            type="text"
            class="demo-input search-input"
            placeholder="e.g. 'Alice', 'Smith'..."
            onInput={(e: any) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Monitor summary */}
        <div class="monitor-card" style={{ marginBottom: '20px' }}>
          <div class="monitor-grid">
            <div class="monitor-cell">
              <div class="monitor-label">Computed Results</div>
              <div class="monitor-value large">{filtered.value.length}</div>
            </div>
            <div class="monitor-cell">
              <div class="monitor-label">Cache Status</div>
              <div class="monitor-value accent">{() => search ? 'RECOMPUTED' : 'CACHED'}</div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{ marginBottom: '36px' }}>
          {filtered.value.length > 0 ? (
            <div class="results-grid">
              {filtered.value.map(item => (
                <div class="result-chip">
                  <div class="result-dot" />
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <div class="no-results">No matches for "{search}"</div>
          )}
        </div>

        {/* Code blocks */}
        <div class="demo-section">
          <div class="demo-section-label">State Logic</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>DerivedDemo.state.ts</span></div>
            <div class="demo-code-content">
              <span class="highlight-keyword">export let</span> search = <span class="highlight-string">""</span>;{"\n\n"}
              <span class="highlight-comment">// derive() auto-memoizes based on dependencies</span>{"\n"}
              <span class="highlight-keyword">const</span> filtered = <span class="highlight-func">derive</span>(() =&gt; {"{"}{"\n"}
              {"  "}<span class="highlight-comment">// Only re-runs when 'search' changes</span>{"\n"}
              {"  "}<span class="highlight-keyword">return</span> users.<span class="highlight-func">filter</span>(u =&gt; u.<span class="highlight-func">includes</span>(search));{"\n"}
              {"}"});
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section-label">UI Rendering</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>DerivedDemo.tsx</span></div>
            <div class="demo-code-content">
              <span class="highlight-comment">// Access .value for derived state (lazy)</span>{"\n"}
              {"{"}filtered.value.<span class="highlight-func">map</span>(user =&gt; ({"\n"}
              {"  "}&lt;<span class="highlight-keyword">div</span>&gt;{"{"}user{"}"}&lt;/<span class="highlight-keyword">div</span>&gt;{"\n"}
              ))
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}