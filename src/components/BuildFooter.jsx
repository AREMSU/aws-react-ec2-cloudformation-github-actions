// __COMMIT__ and __BUILT_AT__ are injected at build time by vite.config.js.
const builtAt = new Date(__BUILT_AT__).toLocaleString(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function BuildFooter() {
  return (
    <footer className="build">
      <span className="build-status">
        <span className="dot" aria-hidden="true" />
        Live on Amazon EC2
      </span>
      <span className="build-meta">
        Commit <code>{__COMMIT__}</code>
        <span className="sep" aria-hidden="true">·</span>
        Built {builtAt}
      </span>
      <span className="build-pipeline">GitHub Actions → CloudFormation → EC2 → nginx</span>
    </footer>
  );
}
