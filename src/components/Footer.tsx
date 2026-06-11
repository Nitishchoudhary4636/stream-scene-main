export function Footer() {
  const cols = [
    ["Audio Description", "Help Center", "Gift Cards", "Media Center"],
    ["Investor Relations", "Jobs", "Terms of Use", "Privacy"],
    ["Legal Notices", "Cookie Preferences", "Corporate Information", "Contact Us"],
    ["Account", "Ways to Watch", "Speed Test", "Only on Streamora"],
  ];
  return (
    <footer className="footer px-4 md:px-12 py-12 text-muted-foreground text-sm border-t border-border mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">Questions? Call 1-800-STREAMORA</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {cols.map((col, i) => (
            <ul key={i} className="space-y-3">
              {col.map((item) => (
                <li key={item} className="hover:underline cursor-pointer">{item}</li>
              ))}
            </ul>
          ))}
        </div>
        <div className="text-xs">© {new Date().getFullYear()} Streamora, Inc. A demo built for client presentation.</div>
      </div>
    </footer>
  );
}
