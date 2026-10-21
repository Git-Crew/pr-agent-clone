import type { CSSProperties, ReactNode } from "react";

const itemStyle = {
  "--item-accent": "var(--v2-color-accent-green)",
  color: "var(--v2-nav-text)",
  padding: "8px 14px",
  gap: "10px",
} as CSSProperties;

function MenuLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      role="menuitem"
      className="v2-nav-link group flex items-center whitespace-nowrap font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
      style={itemStyle}
      href={href}
    >
      {children}
    </a>
  );
}

function Menu({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="relative h-full">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls={id}
        className="v2-nav-link group relative flex h-full items-center font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
        style={{ color: "var(--v2-nav-text)", gap: "4px" }}
      >
        {label}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id={id}
        role="menu"
        aria-label={label}
        className="absolute"
        style={{
          top: "calc(100% - 1px)",
          left: "-14px",
          minWidth: "220px",
          backgroundColor: "var(--v2-color-bg)",
          border: "1px solid var(--v2-color-border)",
          padding: "10px 0",
          opacity: "0",
          transform: "translateY(-4px)",
          pointerEvents: "none",
          transition: "opacity 160ms cubic-bezier(0.23, 1, 0.32, 1), transform 160ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="gitcrew mkt scroll-smooth antialiased" data-v2-theme="light" style={{ colorScheme: "light" }}>
      <nav className="fixed inset-x-0 z-50 bg-v2-bg" style={{ top: 0, height: 56 }} aria-label="Main navigation">
        <div
          className="relative mx-auto flex h-full items-center justify-between"
          style={{ maxWidth: "var(--v2-max-width)", padding: "0 var(--v2-grid-padding)" }}
        >
          <a
            className="font-v2-sans text-[15px] font-medium tracking-tight"
            href="/"
            style={{ color: "var(--v2-nav-text)", letterSpacing: "-0.04em" }}
          >
            GitCrew
          </a>
          <div className="hidden h-full items-stretch gap-5 min-[1100px]:flex xl:gap-8">
            <Menu id="mkt-agents" label="Agents">
              <MenuLink href="/#antislop">AntiSlop</MenuLink>
              <MenuLink href="/#hermes">Hermes</MenuLink>
              <MenuLink href="/#openclaw">OpenClaw</MenuLink>
              <MenuLink href="/#grokbot">Grokbot</MenuLink>
              <MenuLink href="/#ponytail">Ponytail</MenuLink>
              <MenuLink href="/#openai-dots">OpenAI Dots</MenuLink>
            </Menu>
            <a
              className="v2-nav-link flex h-full items-center font-v2-sans text-v2-b3"
              style={{ color: "var(--v2-nav-text)" }}
              href="/pricing"
            >
              Pricing
            </a>
            <Menu id="mkt-developers" label="Developers">
              <MenuLink href="/developers#why">Why we built</MenuLink>
              <MenuLink href="/developers#how">How we're working</MenuLink>
            </Menu>
            <Menu id="mkt-resources" label="Resources">
              <MenuLink href="/blog">Blog</MenuLink>
              <MenuLink href="/docs">Docs</MenuLink>
            </Menu>
            <a
              className="v2-nav-link flex h-full items-center font-v2-sans text-v2-b3"
              style={{ color: "var(--v2-nav-text)" }}
              href="/community"
            >
              Contribute
            </a>
          </div>
          <a className="v2-btn v2-btn--sm v2-btn--primary whitespace-nowrap" href="/dashboard">
            Get started
          </a>
        </div>
      </nav>
      <main className="mkt-main">{children}</main>
      <footer className="relative w-full bg-v2-bg" style={{ borderTop: "1px solid var(--v2-color-border)" }}>
        <div
          className="mx-auto flex flex-wrap items-center justify-between gap-4"
          style={{ maxWidth: "var(--v2-max-width)", padding: "28px var(--v2-grid-padding)" }}
        >
          <a className="font-v2-sans text-[15px] font-medium" href="/" style={{ color: "var(--v2-nav-text)" }}>
            GitCrew
          </a>
          <div className="flex flex-wrap gap-5 font-v2-sans text-v2-b3" style={{ color: "var(--v2-nav-text)" }}>
            <a href="/pricing">Pricing</a>
            <a href="/developers">Developers</a>
            <a href="/blog">Blog</a>
            <a href="/docs">Docs</a>
            <a href="/community">Contribute</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
