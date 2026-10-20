import type { CSSProperties } from "react";

export function LandingMarkup() {
  return (
    <>
    <div id="__next">
      <div className="__className_cb1dc0 __variable_cb1dc0 __variable_c880a9">
        <div className="mx-auto px-0 relative">
          <div className="flex h-full flex-col justify-between v2-page">
            <nav
              className="fixed inset-x-0 z-50 bg-v2-bg"
              style={{ top: "0", height: "56px", transition: "background-color var(--v2-dur-base) var(--v2-ease-out), color var(--v2-dur-base) var(--v2-ease-out)" } as CSSProperties}
              aria-label="Main navigation"
            >
              <div
                className="v2-grain-overlay pointer-events-none"
                aria-hidden="true"
                style={{ opacity: "0", transition: "opacity var(--v2-dur-base) var(--v2-ease-out)" } as CSSProperties}
              />
              <div
                className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                style={{ height: "var(--v2-border-width)", bottom: "0" } as CSSProperties}
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 top-0"
                style={{ width: "calc(max((100% - var(--v2-max-width)) / 2, 0px) + var(--v2-content-padding))" } as CSSProperties}
              />
              <div
                className="pointer-events-none absolute bottom-0 right-0 top-0"
                style={{ width: "calc(max((100% - var(--v2-max-width)) / 2, 0px) + var(--v2-content-padding))" } as CSSProperties}
              />
              <div
                className="relative mx-auto h-full"
                style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
              >
                <div
                  className="flex h-full items-center justify-between"
                  style={{ padding: "0 var(--v2-grid-padding)" } as CSSProperties}
                >
                  <a className="flex shrink-0 items-center font-v2-sans text-[15px] font-medium tracking-tight" aria-label="GitCrew home" href="/" style={{ color: "var(--v2-nav-text)", letterSpacing: "-0.04em" } as CSSProperties}>
                    GitCrew
                  </a>
                  <nav
                    className="hidden h-full items-stretch gap-5 min-[1100px]:flex xl:gap-8"
                    aria-label="Site links"
                  >
                    <div className="relative h-full">
                      <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        aria-controls="v2-nav-platform"
                        className="v2-nav-link group relative flex h-full items-center font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                        style={{ color: "var(--v2-nav-text)", gap: "4px" } as CSSProperties}
                      >
                        Agents
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          aria-hidden="true"
                          style={{ transition: "transform var(--v2-dur-fast) var(--v2-ease-out)", transform: "rotate(0deg)", flexShrink: "0" } as CSSProperties}
                        >
                          <path
                            d="M2 4l3 3 3-3"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 transition-transform duration-150 group-hover:scale-x-100"
                          style={{ backgroundColor: "var(--v2-color-accent-lime)", transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" } as CSSProperties}
                        />
                      </button>
                      <div
                        id="v2-nav-platform"
                        role="menu"
                        aria-label="Agents"
                        className="absolute"
                        style={{ top: "calc(100% - 1px)", left: "-14px", minWidth: "240px", backgroundColor: "var(--v2-color-bg)", border: "1px solid var(--v2-color-border)", padding: "10px 0", opacity: "0", transform: "translateY(-4px)", pointerEvents: "none", transition: "opacity 160ms cubic-bezier(0.23, 1, 0.32, 1), transform 160ms cubic-bezier(0.23, 1, 0.32, 1)" } as CSSProperties}
                      >
                        <a
                          role="menuitem"
                          className="v2-nav-link group flex items-center whitespace-nowrap font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                          style={{ "--item-accent": "var(--v2-product-secrets-ink)", color: "var(--v2-nav-text)", padding: "8px 14px", gap: "10px" } as CSSProperties}
                          href="/#antislop"
                        >
                          <svg
                            width="16"
                            height="16"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="currentColor"
                            aria-hidden="true"
                            className="shrink-0 transition-colors duration-150 [color:var(--v2-nav-text)] group-hover:[color:var(--item-accent)]"
                          >
                            <path
                              d="M10 12C10 14.2091 8.20914 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C8.20914 8 10 9.79086 10 12ZM10 12H22V15"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path d="M18 12V15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          AntiSlop
                        </a>
                        <a
                          role="menuitem"
                          className="v2-nav-link group flex items-center whitespace-nowrap font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                          style={{ "--item-accent": "var(--v2-product-cert-ink)", color: "var(--v2-nav-text)", padding: "8px 14px", gap: "10px" } as CSSProperties}
                          href="/#hermes"
                        >
                          <svg
                            width="16"
                            height="16"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="currentColor"
                            aria-hidden="true"
                            className="shrink-0 transition-colors duration-150 [color:var(--v2-nav-text)] group-hover:[color:var(--item-accent)]"
                          >
                            <path
                              d="M8.5 11.5L11.5 14.5L16.5 9.5"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5 18L3.13036 4.91253C3.05646 4.39524 3.39389 3.91247 3.90398 3.79912L11.5661 2.09641C11.8519 2.03291 12.1481 2.03291 12.4339 2.09641L20.096 3.79912C20.6061 3.91247 20.9435 4.39524 20.8696 4.91252L19 18C18.9293 18.495 18.5 21.5 12 21.5C5.5 21.5 5.07071 18.495 5 18Z"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Hermes
                        </a>
                        <a
                          role="menuitem"
                          className="v2-nav-link group flex items-center whitespace-nowrap font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                          style={{ "--item-accent": "var(--v2-product-pam-ink)", color: "var(--v2-nav-text)", padding: "8px 14px", gap: "10px" } as CSSProperties}
                          href="/#openclaw"
                        >
                          <svg
                            width="16"
                            height="16"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="currentColor"
                            aria-hidden="true"
                            className="shrink-0 transition-colors duration-150 [color:var(--v2-nav-text)] group-hover:[color:var(--item-accent)]"
                          >
                            <path
                              d="M2 20V19C2 15.134 5.13401 12 9 12V12"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.8038 12.3135C16.4456 11.6088 17.5544 11.6088 18.1962 12.3135V12.3135C18.5206 12.6697 18.9868 12.8628 19.468 12.8403V12.8403C20.4201 12.7958 21.2042 13.5799 21.1597 14.532V14.532C21.1372 15.0132 21.3303 15.4794 21.6865 15.8038V15.8038C22.3912 16.4456 22.3912 17.5544 21.6865 18.1962V18.1962C21.3303 18.5206 21.1372 18.9868 21.1597 19.468V19.468C21.2042 20.4201 20.4201 21.2042 19.468 21.1597V21.1597C18.9868 21.1372 18.5206 21.3303 18.1962 21.6865V21.6865C17.5544 22.3912 16.4456 22.3912 15.8038 21.6865V21.6865C15.4794 21.3303 15.0132 21.1372 14.532 21.1597V21.1597C13.5799 21.2042 12.7958 20.4201 12.8403 19.468V19.468C12.8628 18.9868 12.6697 18.5206 12.3135 18.1962V18.1962C11.6088 17.5544 11.6088 16.4456 12.3135 15.8038V15.8038C12.6697 15.4794 12.8628 15.0132 12.8403 14.532V14.532C12.7958 13.5799 13.5799 12.7958 14.532 12.8403V12.8403C15.0132 12.8628 15.4794 12.6697 15.8038 12.3135V12.3135Z"
                              stroke="currentColor"
                            />
                            <path
                              d="M15.3636 17L16.4546 18.0909L18.6364 15.9091"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          OpenClaw
                        </a>
                        <a
                          role="menuitem"
                          className="v2-nav-link group flex items-center whitespace-nowrap font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                          style={{ "--item-accent": "var(--v2-product-secrets-ink)", color: "var(--v2-nav-text)", padding: "8px 14px", gap: "10px" } as CSSProperties}
                          href="/#grokbot"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="currentColor"
                            aria-hidden="true"
                            className="shrink-0 transition-colors duration-150 [color:var(--v2-nav-text)] group-hover:[color:var(--item-accent)]"
                          >
                            <path
                              d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z"
                              stroke="currentColor"
                            />
                            <path
                              d="M10 15C8.34315 15 7 13.6569 7 12C7 10.3431 8.34315 9 10 9C11.6569 9 13 10.3431 13 12C13 13.6569 11.6569 15 10 15Z"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path d="M18 14L18 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12.5 9.5L13.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.5 9.5L6.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.5 15.5L7.5 14.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path
                              d="M13.5 15.5L12.5 14.5"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path d="M2 8L3 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 6L3 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 16H2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 18H2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Grokbot
                        </a>
                        <a role="menuitem" className="v2-nav-link group flex items-center whitespace-nowrap font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text" style={{ "--item-accent": "var(--v2-color-accent-green)", color: "var(--v2-nav-text)", padding: "8px 14px", gap: "10px" } as CSSProperties} href="/#ponytail">Ponytail</a>
                        <a role="menuitem" className="v2-nav-link group flex items-center whitespace-nowrap font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text" style={{ "--item-accent": "var(--v2-color-accent-green)", color: "var(--v2-nav-text)", padding: "8px 14px", gap: "10px" } as CSSProperties} href="/#openai-dots">OpenAI Dots</a>
                      </div>
                    </div>
                    <a
                      className="v2-nav-link group relative flex h-full items-center font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                      style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                      href="/pricing"
                    >
                      Pricing
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 transition-transform duration-150 group-hover:scale-x-100"
                        style={{ backgroundColor: "var(--v2-color-accent-lime)", transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" } as CSSProperties}
                      />
                    </a>
                    <div className="relative h-full">
                      <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        aria-controls="v2-nav-developers"
                        className="v2-nav-link group relative flex h-full items-center font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                        style={{ color: "var(--v2-nav-text)", gap: "4px" } as CSSProperties}
                      >
                        Developers
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          aria-hidden="true"
                          style={{ transition: "transform var(--v2-dur-fast) var(--v2-ease-out)", transform: "rotate(0deg)", flexShrink: "0" } as CSSProperties}
                        >
                          <path
                            d="M2 4l3 3 3-3"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 transition-transform duration-150 group-hover:scale-x-100"
                          style={{ backgroundColor: "var(--v2-color-accent-lime)", transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" } as CSSProperties}
                        />
                      </button>
                      <div
                        id="v2-nav-developers"
                        role="menu"
                        aria-label="Developers"
                        className="absolute"
                        style={{ top: "calc(100% - 1px)", left: "-14px", minWidth: "240px", backgroundColor: "var(--v2-color-bg)", border: "1px solid var(--v2-color-border)", padding: "10px 0", opacity: "0", transform: "translateY(-4px)", pointerEvents: "none", transition: "opacity 160ms cubic-bezier(0.23, 1, 0.32, 1), transform 160ms cubic-bezier(0.23, 1, 0.32, 1)" } as CSSProperties}
                      >
                        <a
                          role="menuitem"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="v2-nav-link group flex items-center whitespace-nowrap font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                          style={{ "--item-accent": "var(--v2-color-accent-green)", color: "var(--v2-nav-text)", padding: "8px 14px", gap: "10px" } as CSSProperties}
                          href="/developers#why"
                        >
                          <svg
                            width="16"
                            strokeWidth="1.5"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="currentColor"
                            aria-hidden="true"
                            className="shrink-0 transition-colors duration-150 [color:var(--v2-nav-text)] group-hover:[color:var(--item-accent)]"
                          >
                            <path
                              d="M4 19V5C4 3.89543 4.89543 3 6 3H19.4C19.7314 3 20 3.26863 20 3.6V16.7143"
                              stroke="currentColor"
                              strokeLinecap="round"
                            />
                            <path d="M6 17L20 17" stroke="currentColor" strokeLinecap="round" />
                            <path d="M6 21L20 21" stroke="currentColor" strokeLinecap="round" />
                            <path
                              d="M6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path d="M9 7L15 7" stroke="currentColor" strokeLinecap="round" />
                          </svg>
                          Why we built
                        </a>
                        <a
                          role="menuitem"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="v2-nav-link group flex items-center whitespace-nowrap font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                          style={{ "--item-accent": "var(--v2-color-accent-green)", color: "var(--v2-nav-text)", padding: "8px 14px", gap: "10px" } as CSSProperties}
                          href="/developers#how"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="currentColor"
                            aria-hidden="true"
                            className="shrink-0 transition-colors duration-150 [color:var(--v2-nav-text)] group-hover:[color:var(--item-accent)]"
                          >
                            <path
                              d="M7 18V17C7 14.2386 9.23858 12 12 12V12C14.7614 12 17 14.2386 17 17V18"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M1 18V17C1 15.3431 2.34315 14 4 14V14"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M23 18V17C23 15.3431 21.6569 14 20 14V14"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          How we're working
                        </a>
                      </div>
                    </div>
                    <div className="relative h-full">
                      <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        aria-controls="v2-nav-resources"
                        className="v2-nav-link group relative flex h-full items-center font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                        style={{ color: "var(--v2-nav-text)", gap: "4px" } as CSSProperties}
                      >
                        Resources
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          aria-hidden="true"
                          style={{ transition: "transform var(--v2-dur-fast) var(--v2-ease-out)", transform: "rotate(0deg)", flexShrink: "0" } as CSSProperties}
                        >
                          <path
                            d="M2 4l3 3 3-3"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 transition-transform duration-150 group-hover:scale-x-100"
                          style={{ backgroundColor: "var(--v2-color-accent-lime)", transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" } as CSSProperties}
                        />
                      </button>
                      <div
                        id="v2-nav-resources"
                        role="menu"
                        aria-label="Resources"
                        className="absolute"
                        style={{ top: "calc(100% - 1px)", left: "-14px", minWidth: "240px", backgroundColor: "var(--v2-color-bg)", border: "1px solid var(--v2-color-border)", padding: "10px 0", opacity: "0", transform: "translateY(-4px)", pointerEvents: "none", transition: "opacity 160ms cubic-bezier(0.23, 1, 0.32, 1), transform 160ms cubic-bezier(0.23, 1, 0.32, 1)" } as CSSProperties}
                      >
                        <a
                          role="menuitem"
                          className="v2-nav-link group flex items-center whitespace-nowrap font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                          style={{ "--item-accent": "var(--v2-color-accent-green)", color: "var(--v2-nav-text)", padding: "8px 14px", gap: "10px" } as CSSProperties}
                          href="/blog"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="currentColor"
                            aria-hidden="true"
                            className="shrink-0 transition-colors duration-150 [color:var(--v2-nav-text)] group-hover:[color:var(--item-accent)]"
                          >
                            <path
                              d="M2.90602 17.505L5.33709 3.71766C5.5289 2.62987 6.56621 1.90354 7.654 2.09534L19.4717 4.17912C20.5595 4.37093 21.2858 5.40824 21.094 6.49603L18.6629 20.2833C18.4711 21.3711 17.4338 22.0975 16.346 21.9057L4.52834 19.8219C3.44055 19.6301 2.71421 18.5928 2.90602 17.505Z"
                              stroke="currentColor"
                            />
                            <path d="M8.92902 6.38184L16.8075 7.77102" stroke="currentColor" strokeLinecap="round" />
                            <path d="M8.23444 10.3213L16.1129 11.7105" stroke="currentColor" strokeLinecap="round" />
                            <path d="M7.53986 14.2607L12.4639 15.129" stroke="currentColor" strokeLinecap="round" />
                          </svg>
                          Blog
                        </a>
                        <a
                          role="menuitem"
                          className="v2-nav-link group flex items-center whitespace-nowrap font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                          style={{ "--item-accent": "var(--v2-color-accent-green)", color: "var(--v2-nav-text)", padding: "8px 14px", gap: "10px" } as CSSProperties}
                          href="/docs"
                        >
                          Docs
                        </a>

                      </div>
                    </div>
                    <a
                      className="v2-nav-link group relative flex h-full items-center font-v2-sans text-v2-b3 transition-colors duration-150 hover:text-v2-text"
                      style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                      href="/community"
                    >
                      Contribute
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 transition-transform duration-150 group-hover:scale-x-100"
                        style={{ backgroundColor: "var(--v2-color-accent-lime)", transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" } as CSSProperties}
                      />
                    </a>
                  </nav>
                  <div className="hidden shrink-0 items-center gap-4 min-[1100px]:flex xl:gap-6">
                    <a
                      href="https://github.com/MrSpideyNihal/Pr-agent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center transition-opacity hover:opacity-80"
                      style={{ gap: "6px" } as CSSProperties}
                    >
                      <svg
                        width="18"
                        height="18"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="currentColor"
                        className="text-v2-text"
                        aria-hidden="true"
                      >
                        <path
                          d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className="font-v2-sans text-v2-b4 font-medium"
                        style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                      >
                        OSS
                      </span>
                    </a>
                    <div className="flex items-center gap-3 xl:gap-4">
                      <a className="v2-btn v2-btn--sm v2-btn--secondary whitespace-nowrap" href="https://github.com/MrSpideyNihal/Pr-agent">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="" aria-hidden="true">
                          <path
                            d="M4.5 2.5L8 6l-3.5 3.5"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        View the source
                      </a>
                      <a className="v2-btn v2-btn--sm v2-btn--primary whitespace-nowrap" href="/dashboard">
                        Get started
                      </a>
                    </div>
                  </div>
                  <button
                    className="flex flex-col items-center justify-center min-[1100px]:hidden"
                    style={{ width: "32px", height: "32px", gap: "5px" } as CSSProperties}
                    aria-label="Open menu"
                    aria-expanded="false"
                  >
                    <span
                      className="block h-[1.5px] w-5 bg-v2-text motion-safe:transition-transform motion-safe:duration-200 "
                    />
                    <span
                      className="block h-[1.5px] w-5 bg-v2-text motion-safe:transition-opacity motion-safe:duration-200 "
                    />
                    <span
                      className="block h-[1.5px] w-5 bg-v2-text motion-safe:transition-transform motion-safe:duration-200 "
                    />
                  </button>
                </div>
              </div>
            </nav>
            <div
              className="fixed inset-x-0 z-40 bg-v2-bg min-[1100px]:hidden pointer-events-none opacity-0"
              style={{ top: "56px", bottom: "0", overflowY: "auto", overscrollBehavior: "contain", transition: "opacity var(--v2-dur-base) var(--v2-ease-out)" } as CSSProperties}
              aria-hidden="true"
            >
              <div
                className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                style={{ height: "var(--v2-border-width)", bottom: "0" } as CSSProperties}
              />
              <div style={{ padding: "0 var(--v2-grid-padding) var(--v2-gutter)" } as CSSProperties}>
                <nav className="flex flex-col" aria-label="Mobile site links">
                  <div className="flex flex-col border-b border-v2-border" style={{ padding: "var(--v2-gutter) 0", gap: "10px" } as CSSProperties}>
                    <span className="font-v2-sans text-v2-b2 text-v2-text">Agents</span>
                    <a className="font-v2-sans text-v2-b3" style={{ color: "var(--v2-nav-text)" } as CSSProperties} href="/#antislop">AntiSlop</a>
                    <a className="font-v2-sans text-v2-b3" style={{ color: "var(--v2-nav-text)" } as CSSProperties} href="/#hermes">Hermes</a>
                    <a className="font-v2-sans text-v2-b3" style={{ color: "var(--v2-nav-text)" } as CSSProperties} href="/#openclaw">OpenClaw</a>
                    <a className="font-v2-sans text-v2-b3" style={{ color: "var(--v2-nav-text)" } as CSSProperties} href="/#grokbot">Grokbot</a>
                    <a className="font-v2-sans text-v2-b3" style={{ color: "var(--v2-nav-text)" } as CSSProperties} href="/#ponytail">Ponytail</a>
                    <a className="font-v2-sans text-v2-b3" style={{ color: "var(--v2-nav-text)" } as CSSProperties} href="/#openai-dots">OpenAI Dots</a>
                  </div>
                  <a
                    className="flex items-center justify-between border-b border-v2-border font-v2-sans text-v2-b2 text-v2-text transition-colors hover:text-v2-text-muted"
                    style={{ padding: "var(--v2-gutter) 0" } as CSSProperties}
                    href="/pricing"
                  >
                    Pricing
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M5 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <div className="flex flex-col border-b border-v2-border" style={{ padding: "var(--v2-gutter) 0", gap: "10px" } as CSSProperties}>
                    <span className="font-v2-sans text-v2-b2 text-v2-text">Developers</span>
                    <a className="font-v2-sans text-v2-b3" style={{ color: "var(--v2-nav-text)" } as CSSProperties} href="/developers#why">Why we built</a>
                    <a className="font-v2-sans text-v2-b3" style={{ color: "var(--v2-nav-text)" } as CSSProperties} href="/developers#how">How we're working</a>
                  </div>
                  <div className="flex flex-col border-b border-v2-border" style={{ padding: "var(--v2-gutter) 0", gap: "10px" } as CSSProperties}>
                    <span className="font-v2-sans text-v2-b2 text-v2-text">Resources</span>
                    <a className="font-v2-sans text-v2-b3" style={{ color: "var(--v2-nav-text)" } as CSSProperties} href="/blog">Blog</a>
                    <a className="font-v2-sans text-v2-b3" style={{ color: "var(--v2-nav-text)" } as CSSProperties} href="/docs">Docs</a>
                  </div>
                  <a
                    className="flex items-center justify-between border-b border-v2-border font-v2-sans text-v2-b2 text-v2-text transition-colors hover:text-v2-text-muted"
                    style={{ padding: "var(--v2-gutter) 0" } as CSSProperties}
                    href="/community"
                  >
                    Contribute
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M5 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </nav>
                <div
                  className="flex flex-col"
                  style={{ marginTop: "var(--v2-gutter)", gap: "12px" } as CSSProperties}
                >
                  <a
                    href="https://github.com/MrSpideyNihal/Pr-agent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                    style={{ gap: "8px", padding: "12px var(--v2-gutter)" } as CSSProperties}
                  >
                    <svg
                      width="18"
                      height="18"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="currentColor"
                      className="text-v2-text"
                      aria-hidden="true"
                    >
                      <path
                        d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className="font-v2-sans text-v2-b3 font-medium"
                      style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                    >
                      OSS
                       stars
                    </span>
                  </a>
                  <a
                    className="v2-btn v2-btn--lg v2-btn--secondary w-full justify-center whitespace-nowrap"
                    href="https://github.com/MrSpideyNihal/Pr-agent"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="" aria-hidden="true">
                      <path
                        d="M4.5 2.5L8 6l-3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    View the source
                  </a>
                  <a className="v2-btn v2-btn--lg v2-btn--primary w-full justify-center whitespace-nowrap" href="/dashboard">
                    Get started
                  </a>
                </div>
              </div>
            </div>
            <main className="mb-auto">
              <div
                className="v2-page no-scrollbar::-webkit-scrollbar relative overflow-x-hidden no-scrollbar md:overflow-x-clip"
                style={{ backgroundColor: "var(--v2-color-surface-canvas)", color: "var(--v2-color-text-primary)" } as CSSProperties}
              >
                <div className="v2-grain-overlay" aria-hidden="true" />
                <div className="white flex w-full flex-col items-center">
                  <div
                    className="w-full"
                    style={{ backgroundColor: "var(--v2-color-surface-page)", paddingTop: "var(--v2-navbar-height)" } as CSSProperties}
                  >
                    <section className="jsx-d1dcb69e238f30d6 hero-experiment stage-hero">
                      <div className="jsx-d1dcb69e238f30d6 stage-field">
                        <div
                          aria-hidden="true"
                          style={{ position: "absolute", inset: "0", overflow: "hidden", pointerEvents: "none", opacity: "0.3" } as CSSProperties}
                        />
                      </div>
                      <div className="jsx-d1dcb69e238f30d6 hero-proto-shell stage-inner">
                        <div className="jsx-d1dcb69e238f30d6 stage-split">
                          <div className="jsx-d1dcb69e238f30d6 stage-copy hero-proto-enter">
                            <div className="jsx-d1dcb69e238f30d6 stage-announcement">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="v2-announcement-pill"
                                href="https://github.com/MrSpideyNihal/Pr-agent"
                              >
                                <span className="jsx-ea0055af375d7f3d v2-announcement-pill-msg">
                                  Open source PR agents:
                                </span>
                                <span aria-hidden="true" className="jsx-ea0055af375d7f3d v2-announcement-pill-rule" />
                                <span className="jsx-ea0055af375d7f3d v2-announcement-pill-cta">
                                  <span className="jsx-ea0055af375d7f3d v2-announcement-pill-cta-text">
                                    Made with love for OSS maintainers
                                  </span>
                                  <span aria-hidden="true" className="jsx-ea0055af375d7f3d v2-announcement-pill-arrow">
                                    {">"}
                                  </span>
                                </span>
                              </a>
                            </div>
                            <h1 className="jsx-d1dcb69e238f30d6">
                              Highly Customized{" "}
                              <span
                                style={{ position: "relative", display: "inline-block", padding: "0.06em 0.18em", margin: "0 0.02em", color: "var(--v2-color-void)", whiteSpace: "nowrap" } as CSSProperties}
                              >
                                <span
                                  aria-hidden="true"
                                  style={{ position: "absolute", inset: "0", background: "var(--v2-color-volt)", zIndex: "0" } as CSSProperties}
                                />
                                <span style={{ position: "relative", zIndex: "1" } as CSSProperties}>Agents</span>
                              </span>
                              <br className="jsx-d1dcb69e238f30d6" />
                              <span className="jsx-d1dcb69e238f30d6 hero-proto-headline-line">
                                that Run on{" "}
                                <span
                                  style={{ position: "relative", display: "inline-block", padding: "0.06em 0.18em", margin: "0 0.02em", color: "var(--v2-color-void)", whiteSpace: "nowrap" } as CSSProperties}
                                >
                                  <span
                                    aria-hidden="true"
                                    style={{ position: "absolute", inset: "0", background: "var(--v2-color-volt)", zIndex: "0" } as CSSProperties}
                                  />
                                  <span style={{ position: "relative", zIndex: "1" } as CSSProperties}>Your PRs</span>
                                </span>
                              </span>
                            </h1>
                            <p className="jsx-d1dcb69e238f30d6">
                              We care about your repositories. Custom agents run on the pull requests your team already opens.
                            </p>
                            <div className="jsx-d1dcb69e238f30d6 hero-proto-actions">
                              <a className="v2-btn v2-btn--md v2-btn--primary" href="/dashboard">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="" aria-hidden="true">
                                  <path
                                    d="M4.5 2.5L8 6l-3.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                Get started
                              </a>
                              <a className="v2-btn v2-btn--md v2-btn--secondary" href="https://github.com/MrSpideyNihal/Pr-agent">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="" aria-hidden="true">
                                  <path
                                    d="M4.5 2.5L8 6l-3.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                View the source
                              </a>
                            </div>
                          </div>
                          <div className="jsx-d1dcb69e238f30d6 stage-visual hero-proto-enter-late">
                            <div className="jsx-60721d3153d0348b collage">
                              <div className="jsx-60721d3153d0348b collage-stage">
                                <div className="jsx-60721d3153d0348b collage-stack is-locked">
                                  <div
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Show Ponytail"
                                    className="jsx-60721d3153d0348b card-slot slot-2"
                                  >
                                    <div
                                      role="group"
                                      aria-hidden="true"
                                      aria-label="GitCrew pull request replay"
                                      className="jsx-f4deca1016db76e4 peek-card peek-pam"
                                    >
                                      <div className="jsx-f4deca1016db76e4 peek-tabs">
                                        <span className="jsx-f4deca1016db76e4 card-label">
                                          <img src="/logo/ponytail-icon.png" alt="" width={18} height={18} className="jsx-f4deca1016db76e4 card-mark" />
                                          Ponytail
                                        </span>
                                        <div role="tablist" aria-label="Ponytail pull requests" className="jsx-f4deca1016db76e4 peek-tablist">
                                          <button
                                            type="button"
                                            role="tab"
                                            aria-selected="true"
                                            tabIndex={-1}
                                            className="jsx-f4deca1016db76e4 peek-tab is-active"
                                          >
                                            All PRs
                                          </button>
                                          <button
                                            type="button"
                                            role="tab"
                                            aria-selected="false"
                                            tabIndex={-1}
                                            className="jsx-f4deca1016db76e4 peek-tab"
                                          >
                                            Active PRs
                                          </button>
                                          <button
                                            type="button"
                                            role="tab"
                                            aria-selected="false"
                                            tabIndex={-1}
                                            className="jsx-f4deca1016db76e4 peek-tab"
                                          >
                                            Closed PRs
                                          </button>
                                          <button
                                            type="button"
                                            role="tab"
                                            aria-selected="false"
                                            tabIndex={-1}
                                            className="jsx-f4deca1016db76e4 peek-tab"
                                          >
                                            Merged PRs
                                          </button>
                                        </div>
                                        <button
                                          type="button"
                                          role="switch"
                                          aria-checked="true"
                                          tabIndex={-1}
                                          className="jsx-f4deca1016db76e4 peek-toggle is-on"
                                        >
                                          <span aria-hidden="true" className="jsx-f4deca1016db76e4 sync-track">
                                            <span className="jsx-f4deca1016db76e4 sync-knob" />
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-toggle-copy">Run without access</span>
                                        </button>
                                      </div>
                                      <div className="jsx-f4deca1016db76e4 peek-rows">
                                        <div className="jsx-f4deca1016db76e4 peek-row peek-head">
                                          <span className="jsx-f4deca1016db76e4 peek-row-clock">
                                            PR
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            Pull request
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta">
                                            Status
                                          </span>
                                        </div>
                                        <div data-pr="active" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-clock">
                                            #88
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            trim unused import
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-badge is-green">
                                            Running
                                          </span>
                                        </div>
                                        <div data-pr="active" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-clock">
                                            #91
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            drop the extra wrapper
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-badge is-green">
                                            Complete
                                          </span>
                                        </div>
                                        <div data-pr="active" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-clock">
                                            #74
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            keep the diff small
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-badge is-amber">
                                            Awaiting Permission
                                          </span>
                                        </div>
                                        <div data-pr="closed" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-clock">
                                            #66
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            closed without a patch
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-badge is-red">
                                            Failed
                                          </span>
                                        </div>
                                        <div data-pr="closed" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-clock">
                                            #70
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            review left unfinished
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-badge is-red">
                                            Failed
                                          </span>
                                        </div>
                                        <div data-pr="merged" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-clock">
                                            #96
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            rename the helper
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-badge is-green">
                                            Complete
                                          </span>
                                        </div>
                                        <div data-pr="active" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-clock">
                                            #102
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            collapse two edits
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-badge is-green">
                                            Running
                                          </span>
                                        </div>
                                        <div data-pr="closed" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-clock">
                                            #61
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            allowance never granted
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-badge is-amber">
                                            Awaiting Permission
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Show reviews"
                                    className="jsx-60721d3153d0348b card-slot slot-1"
                                  >
                                    <div
                                      role="group"
                                      aria-hidden="true"
                                      aria-label="GitCrew review dashboard"
                                      className="jsx-f4deca1016db76e4 peek-card peek-certs"
                                    >
                                      <div className="jsx-f4deca1016db76e4 peek-tabs">
                                        <span className="jsx-f4deca1016db76e4 card-label">
                                          <img src="/logo/hermes-agent-icon.png" alt="" width={18} height={18} className="jsx-f4deca1016db76e4 card-mark" />
                                          Hermes
                                        </span>
                                        <div
                                          role="tablist"
                                          aria-label="Hermes pull requests"
                                          className="jsx-f4deca1016db76e4 peek-tablist"
                                        >
                                          <button
                                            type="button"
                                            role="tab"
                                            aria-selected="true"
                                            tabIndex={-1}
                                            className="jsx-f4deca1016db76e4 peek-tab is-active"
                                          >
                                            All PRs
                                          </button>
                                          <button
                                            type="button"
                                            role="tab"
                                            aria-selected="false"
                                            tabIndex={-1}
                                            className="jsx-f4deca1016db76e4 peek-tab"
                                          >
                                            Active PRs
                                          </button>
                                          <button
                                            type="button"
                                            role="tab"
                                            aria-selected="false"
                                            tabIndex={-1}
                                            className="jsx-f4deca1016db76e4 peek-tab"
                                          >
                                            Closed PRs
                                          </button>
                                          <button
                                            type="button"
                                            role="tab"
                                            aria-selected="false"
                                            tabIndex={-1}
                                            className="jsx-f4deca1016db76e4 peek-tab"
                                          >
                                            Merged PRs
                                          </button>
                                        </div>
                                        <button
                                          type="button"
                                          role="switch"
                                          aria-checked="false"
                                          tabIndex={-1}
                                          className="jsx-f4deca1016db76e4 peek-toggle"
                                        >
                                          <span aria-hidden="true" className="jsx-f4deca1016db76e4 sync-track">
                                            <span className="jsx-f4deca1016db76e4 sync-knob" />
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-toggle-copy">On allowance</span>
                                        </button>
                                      </div>
                                      <div className="jsx-f4deca1016db76e4 peek-rows">
                                        <div className="jsx-f4deca1016db76e4 peek-row peek-head">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            Pull request
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            Status
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta">
                                            Updated
                                          </span>
                                        </div>
                                        <div data-pr="active" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #184 fix auth middleware
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-green">
                                              Running
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta ">
                                            Apr 01 2027
                                          </span>
                                        </div>
                                        <div data-pr="active" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #176 rotate the review token
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-amber">
                                              Awaiting Permission
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta is-amber">
                                            Jun 08 2026
                                          </span>
                                        </div>
                                        <div data-pr="closed" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #162 drop generated tests
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-red">
                                              Failed
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta is-red">
                                            May 23 2026
                                          </span>
                                        </div>
                                        <div data-pr="active" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #191 pool the db handles
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-green">
                                              Complete
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta ">
                                            Feb 18 2027
                                          </span>
                                        </div>
                                        <div data-pr="merged" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #155 gateway timeout
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-green">
                                              Complete
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta ">
                                            Jan 05 2027
                                          </span>
                                        </div>
                                        <div data-pr="closed" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #148 staging flake
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-red">
                                              Failed
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta is-red">
                                            Apr 30 2026
                                          </span>
                                        </div>
                                        <div data-pr="active" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #203 mesh the comments
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-amber">
                                              Awaiting Permission
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta is-amber">
                                            Jul 14 2026
                                          </span>
                                        </div>
                                        <div data-pr="merged" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #210 edge cache headers
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-green">
                                              Running
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta ">
                                            Nov 22 2027
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Show Grokbot"
                                    className="jsx-60721d3153d0348b card-slot slot-3"
                                  >
                                    <div
                                      role="group"
                                      aria-hidden="true"
                                      aria-label="GitCrew agent sessions"
                                      className="jsx-f4deca1016db76e4 peek-card peek-agent"
                                    >
                                      <div className="jsx-f4deca1016db76e4 peek-tabs">
                                        <span className="jsx-f4deca1016db76e4 card-label">
                                          <img src="/logo/grok-bot-icon.png" alt="" width={18} height={18} className="jsx-f4deca1016db76e4 card-mark" />
                                          Grokbot
                                        </span>
                                        <div
                                          role="tablist"
                                          aria-label="Grokbot pull requests"
                                          className="jsx-f4deca1016db76e4 peek-tablist"
                                        >
                                          <button
                                            type="button"
                                            role="tab"
                                            aria-selected="true"
                                            tabIndex={-1}
                                            className="jsx-f4deca1016db76e4 peek-tab is-active"
                                          >
                                            All PRs
                                          </button>
                                          <button
                                            type="button"
                                            role="tab"
                                            aria-selected="false"
                                            tabIndex={-1}
                                            className="jsx-f4deca1016db76e4 peek-tab"
                                          >
                                            Active PRs
                                          </button>
                                          <button
                                            type="button"
                                            role="tab"
                                            aria-selected="false"
                                            tabIndex={-1}
                                            className="jsx-f4deca1016db76e4 peek-tab"
                                          >
                                            Closed PRs
                                          </button>
                                          <button
                                            type="button"
                                            role="tab"
                                            aria-selected="false"
                                            tabIndex={-1}
                                            className="jsx-f4deca1016db76e4 peek-tab"
                                          >
                                            Merged PRs
                                          </button>
                                        </div>
                                        <button
                                          type="button"
                                          role="switch"
                                          aria-checked="false"
                                          tabIndex={-1}
                                          className="jsx-f4deca1016db76e4 peek-toggle"
                                        >
                                          <span aria-hidden="true" className="jsx-f4deca1016db76e4 sync-track">
                                            <span className="jsx-f4deca1016db76e4 sync-knob" />
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-toggle-copy">On allowance</span>
                                        </button>
                                      </div>
                                      <div className="jsx-f4deca1016db76e4 peek-rows">
                                        <div className="jsx-f4deca1016db76e4 peek-row peek-head">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            Pull request
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-bundle">
                                            Repo
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta">
                                            Updated
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            Status
                                          </span>
                                        </div>
                                        <div data-pr="active" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #118 checkout copy
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-bundle">
                                            <span className="jsx-f4deca1016db76e4 peek-bundle">
                                              web
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta ">
                                            6d
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-green">
                                              Running
                                            </span>
                                          </span>
                                        </div>
                                        <div data-pr="active" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #124 etl notes
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-bundle">
                                            <span className="jsx-f4deca1016db76e4 peek-bundle">
                                              data
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta ">
                                            4h
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-green">
                                              Complete
                                            </span>
                                          </span>
                                        </div>
                                        <div data-pr="active" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #131 support reply
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-bundle">
                                            <span className="jsx-f4deca1016db76e4 peek-bundle">
                                              app
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta ">
                                            12d
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-amber">
                                              Awaiting Permission
                                            </span>
                                          </span>
                                        </div>
                                        <div data-pr="closed" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #109 deploy script
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-bundle">
                                            <span className="jsx-f4deca1016db76e4 peek-bundle">
                                              infra
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta ">
                                            9d
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-red">
                                              Failed
                                            </span>
                                          </span>
                                        </div>
                                        <div data-pr="merged" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #140 analytics
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-bundle">
                                            <span className="jsx-f4deca1016db76e4 peek-bundle">
                                              data
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta ">
                                            2d
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-green">
                                              Complete
                                            </span>
                                          </span>
                                        </div>
                                        <div data-pr="closed" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #97 billing copy
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-bundle">
                                            <span className="jsx-f4deca1016db76e4 peek-bundle">
                                              web
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta ">
                                            5d
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-red">
                                              Failed
                                            </span>
                                          </span>
                                        </div>
                                        <div data-pr="merged" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #146 crawler
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-bundle">
                                            <span className="jsx-f4deca1016db76e4 peek-bundle">
                                              docs
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta ">
                                            9d
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-green">
                                              Running
                                            </span>
                                          </span>
                                        </div>
                                        <div data-pr="closed" className="jsx-f4deca1016db76e4 peek-row">
                                          <span className="jsx-f4deca1016db76e4 peek-row-name">
                                            #88 onboard
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-bundle">
                                            <span className="jsx-f4deca1016db76e4 peek-bundle">
                                              app
                                            </span>
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-meta ">
                                            1d
                                          </span>
                                          <span className="jsx-f4deca1016db76e4 peek-row-status">
                                            <span className="jsx-f4deca1016db76e4 peek-badge is-amber">
                                              Awaiting Permission
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="jsx-60721d3153d0348b card-slot slot-0 is-front">
                                    <div
                                      role="group"
                                      aria-label="GitCrew showing agents on a pull request"
                                      className="jsx-60721d3153d0348b collage-card collage-window"
                                    >
                                      <div className="jsx-60721d3153d0348b stage-app">
                                        <div className="jsx-60721d3153d0348b stage-tabs">
                                          <span className="jsx-60721d3153d0348b card-label">
                                            <span
                                              style={{ background: "var(--v2-color-product-secrets-ink)" } as CSSProperties}
                                              aria-hidden="true"
                                              className="jsx-60721d3153d0348b card-dot"
                                            />
                                            AntiSlop
                                          </span>
                                          <div role="tablist" aria-label="AntiSlop pull requests" className="jsx-60721d3153d0348b stage-tablist">
                                            <button
                                              type="button"
                                              role="tab"
                                              aria-selected="true"
                                              className="jsx-60721d3153d0348b stage-tab is-active"
                                            >
                                              All PRs
                                            </button>
                                            <button type="button" role="tab" aria-selected="false" className="jsx-60721d3153d0348b stage-tab">
                                              Active PRs
                                            </button>
                                            <button type="button" role="tab" aria-selected="false" className="jsx-60721d3153d0348b stage-tab">
                                              Closed PRs
                                            </button>
                                            <button type="button" role="tab" aria-selected="false" className="jsx-60721d3153d0348b stage-tab">
                                              Merged PRs
                                            </button>
                                          </div>
                                          <button
                                            type="button"
                                            role="switch"
                                            aria-checked="false"
                                            className="jsx-f4deca1016db76e4 peek-toggle"
                                          >
                                            <span aria-hidden="true" className="jsx-f4deca1016db76e4 sync-track">
                                              <span className="jsx-f4deca1016db76e4 sync-knob" />
                                            </span>
                                            <span className="jsx-f4deca1016db76e4 peek-toggle-copy">On allowance</span>
                                          </button>
                                        </div>
                                        <div className="jsx-60721d3153d0348b stage-table-wrap">
                                          <div
                                            style={{ "--envcount": "5" } as CSSProperties}
                                            className="jsx-60721d3153d0348b stage-table"
                                          >
                                            <div className="jsx-60721d3153d0348b stage-row stage-head">
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                Pull request
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span className="jsx-60721d3153d0348b env-long">
                                                  Development
                                                </span>
                                                <span className="jsx-60721d3153d0348b env-short">
                                                  Dev
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span className="jsx-60721d3153d0348b env-long">
                                                  Staging
                                                </span>
                                                <span className="jsx-60721d3153d0348b env-short">
                                                  Stg
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span className="jsx-60721d3153d0348b env-long">
                                                  Prod–Core
                                                </span>
                                                <span className="jsx-60721d3153d0348b env-short">
                                                  Core
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span className="jsx-60721d3153d0348b env-long">
                                                  Prod–US
                                                </span>
                                                <span className="jsx-60721d3153d0348b env-short">
                                                  US
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span className="jsx-60721d3153d0348b env-long">
                                                  Prod–EU
                                                </span>
                                                <span className="jsx-60721d3153d0348b env-short">
                                                  EU
                                                </span>
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "0" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-secret" aria-hidden="true"><circle cx="8" cy="15" r="3.2" /><path d="M10.6 13.2 19 5M15.5 8.2l2 2M13.2 6.4l2 2" strokeLinecap="round" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #128 strip generated comments
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.40s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.52s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.64s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.76s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.88s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "1" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-secret" aria-hidden="true"><circle cx="8" cy="15" r="3.2" /><path d="M10.6 13.2 19 5M15.5 8.2l2 2M13.2 6.4l2 2" strokeLinecap="round" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #134 drop unused deps
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.43s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.67s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.79s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.91s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "2" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-secret" aria-hidden="true"><circle cx="8" cy="15" r="3.2" /><path d="M10.6 13.2 19 5M15.5 8.2l2 2M13.2 6.4l2 2" strokeLinecap="round" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #141 tighten the review prompt
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.58s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.70s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.82s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "3" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-secret" aria-hidden="true"><circle cx="8" cy="15" r="3.2" /><path d="M10.6 13.2 19 5M15.5 8.2l2 2M13.2 6.4l2 2" strokeLinecap="round" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #146 fix auth middleware
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.49s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.73s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.85s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "4" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-secret" aria-hidden="true"><circle cx="8" cy="15" r="3.2" /><path d="M10.6 13.2 19 5M15.5 8.2l2 2M13.2 6.4l2 2" strokeLinecap="round" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #152 cache the diff
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.64s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.76s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "1.00s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "5" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-secret" aria-hidden="true"><circle cx="8" cy="15" r="3.2" /><path d="M10.6 13.2 19 5M15.5 8.2l2 2M13.2 6.4l2 2" strokeLinecap="round" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #158 rename the check run
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.67s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.79s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.91s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "6" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-folder" aria-hidden="true"><path d="M3 7.2h5.2l1.8 1.8H21V20H3z" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #163 close the stale review
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.58s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.70s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.82s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.94s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "1.06s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "7" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-folder" aria-hidden="true"><path d="M3 7.2h5.2l1.8 1.8H21V20H3z" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #171 drop the dead branch
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.61s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.73s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.85s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "8" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-folder" aria-hidden="true"><path d="M3 7.2h5.2l1.8 1.8H21V20H3z" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #177 revert the noisy comment
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.76s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "9" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-folder" aria-hidden="true"><path d="M3 7.2h5.2l1.8 1.8H21V20H3z" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #182 close the duplicate
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.79s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "10" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-dynamic" aria-hidden="true"><path d="M13 3 5 13h6l-1 8 9-12h-6z" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #186 scan the new files
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.70s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "11" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-rotation" aria-hidden="true"><path d="M19.5 12a7.5 7.5 0 1 1-2.1-5.2" strokeLinecap="round" /><path d="M19.5 4.2v4.6h-4.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #192 flag the slop
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.73s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "12" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-cert" aria-hidden="true"><circle cx="12" cy="9" r="5" /><path d="M9.2 13.4 8.2 20l3.8-1.8L15.8 20l-1-6.6" strokeLinejoin="round" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-name">
                                                  #198 check the packages
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "1.00s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "13" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-import" aria-hidden="true"><path d="M12 4v10M8 10.5 12 14.5 16 10.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 20h14" strokeLinecap="round" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-tag">
                                                  Staging
                                                </span>
                                                <span className="jsx-60721d3153d0348b stage-row-name is-path">
                                                  #204 merge the lint pass
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "0.91s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                            </div>
                                            <div
                                              style={{ "--ri": "14" } as CSSProperties}
                                              className="jsx-60721d3153d0348b stage-row stage-tr"
                                            >
                                              <span className="jsx-60721d3153d0348b stage-cell-name">
                                                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="jsx-60721d3153d0348b stage-row-ico is-import" aria-hidden="true"><path d="M12 4v10M8 10.5 12 14.5 16 10.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 20h14" strokeLinecap="round" /></svg>
                                                <span className="jsx-60721d3153d0348b stage-row-tag">
                                                  Development
                                                </span>
                                                <span className="jsx-60721d3153d0348b stage-row-name is-path">
                                                  #211 land the diff trim
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env">
                                                <span style={{ "--d": "1.06s" } as CSSProperties} className="jsx-60721d3153d0348b stage-check">
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="m5 12 4.5 4.5L19 7" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                              <span className="jsx-60721d3153d0348b stage-cell-env stage-dash">
                                                —
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="jsx-60721d3153d0348b collage-overlay collage-overlay-env">
                                      <div role="group" aria-label="Environments" className="jsx-60721d3153d0348b env-card">
                                        <div role="listbox" aria-multiselectable="true" className="jsx-60721d3153d0348b env-list">
                                          <button
                                            type="button"
                                            role="option"
                                            aria-selected="true"
                                            className="jsx-60721d3153d0348b env-opt is-on"
                                          >
                                            <span className="jsx-60721d3153d0348b env-box">
                                              <svg
                                                width="11"
                                                height="11"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                              >
                                                <path d="m5 12 4.5 4.5L19 7" />
                                              </svg>
                                            </span>
                                            Development
                                          </button>
                                          <button
                                            type="button"
                                            role="option"
                                            aria-selected="true"
                                            className="jsx-60721d3153d0348b env-opt is-on"
                                          >
                                            <span className="jsx-60721d3153d0348b env-box">
                                              <svg
                                                width="11"
                                                height="11"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                              >
                                                <path d="m5 12 4.5 4.5L19 7" />
                                              </svg>
                                            </span>
                                            Staging
                                          </button>
                                          <button
                                            type="button"
                                            role="option"
                                            aria-selected="true"
                                            className="jsx-60721d3153d0348b env-opt is-on"
                                          >
                                            <span className="jsx-60721d3153d0348b env-box">
                                              <svg
                                                width="11"
                                                height="11"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                              >
                                                <path d="m5 12 4.5 4.5L19 7" />
                                              </svg>
                                            </span>
                                            Prod–Core
                                          </button>
                                          <button
                                            type="button"
                                            role="option"
                                            aria-selected="true"
                                            className="jsx-60721d3153d0348b env-opt is-on"
                                          >
                                            <span className="jsx-60721d3153d0348b env-box">
                                              <svg
                                                width="11"
                                                height="11"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                              >
                                                <path d="m5 12 4.5 4.5L19 7" />
                                              </svg>
                                            </span>
                                            Prod–US
                                          </button>
                                          <button
                                            type="button"
                                            role="option"
                                            aria-selected="true"
                                            className="jsx-60721d3153d0348b env-opt is-on"
                                          >
                                            <span className="jsx-60721d3153d0348b env-box">
                                              <svg
                                                width="11"
                                                height="11"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                              >
                                                <path d="m5 12 4.5 4.5L19 7" />
                                              </svg>
                                            </span>
                                            Prod–EU
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    
                    <div
                      className="relative w-full overflow-hidden "
                      style={{ backgroundColor: "var(--v2-color-surface-canvas)" } as CSSProperties}
                    >
                      <div
                        className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                        style={{ height: "var(--v2-border-width)", top: "0" } as CSSProperties}
                      />
                      <div
                        className="relative mx-auto "
                        style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                      >
                        <div
                          style={{ padding: "0 var(--v2-grid-padding)", paddingTop: "var(--v2-space-6)" } as CSSProperties}
                        >
                          <div
                            className="flex flex-col items-center text-center"
                            style={{ paddingTop: "var(--v2-space-3)", paddingBottom: "var(--v2-space-7)" } as CSSProperties}
                          >
                            <div style={{ display: "inline-block" } as CSSProperties}>
                              <div style={{ display: "inline-block", maxWidth: "720px" } as CSSProperties}>
                                <div
                                  className="relative "
                                  style={{ display: "inline-block", border: "1px solid var(--v2-color-frame)", padding: "28px 36px" } as CSSProperties}
                                >
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", inset: "0", pointerEvents: "none", background: "var(--v2-color-surface-canvas)", zIndex: "0" } as CSSProperties}
                                  />
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", top: "-1px", left: "-100vw", right: "100%", borderTop: "1px dashed var(--v2-color-frame)", pointerEvents: "none" } as CSSProperties}
                                  />
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", top: "-1px", left: "100%", right: "-100vw", borderTop: "1px dashed var(--v2-color-frame)", pointerEvents: "none" } as CSSProperties}
                                  />
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", bottom: "-1px", left: "-100vw", right: "100%", borderTop: "1px dashed var(--v2-color-frame)", pointerEvents: "none" } as CSSProperties}
                                  />
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", bottom: "-1px", left: "100%", right: "-100vw", borderTop: "1px dashed var(--v2-color-frame)", pointerEvents: "none" } as CSSProperties}
                                  />
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", left: "-1px", top: "-100vw", bottom: "100%", borderLeft: "1px dashed var(--v2-color-frame)", pointerEvents: "none" } as CSSProperties}
                                  />
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", right: "-1px", top: "-100vw", bottom: "100%", borderLeft: "1px dashed var(--v2-color-frame)", pointerEvents: "none" } as CSSProperties}
                                  />
                                  <span
                                    aria-hidden="true"
                                    style={{ position: "absolute", width: "8px", height: "8px", background: "var(--v2-color-bg)", border: "1px solid var(--v2-color-frame)", pointerEvents: "none", zIndex: "1", top: "-4px", left: "-4px" } as CSSProperties}
                                  />
                                  <span
                                    aria-hidden="true"
                                    style={{ position: "absolute", width: "8px", height: "8px", background: "var(--v2-color-bg)", border: "1px solid var(--v2-color-frame)", pointerEvents: "none", zIndex: "1", top: "-4px", right: "-4px" } as CSSProperties}
                                  />
                                  <span
                                    aria-hidden="true"
                                    style={{ position: "absolute", width: "8px", height: "8px", background: "var(--v2-color-bg)", border: "1px solid var(--v2-color-frame)", pointerEvents: "none", zIndex: "1", bottom: "-4px", left: "-4px" } as CSSProperties}
                                  />
                                  <span
                                    aria-hidden="true"
                                    style={{ position: "absolute", width: "8px", height: "8px", background: "var(--v2-color-bg)", border: "1px solid var(--v2-color-frame)", pointerEvents: "none", zIndex: "1", bottom: "-4px", right: "-4px" } as CSSProperties}
                                  />
                                  <div
                                    style={{ position: "relative", zIndex: "1", display: "flex", flexDirection: "column", flex: "1 1 auto", height: "100%" } as CSSProperties}
                                  >
                                    <h2
                                      className="font-v2-sans text-v2-h2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.02em", margin: "0", maxWidth: "720px" } as CSSProperties}
                                    >
                                      Meet the 
                                      <span
                                        style={{ position: "relative", display: "inline-block", padding: "0.06em 0.18em", margin: "0 0.02em", color: "var(--v2-color-void)", whiteSpace: "nowrap" } as CSSProperties}
                                      >
                                        <span
                                          aria-hidden="true"
                                          style={{ position: "absolute", inset: "0", background: "var(--v2-color-volt)", zIndex: "0" } as CSSProperties}
                                        />
                                        <span style={{ position: "relative", zIndex: "1" } as CSSProperties}>
                                          open-source
                                        </span>
                                      </span>
                                       agents that run on your pull requests.
                                    </h2>
                                  </div>
                                </div>
                              </div>
                              <div id="lineup" className="agent-lineup">
                                <article className="agent-lineup-card">
                                  <img src="/logo/ponytail-icon.png" alt="" width={44} height={44} className="agent-lineup-icon" />
                                  <h3 id="ponytail" className="agent-lineup-name font-v2-sans">Ponytail</h3>
                                  <p className="agent-lineup-desc font-v2-sans">Trims the extra down to the efficient lines that ship the feature.</p>
                                </article>
                                <article className="agent-lineup-card">
                                  <img src="/logo/openclaw-icon.png" alt="" width={44} height={44} className="agent-lineup-icon" />
                                  <h3 id="openclaw" className="agent-lineup-name font-v2-sans">OpenClaw</h3>
                                  <p className="agent-lineup-desc font-v2-sans">Researches the diff and looks for a better approach.</p>
                                </article>
                                <article className="agent-lineup-card">
                                  <img src="/logo/grok-bot-icon.png" alt="" width={44} height={44} className="agent-lineup-icon" />
                                  <h3 id="grokbot" className="agent-lineup-name font-v2-sans">Grokbot</h3>
                                  <p className="agent-lineup-desc font-v2-sans">The customizable prompt bot.</p>
                                </article>
                                <article className="agent-lineup-card">
                                  <img src="/logo/hermes-agent-icon.png" alt="" width={44} height={44} className="agent-lineup-icon" />
                                  <h3 id="hermes" className="agent-lineup-name font-v2-sans">Hermes</h3>
                                  <p className="agent-lineup-desc font-v2-sans">Learns the repo, aligns with its goals, and keeps that context across PRs.</p>
                                </article>
                                <article className="agent-lineup-card">
                                  <span className="agent-lineup-icon agent-lineup-mark" aria-hidden="true" />
                                  <h3 id="antislop" className="agent-lineup-name font-v2-sans">AntiSlop</h3>
                                  <p className="agent-lineup-desc font-v2-sans">Cuts redundant code and emoji, posts a slop score, and keeps AI from burying the codebase.</p>
                                </article>
                              </div>
                              <p
                                className="font-v2-sans text-v2-b1 v2-section-header-body"
                                style={{ color: "var(--v2-color-text-secondary)", marginTop: "var(--v2-space-4)" } as CSSProperties}
                              >
                                AntiSlop, Hermes, OpenClaw, Grokbot, OpenAI Dots, and Ponytail. Install one GitHub App, pick the agents for each repo, and they review the pull requests you already open.
                              </p>
                              <div
                                className="v2-section-header-cta"
                                style={{ marginTop: "var(--v2-space-3)", display: "flex", justifyContent: "center" } as CSSProperties}
                              >
                                <a
                                  className="v2-btn v2-btn--md v2-btn--primary"
                                  href="https://github.com/MrSpideyNihal/Pr-agent"
                                >
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="" aria-hidden="true">
                                    <path
                                      d="M4.5 2.5L8 6l-3.5 3.5"
                                      stroke="currentColor"
                                      strokeWidth="1.2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  See the agents
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="v2-product-block"
                          style={{ padding: "calc(var(--v2-gutter) * 2.5) var(--v2-grid-padding)" } as CSSProperties}
                        >
                          <div
                            className="v2-block-inset"
                            style={{ paddingLeft: "calc((100% - 6 * var(--v2-gutter)) / 7 / 2)", paddingRight: "calc((100% - 6 * var(--v2-gutter)) / 7 / 2)" } as CSSProperties}
                          >
                            <div
                              className="v2-product-block-header flex items-center justify-between"
                              style={{ marginBottom: "48px", gap: "32px" } as CSSProperties}
                            >
                              <div style={{ maxWidth: "640px", minWidth: "0" } as CSSProperties}>
                                <h3
                                  className="v2-product-headline font-v2-sans text-v2-text"
                                  style={{ marginTop: "0", fontSize: "calc(var(--v2-text-h2) * 0.72)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.02em", lineHeight: "var(--v2-lh-heading)" } as CSSProperties}
                                >
                                  <span
                                    style={{ position: "relative", display: "inline-block", padding: "0.06em 0.18em", margin: "0 0.02em", color: "var(--v2-color-void)", whiteSpace: "nowrap" } as CSSProperties}
                                  >
                                    <span
                                      aria-hidden="true"
                                      style={{ position: "absolute", inset: "0", background: "var(--v2-color-product-secrets-accent)", zIndex: "0" } as CSSProperties}
                                    />
                                    <span style={{ position: "relative", zIndex: "1" } as CSSProperties}>
                                      AntiSlop
                                    </span>
                                  </span>
                                </h3>
                                <p
                                  className="font-v2-sans"
                                  style={{ marginTop: "14px", fontSize: "var(--v2-text-b1)", lineHeight: "var(--v2-lh-body)", color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                >
                                  Scores the diff for AI slop: the tint and emoji in the changed lines, and the redundant code a human developer would not leave behind.
                                </p>
                              </div>
                              <a
                                className="v2-btn v2-btn--md v2-btn--secondary v2-product-block-cta shrink-0 whitespace-nowrap"
                                href="/#antislop"
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="" aria-hidden="true">
                                  <path
                                    d="M4.5 2.5L8 6l-3.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                See AntiSlop
                              </a>
                            </div>
                            <div
                              className="v2-stack-mobile grid"
                              style={{ border: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", overflow: "hidden", height: "560px", gridTemplateRows: "1fr", gridTemplateColumns: "minmax(0, 0.68fr) minmax(0, 1.3199999999999998fr)" } as CSSProperties}
                            >
                              <div className="flex flex-col" style={{ order: "0" } as CSSProperties}>
                                <div
                                  className="v2-feature-card flex flex-col "
                                  style={{ flex: "1 1 0", minHeight: "0", justifyContent: "center", padding: "56px 40px" } as CSSProperties}
                                >
                                  <div className="mb-3 flex items-center" style={{ gap: "8px" } as CSSProperties}>
                                    <span
                                      className="inline-flex"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      <span className="agent-lineup-mark" aria-hidden="true" style={{ width: "18px", height: "18px" } as CSSProperties} />
                                    </span>
                                    <span
                                      className="font-v2-mono uppercase"
                                      style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text-tertiary)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.01em" } as CSSProperties}
                                    >
                                      AI slop score
                                    </span>
                                  </div>
                                  <p
                                    className="font-v2-sans"
                                    style={{ fontSize: "var(--v2-text-b2)", lineHeight: "var(--v2-lh-body)", color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                  >
                                    Every pull request gets a score for how much of the diff reads like generated filler.
                                  </p>
                                  <a
                                    className="flex items-center font-v2-sans text-v2-b3 transition-opacity hover:opacity-70 "
                                    style={{ gap: "5px", paddingTop: "10px", color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    href="/#antislop"
                                  >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                      <path
                                        d="M4.5 2.5L8 6l-3.5 3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    See the score
                                  </a>
                                </div>
                                <div
                                  className="v2-feature-card flex flex-col "
                                  style={{ flex: "1 1 0", minHeight: "0", justifyContent: "center", padding: "56px 40px", borderTop: "var(--v2-border-width) solid var(--v2-color-border-subtle)" } as CSSProperties}
                                >
                                  <div className="mb-3 flex items-center" style={{ gap: "8px" } as CSSProperties}>
                                    <span
                                      className="inline-flex"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      <span className="agent-lineup-mark" aria-hidden="true" style={{ width: "18px", height: "18px" } as CSSProperties} />
                                    </span>
                                    <span
                                      className="font-v2-mono uppercase"
                                      style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text-tertiary)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.01em" } as CSSProperties}
                                    >
                                      Tint and emoji
                                    </span>
                                  </div>
                                  <p
                                    className="font-v2-sans"
                                    style={{ fontSize: "var(--v2-text-b2)", lineHeight: "var(--v2-lh-body)", color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                  >
                                    It counts the blue and pink tint, and the vibe-coded emoji, sitting in the changed lines.
                                  </p>
                                  <a
                                    className="flex items-center font-v2-sans text-v2-b3 transition-opacity hover:opacity-70 "
                                    style={{ gap: "5px", paddingTop: "10px", color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    href="/#antislop"
                                  >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                      <path
                                        d="M4.5 2.5L8 6l-3.5 3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    See the tint
                                  </a>
                                </div>
                                <div
                                  className="v2-feature-card flex flex-col "
                                  style={{ flex: "1 1 0", minHeight: "0", justifyContent: "center", padding: "56px 40px", borderTop: "var(--v2-border-width) solid var(--v2-color-border-subtle)" } as CSSProperties}
                                >
                                  <div className="mb-3 flex items-center" style={{ gap: "8px" } as CSSProperties}>
                                    <span
                                      className="inline-flex"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      <span className="agent-lineup-mark" aria-hidden="true" style={{ width: "18px", height: "18px" } as CSSProperties} />
                                    </span>
                                    <span
                                      className="font-v2-mono uppercase"
                                      style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text-tertiary)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.01em" } as CSSProperties}
                                    >
                                      AI-only mistakes
                                    </span>
                                  </div>
                                  <p
                                    className="font-v2-sans"
                                    style={{ fontSize: "var(--v2-text-b2)", lineHeight: "var(--v2-lh-body)", color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                  >
                                    It flags redundant code and procedures a human developer would not leave in the diff.
                                  </p>
                                  <a
                                    className="flex items-center font-v2-sans text-v2-b3 transition-opacity hover:opacity-70 "
                                    style={{ gap: "5px", paddingTop: "10px", color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    href="/#antislop"
                                  >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                      <path
                                        d="M4.5 2.5L8 6l-3.5 3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    See the flags
                                  </a>
                                </div>
                              </div>
                              <div
                                className="relative w-full overflow-hidden v2-stack-illustration"
                                style={{ order: "1", borderLeft: "var(--v2-border-width) solid var(--v2-color-border-subtle)" } as CSSProperties}
                              >
                                <div
                                  className="relative flex h-full w-full flex-col"
                                  style={{ containerType: "inline-size", backgroundImage: "var(--v2-product-secrets-gradient)", backgroundSize: "cover", backgroundPosition: "center", paddingTop: "5cqw", paddingLeft: "4cqw", paddingRight: "0cqw" } as CSSProperties}
                                >
                                  <div
                                    className="flex flex-col overflow-hidden"
                                    style={{ flex: "1 1 0", minHeight: "0", backgroundColor: "var(--v2-mock-surface)", border: "1px solid var(--v2-mock-border)", borderRight: "none", borderBottom: "none", fontFamily: "var(--v2-font-sans)", color: "var(--v2-mock-text)" } as CSSProperties}
                                  >
                                    <div
                                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2cqw", padding: "3.2cqw 4cqw", borderBottom: "1px solid var(--v2-mock-border)" } as CSSProperties}
                                    >
                                      <span style={{ fontSize: "2.3cqw", letterSpacing: "0.08em", textTransform: "uppercase" } as CSSProperties}>
                                        Slop score
                                      </span>
                                      <span style={{ display: "inline-flex", alignItems: "center", gap: "1.6cqw" } as CSSProperties}>
                                        <span style={{ fontSize: "4.4cqw", fontWeight: "500", letterSpacing: "-0.04em", lineHeight: "1" } as CSSProperties}>
                                          62
                                        </span>
                                        <span style={{ fontSize: "2.2cqw", lineHeight: "1", padding: "0.7cqw 1.3cqw", background: "#1f8a4c", color: "#f7f3ea" } as CSSProperties}>
                                          C
                                        </span>
                                      </span>
                                    </div>
                                    <div style={{ padding: "4cqw 4cqw 3cqw", display: "flex", flexDirection: "column", gap: "3.2cqw", minHeight: "0" } as CSSProperties}>
                                      <svg viewBox="0 0 320 128" aria-hidden="true" style={{ width: "100%", height: "26cqw", display: "block" } as CSSProperties}>
                                        <line x1="28" y1="8" x2="28" y2="108" stroke="var(--v2-mock-border)" strokeWidth="1" />
                                        <line x1="28" y1="108" x2="312" y2="108" stroke="var(--v2-mock-border)" strokeWidth="1" />
                                        <rect x="46" y="62" width="28" height="46" fill="#f0d45c" />
                                        <rect x="92" y="38" width="28" height="70" fill="#e2b423" />
                                        <rect x="138" y="74" width="28" height="34" fill="#f0d45c" />
                                        <rect x="184" y="22" width="28" height="86" fill="#1f8a4c" />
                                        <rect x="230" y="50" width="28" height="58" fill="#f0d45c" />
                                        <rect x="276" y="66" width="28" height="42" fill="#e2b423" />
                                        <text x="60" y="122" textAnchor="middle" fill="currentColor" fontSize="9">#128</text>
                                        <text x="106" y="122" textAnchor="middle" fill="currentColor" fontSize="9">#141</text>
                                        <text x="152" y="122" textAnchor="middle" fill="currentColor" fontSize="9">#156</text>
                                        <text x="198" y="122" textAnchor="middle" fill="currentColor" fontSize="9">#170</text>
                                        <text x="244" y="122" textAnchor="middle" fill="currentColor" fontSize="9">#188</text>
                                        <text x="290" y="122" textAnchor="middle" fill="currentColor" fontSize="9">#201</text>
                                      </svg>
                                      <div style={{ display: "grid", gap: "1.8cqw" } as CSSProperties}>
                                        <div style={{ display: "grid", gridTemplateColumns: "18cqw 1fr 6cqw", alignItems: "center", gap: "2cqw" } as CSSProperties}>
                                          <span style={{ fontSize: "2.3cqw" } as CSSProperties}>Tint</span>
                                          <span style={{ height: "1.5cqw", background: "color-mix(in oklab, var(--v2-mock-border) 70%, transparent)" } as CSSProperties}>
                                            <span style={{ display: "block", width: "46%", height: "100%", background: "#7eb6ff" } as CSSProperties} />
                                          </span>
                                          <span style={{ fontSize: "2.3cqw", textAlign: "right" } as CSSProperties}>18</span>
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "18cqw 1fr 6cqw", alignItems: "center", gap: "2cqw" } as CSSProperties}>
                                          <span style={{ fontSize: "2.3cqw" } as CSSProperties}>Emoji</span>
                                          <span style={{ height: "1.5cqw", background: "color-mix(in oklab, var(--v2-mock-border) 70%, transparent)" } as CSSProperties}>
                                            <span style={{ display: "block", width: "22%", height: "100%", background: "#f2a3c7" } as CSSProperties} />
                                          </span>
                                          <span style={{ fontSize: "2.3cqw", textAlign: "right" } as CSSProperties}>7</span>
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "18cqw 1fr 6cqw", alignItems: "center", gap: "2cqw" } as CSSProperties}>
                                          <span style={{ fontSize: "2.3cqw" } as CSSProperties}>Redundant</span>
                                          <span style={{ height: "1.5cqw", background: "color-mix(in oklab, var(--v2-mock-border) 70%, transparent)" } as CSSProperties}>
                                            <span style={{ display: "block", width: "34%", height: "100%", background: "#f0d45c" } as CSSProperties} />
                                          </span>
                                          <span style={{ fontSize: "2.3cqw", textAlign: "right" } as CSSProperties}>11</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="h-[190px] lg:h-[calc(var(--v2-gutter)*1.5)]" />
                      </div>
                    </div>
                    <div style={{ position: "relative", height: "0", zIndex: "20" } as CSSProperties}>
                      <div
                        aria-hidden="true"
                        style={{ position: "absolute", left: "0", right: "0", bottom: "calc(50% - 80px - 0px)", height: "160px", pointerEvents: "none", display: "flex", justifyContent: "flex-start", zIndex: "2" } as CSSProperties}
                      >
                        <div
                          style={{ display: "grid", gridAutoRows: "40px", height: "100%", width: "320px" } as CSSProperties}
                        />
                      </div>
                    </div>
                    <section
                      id="v2-vault-section"
                      data-v2-navbar-theme="dark"
                      className="v2-vault-section relative w-full"
                      style={{ backgroundColor: "var(--v2-agent-vault-bg)" } as CSSProperties}
                    >
                      <div
                        className="relative mx-auto "
                        style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                      >
                        <div
                          className="relative z-10 flex flex-col pt-[72px] pb-[80px] lg:pt-[96px] lg:pb-[96px]"
                          style={{ gap: "calc(var(--v2-gutter) * 1.8)", paddingLeft: "var(--v2-grid-padding)", paddingRight: "var(--v2-grid-padding)" } as CSSProperties}
                        >
                          <div
                            className="v2-vault-header flex"
                            style={{ justifyContent: "space-between", alignItems: "flex-end", gap: "var(--v2-gutter)" } as CSSProperties}
                          >
                            <div
                              className="flex flex-col items-start"
                              style={{ gap: "calc(var(--v2-gutter) * 0.7)" } as CSSProperties}
                            >
                              <h2
                                className="font-v2-sans font-medium"
                                style={{ fontSize: "var(--v2-text-h2)", lineHeight: "1.1", letterSpacing: "-0.02em", maxWidth: "1000px" } as CSSProperties}
                              >
                                <span className="block" style={{ color: "var(--v2-agent-vault-text)" } as CSSProperties}>
                                  Your code stays in your repository.
                                </span>
                                <span className="block" style={{ color: "var(--v2-agent-vault-body)" } as CSSProperties}>
                                  Agents run in GitHub Actions, on the pull request.
                                </span>
                              </h2>
                            </div>
                            <div
                              className="v2-vault-cta"
                              style={{ flexShrink: "0", marginRight: "calc((100% - 6 * var(--v2-gutter)) / 14)" } as CSSProperties}
                            >
                              <a
                                className="v2-btn v2-btn--md v2-btn--secondary v2-btn--inked-fill"
                                style={{ "--v2-btn-fill": "var(--v2-agent-vault-text)", "--v2-color-text-on-accent": "var(--v2-agent-vault-bg)" } as CSSProperties}
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://github.com/MrSpideyNihal/Pr-agent"
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="" aria-hidden="true">
                                  <path
                                    d="M4.5 2.5L8 6l-3.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                See how they run
                              </a>
                            </div>
                          </div>
                          <div className="run-cards">
                            <article className="run-card">
                              <p className="run-kicker">01 · Agent</p>
                              <div className="run-stage">
                                <div className="run-agent is-on">
                                  <img src="/logo/hermes-agent-icon.png" alt="" width="22" height="22" />
                                  <b>Hermes</b>
                                  <em>On</em>
                                </div>
                                <div className="run-agent">
                                  <img src="/logo/openclaw-icon.png" alt="" width="22" height="22" />
                                  <b>OpenClaw</b>
                                  <em>On</em>
                                </div>
                                <div className="run-agent">
                                  <img src="/logo/grok-bot-icon.png" alt="" width="22" height="22" />
                                  <b>Grokbot</b>
                                  <em>On</em>
                                </div>
                                <div className="run-agent">
                                  <span className="run-slop" aria-hidden="true" />
                                  <b>AntiSlop</b>
                                  <em>On</em>
                                </div>
                                <div className="run-agent">
                                  <img src="/logo/ponytail-icon.png" alt="" width="22" height="22" />
                                  <b>Ponytail</b>
                                  <em>On</em>
                                </div>
                                <div className="run-agent">
                                  <span className="run-dots" aria-hidden="true"><i /><i /><i /></span>
                                  <b>OpenAI Dots</b>
                                  <em>On</em>
                                </div>
                              </div>
                              <div className="run-copy">
                                <h3>Choose a managed agent</h3>
                                <p>Turn on Hermes, OpenClaw, Grokbot, AntiSlop, Ponytail, or OpenAI Dots. One GitHub App, enabled per repository.</p>
                              </div>
                            </article>
                            <article className="run-card">
                              <p className="run-kicker">02 · Access</p>
                              <div className="run-stage">
                                <div className="gh" aria-hidden="true">
                                  <div className="gh-bar">
                                    <span className="gh-app">GC</span>
                                    <div>
                                      <strong>Install GitCrew</strong>
                                      <span>GitHub App</span>
                                    </div>
                                  </div>
                                  <div className="gh-body">
                                    <p className="gh-label">Repository access</p>
                                    <span className="gh-radio"><i />All repositories</span>
                                    <span className="gh-radio is-on"><i />Only select repositories</span>
                                    <div className="gh-repos">
                                      <div className="gh-repo"><span className="gh-box"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2 4.7 8.4 9.5 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>acme/api</div>
                                      <div className="gh-repo"><span className="gh-box"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2 4.7 8.4 9.5 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>acme/web</div>
                                      <div className="gh-repo"><span className="gh-box" /><span>acme/docs</span></div>
                                    </div>
                                    <div className="gh-perm"><span>Pull requests</span><span className="gh-access"><i>No access</i><i>Read and write</i></span></div>
                                    <div className="gh-perm"><span>Checks</span><span className="gh-access"><i>No access</i><i>Read and write</i></span></div>
                                    <span className="gh-install">Install</span>
                                  </div>
                                </div>
                              </div>
                              <div className="run-copy">
                                <h3>Grant pull request access</h3>
                                <p>Install the GitHub App on the repositories you choose. It gets <span style={{ fontFamily: "var(--v2-font-mono)" }}>pull_requests: write</span> and <span style={{ fontFamily: "var(--v2-font-mono)" }}>checks: write</span>. The job is <span style={{ fontFamily: "var(--v2-font-mono)" }}>workflow_dispatch</span> on your Actions runner, authenticated with OIDC, with no repository secrets.</p>
                              </div>
                            </article>
                            <article className="run-card">
                              <p className="run-kicker">03 · Review</p>
                              <div className="run-stage">
                                <div className="gh" aria-hidden="true">
                                  <div className="gh-scenes">
                                    <div className="gh-scene gh-scene-approve">
                                      <div className="gh-pr">
                                        <span className="gh-open"><svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" /></svg>Open</span>
                                        <strong>Tighten the review path</strong>
                                        <span className="gh-num">#184</span>
                                      </div>
                                      <span className="gh-muted">acme/api · review required</span>
                                      <span className="gh-choice"><i />Comment</span>
                                      <span className="gh-choice is-on"><i />Approve</span>
                                      <span className="gh-choice"><i />Request changes</span>
                                      <span className="gh-submit">Submit review</span>
                                      <div className="gh-approved">
                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm3.78-9.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018L6.75 9.19 5.28 7.72a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l2 2a.75.75 0 0 0 1.06 0Z" /></svg>
                                        hermes approved these changes
                                      </div>
                                    </div>
                                    <div className="gh-scene gh-scene-auto">
                                      <div className="gh-pr">
                                        <span className="gh-open"><svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" /></svg>Open</span>
                                        <strong>Tighten the review path</strong>
                                        <span className="gh-num">#184</span>
                                      </div>
                                      <span className="gh-muted">acme/api · pull_request</span>
                                      <div className="gh-check">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm3.78-9.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018L6.75 9.19 5.28 7.72a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l2 2a.75.75 0 0 0 1.06 0Z" /></svg>
                                        All checks have passed
                                      </div>
                                      <div className="gh-row"><i><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2 4.7 8.4 9.5 3.6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></svg></i>hermes / review</div>
                                      <div className="gh-row"><i><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2 4.7 8.4 9.5 3.6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></svg></i>antislop / slop-score</div>
                                      <span className="gh-merge">Merge pull request</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="run-copy">
                                <h3>Review on approval, or automatically</h3>
                                <p>Hold the check run for a maintainer approval, or let the workflow run on <span style={{ fontFamily: "var(--v2-font-mono)" }}>pull_request</span> and comment as soon as the diff is up.</p>
                              </div>
                            </article>
                          </div>
                        </div>
                      </div>
                    </section>
                    <div style={{ position: "relative", height: "0", zIndex: "20" } as CSSProperties}>
                      <div
                        aria-hidden="true"
                        style={{ position: "absolute", left: "0", right: "0", bottom: "calc(50% - 80px - 0px)", height: "160px", pointerEvents: "none", display: "flex", justifyContent: "flex-end", zIndex: "2" } as CSSProperties}
                      >
                        <div
                          style={{ display: "grid", gridAutoRows: "40px", height: "100%", width: "360px" } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div
                      className="relative w-full overflow-hidden "
                      style={{ backgroundColor: "var(--v2-color-surface-canvas)" } as CSSProperties}
                    >
                      <div
                        className="relative mx-auto "
                        style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                      >
                        <div
                          className="v2-product-block"
                          style={{ padding: "calc(var(--v2-gutter) * 2.5) var(--v2-grid-padding)" } as CSSProperties}
                        >
                          <div
                            className="v2-block-inset"
                            style={{ paddingLeft: "calc((100% - 6 * var(--v2-gutter)) / 7 / 2)", paddingRight: "calc((100% - 6 * var(--v2-gutter)) / 7 / 2)" } as CSSProperties}
                          >
                            <div
                              className="v2-product-block-header flex items-center justify-between"
                              style={{ marginBottom: "48px", gap: "32px" } as CSSProperties}
                            >
                              <div style={{ maxWidth: "640px", minWidth: "0" } as CSSProperties}>
                                <h3
                                  className="v2-product-headline font-v2-sans text-v2-text"
                                  style={{ marginTop: "0", fontSize: "calc(var(--v2-text-h2) * 0.72)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.02em", lineHeight: "var(--v2-lh-heading)" } as CSSProperties}
                                >
                                  <span
                                    style={{ position: "relative", display: "inline-block", padding: "0.06em 0.18em", margin: "0 0.02em", color: "var(--v2-color-void)", whiteSpace: "nowrap" } as CSSProperties}
                                  >
                                    <span
                                      aria-hidden="true"
                                      style={{ position: "absolute", inset: "0", background: "var(--v2-color-product-certificates-accent)", zIndex: "0" } as CSSProperties}
                                    />
                                    <span style={{ position: "relative", zIndex: "1" } as CSSProperties}>
                                      Hermes
                                    </span>
                                  </span>
                                </h3>
                                <p
                                  className="font-v2-sans"
                                  style={{ marginTop: "14px", fontSize: "var(--v2-text-b1)", lineHeight: "var(--v2-lh-body)", color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                >
                                  Hermes reviews the pull request with the project goals in view, and it gets sharper from the reviews around it.
                                </p>
                              </div>
                              <a
                                className="v2-btn v2-btn--md v2-btn--secondary v2-product-block-cta shrink-0 whitespace-nowrap"
                                href="/#hermes"
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="" aria-hidden="true">
                                  <path
                                    d="M4.5 2.5L8 6l-3.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                See Hermes
                              </a>
                            </div>
                            <div
                              className="v2-stack-mobile grid"
                              style={{ border: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", overflow: "hidden", height: "560px", gridTemplateRows: "1fr", gridTemplateColumns: "minmax(0, 1.3199999999999998fr) minmax(0, 0.68fr)" } as CSSProperties}
                            >
                              <div
                                className="flex flex-col"
                                style={{ order: "1", borderLeft: "var(--v2-border-width) solid var(--v2-color-border-subtle)" } as CSSProperties}
                              >
                                <div
                                  className="v2-feature-card flex flex-col "
                                  style={{ flex: "1 1 0", minHeight: "0", justifyContent: "center", padding: "56px 40px" } as CSSProperties}
                                >
                                  <div className="mb-3 flex items-center" style={{ gap: "8px" } as CSSProperties}>
                                    <span
                                      className="inline-flex"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      <img alt="" width="18" height="18" className="card-mark" src="/logo/hermes-agent-icon.png" />
                                    </span>
                                    <span
                                      className="font-v2-mono uppercase"
                                      style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text-tertiary)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.01em" } as CSSProperties}
                                    >
                                      Self-improving reviewer
                                    </span>
                                  </div>
                                  <p
                                    className="font-v2-sans"
                                    style={{ fontSize: "var(--v2-text-b2)", lineHeight: "var(--v2-lh-body)", color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                  >
                                    Each review updates how Hermes reads the next diff.
                                  </p>
                                  <a
                                    className="flex items-center font-v2-sans text-v2-b3 transition-opacity hover:opacity-70 "
                                    style={{ gap: "5px", paddingTop: "10px", color: "var(--v2-color-product-certificates-ink)" } as CSSProperties}
                                    href="/#hermes"
                                  >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                      <path
                                        d="M4.5 2.5L8 6l-3.5 3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    See the reviews
                                  </a>
                                </div>
                                <div
                                  className="v2-feature-card flex flex-col "
                                  style={{ flex: "1 1 0", minHeight: "0", justifyContent: "center", padding: "56px 40px", borderTop: "var(--v2-border-width) solid var(--v2-color-border-subtle)" } as CSSProperties}
                                >
                                  <div className="mb-3 flex items-center" style={{ gap: "8px" } as CSSProperties}>
                                    <span
                                      className="inline-flex"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      <img alt="" width="18" height="18" className="card-mark" src="/logo/hermes-agent-icon.png" />
                                    </span>
                                    <span
                                      className="font-v2-mono uppercase"
                                      style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text-tertiary)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.01em" } as CSSProperties}
                                    >
                                      Project goals
                                    </span>
                                  </div>
                                  <p
                                    className="font-v2-sans"
                                    style={{ fontSize: "var(--v2-text-b2)", lineHeight: "var(--v2-lh-body)", color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                  >
                                    It keeps the repository's goals in mind while it comments.
                                  </p>
                                  <a
                                    className="flex items-center font-v2-sans text-v2-b3 transition-opacity hover:opacity-70 "
                                    style={{ gap: "5px", paddingTop: "10px", color: "var(--v2-color-product-certificates-ink)" } as CSSProperties}
                                    href="/#hermes"
                                  >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                      <path
                                        d="M4.5 2.5L8 6l-3.5 3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    See the goals
                                  </a>
                                </div>
                                <div
                                  className="v2-feature-card flex flex-col "
                                  style={{ flex: "1 1 0", minHeight: "0", justifyContent: "center", padding: "56px 40px", borderTop: "var(--v2-border-width) solid var(--v2-color-border-subtle)" } as CSSProperties}
                                >
                                  <div className="mb-3 flex items-center" style={{ gap: "8px" } as CSSProperties}>
                                    <span
                                      className="inline-flex"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      <img alt="" width="18" height="18" className="card-mark" src="/logo/hermes-agent-icon.png" />
                                    </span>
                                    <span
                                      className="font-v2-mono uppercase"
                                      style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text-tertiary)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.01em" } as CSSProperties}
                                    >
                                      Shared lessons
                                    </span>
                                  </div>
                                  <p
                                    className="font-v2-sans"
                                    style={{ fontSize: "var(--v2-text-b2)", lineHeight: "var(--v2-lh-body)", color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                  >
                                    It picks up mistakes other users hit, and the suggestions maintainers leave.
                                  </p>
                                  <a
                                    className="flex items-center font-v2-sans text-v2-b3 transition-opacity hover:opacity-70 "
                                    style={{ gap: "5px", paddingTop: "10px", color: "var(--v2-color-product-certificates-ink)" } as CSSProperties}
                                    href="/#hermes"
                                  >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                      <path
                                        d="M4.5 2.5L8 6l-3.5 3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    See what it learned
                                  </a>
                                </div>
                              </div>
                              <div
                                className="relative w-full overflow-hidden v2-stack-illustration"
                                style={{ order: "0" } as CSSProperties}
                              >
                                <div
                                  className="relative flex h-full w-full flex-col"
                                  style={{ containerType: "inline-size", backgroundImage: "var(--v2-product-cert-gradient)", backgroundSize: "cover", backgroundPosition: "center", paddingTop: "5cqw", paddingLeft: "0cqw", paddingRight: "4cqw" } as CSSProperties}
                                >
                                  <div
                                    className="flex flex-col overflow-hidden"
                                    style={{ position: "relative", flex: "1 1 0", minHeight: "0", backgroundColor: "var(--v2-mock-surface)", border: "1px solid var(--v2-mock-border)", borderLeft: "none", borderBottom: "none", fontFamily: "var(--v2-font-sans)" } as CSSProperties}
                                  >
                                    <div
                                      className="flex items-center justify-between"
                                      style={{ flex: "0 0 auto", borderBottom: "1px solid var(--v2-mock-border)", padding: "2.2cqw 3cqw" } as CSSProperties}
                                    >
                                      <div className="flex flex-col" style={{ gap: "0.4cqw" } as CSSProperties}>
                                        <span
                                          style={{ fontSize: "2.8cqw", fontWeight: "600", color: "var(--v2-mock-text)" } as CSSProperties}
                                        >
                                          Reviews
                                        </span>
                                        <span style={{ fontSize: "2cqw", color: "var(--v2-mock-text-muted)" } as CSSProperties}>
                                          Reviews on this pull request.
                                        </span>
                                      </div>
                                      <div
                                        className="flex items-center"
                                        style={{ fontSize: "2cqw", fontWeight: "500", border: "1px solid var(--v2-mock-btn-border)", padding: "1.2cqw 2.2cqw", whiteSpace: "nowrap" } as CSSProperties}
                                      >
                                        + Request review
                                      </div>
                                    </div>
                                    <div
                                      style={{ display: "grid", gridTemplateColumns: "40% 22% 18% 20%", alignItems: "center", borderBottom: "1px solid var(--v2-mock-border)", flex: "0 0 auto", paddingTop: "1.6cqw", paddingBottom: "1.6cqw" } as CSSProperties}
                                    >
                                      <div
                                        style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "3cqw", paddingRight: "2cqw" } as CSSProperties}
                                      >
                                        <span
                                          style={{ fontSize: "2.3cqw", fontWeight: "500", color: "var(--v2-mock-text-muted)" } as CSSProperties}
                                        >
                                          SAN / CN
                                        </span>
                                      </div>
                                      <div
                                        style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                      >
                                        <span
                                          style={{ fontSize: "2.3cqw", fontWeight: "500", color: "var(--v2-mock-text-muted)" } as CSSProperties}
                                        >
                                          Serial #
                                        </span>
                                      </div>
                                      <div
                                        style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                      >
                                        <span
                                          style={{ fontSize: "2.3cqw", fontWeight: "500", color: "var(--v2-mock-text-muted)" } as CSSProperties}
                                        >
                                          Status
                                        </span>
                                      </div>
                                      <div
                                        style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                      >
                                        <span
                                          style={{ fontSize: "2.3cqw", fontWeight: "500", color: "var(--v2-mock-text-muted)" } as CSSProperties}
                                        >
                                          Expires
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      style={{ flex: "1 1 0", minHeight: "0", display: "flex", flexDirection: "column", overflow: "hidden" } as CSSProperties}
                                    >
                                      <div
                                        style={{ position: "relative", display: "grid", gridTemplateColumns: "40% 22% 18% 20%", alignItems: "center", borderBottom: "1px solid var(--v2-mock-border)", flex: "0 0 auto", height: "6.6cqw", paddingTop: "1.2cqw", paddingBottom: "1.2cqw", boxSizing: "border-box", opacity: "1", backgroundColor: "rgba(219,245,48,0)", transform: "none" } as CSSProperties}
                                      >
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "3cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "2.5cqw", color: "var(--v2-mock-text)", whiteSpace: "nowrap" } as CSSProperties}
                                          >
                                            acme.com
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            25d2...97
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "1.9cqw", fontWeight: "500", padding: "0.5cqw 1.4cqw", whiteSpace: "nowrap", backgroundColor: "var(--v2-mock-badge-red-bg)", color: "var(--v2-mock-badge-red-text)" } as CSSProperties}
                                          >
                                            Expired
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-badge-red-text)" } as CSSProperties}>
                                            2026-05-23
                                          </span>
                                        </div>
                                      </div>
                                      <div
                                        style={{ position: "relative", display: "grid", gridTemplateColumns: "40% 22% 18% 20%", alignItems: "center", borderBottom: "1px solid var(--v2-mock-border)", flex: "0 0 auto", height: "6.6cqw", paddingTop: "1.2cqw", paddingBottom: "1.2cqw", boxSizing: "border-box", opacity: "1", backgroundColor: "rgba(219,245,48,0)", transform: "none" } as CSSProperties}
                                      >
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "3cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "2.5cqw", color: "var(--v2-mock-text)", whiteSpace: "nowrap" } as CSSProperties}
                                          >
                                            —
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            75ba...eb
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "1.9cqw", fontWeight: "500", padding: "0.5cqw 1.4cqw", whiteSpace: "nowrap", backgroundColor: "var(--v2-mock-badge-red-bg)", color: "var(--v2-mock-badge-red-text)" } as CSSProperties}
                                          >
                                            Expired
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-badge-red-text)" } as CSSProperties}>
                                            2026-05-23
                                          </span>
                                        </div>
                                      </div>
                                      <div
                                        style={{ position: "relative", display: "grid", gridTemplateColumns: "40% 22% 18% 20%", alignItems: "center", borderBottom: "1px solid var(--v2-mock-border)", flex: "0 0 auto", height: "6.6cqw", paddingTop: "1.2cqw", paddingBottom: "1.2cqw", boxSizing: "border-box", opacity: "1", backgroundColor: "rgba(219,245,48,0)", transform: "none" } as CSSProperties}
                                      >
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "3cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "2.5cqw", color: "var(--v2-mock-text)", whiteSpace: "nowrap" } as CSSProperties}
                                          >
                                            api.acme.com
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            4a68...c3
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "1.9cqw", fontWeight: "500", padding: "0.5cqw 1.4cqw", whiteSpace: "nowrap", backgroundColor: "var(--v2-mock-badge-green-bg)", color: "var(--v2-mock-badge-green-text)" } as CSSProperties}
                                          >
                                            Active
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            2027-04-01
                                          </span>
                                        </div>
                                      </div>
                                      <div
                                        style={{ position: "relative", display: "grid", gridTemplateColumns: "40% 22% 18% 20%", alignItems: "center", borderBottom: "1px solid var(--v2-mock-border)", flex: "0 0 auto", height: "6.6cqw", paddingTop: "1.2cqw", paddingBottom: "1.2cqw", boxSizing: "border-box", opacity: "1", backgroundColor: "rgba(219,245,48,0)", transform: "none" } as CSSProperties}
                                      >
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "3cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "2.5cqw", color: "var(--v2-mock-text)", whiteSpace: "nowrap" } as CSSProperties}
                                          >
                                            vault.internal
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            522e...79
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "1.9cqw", fontWeight: "500", padding: "0.5cqw 1.4cqw", whiteSpace: "nowrap", backgroundColor: "var(--v2-mock-badge-amber-bg)", color: "var(--v2-mock-badge-amber-text)" } as CSSProperties}
                                          >
                                            Expiring Soon
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-badge-amber-text)" } as CSSProperties}>
                                            2026-06-08
                                          </span>
                                        </div>
                                      </div>
                                      <div
                                        style={{ position: "relative", display: "grid", gridTemplateColumns: "40% 22% 18% 20%", alignItems: "center", borderBottom: "1px solid var(--v2-mock-border)", flex: "0 0 auto", height: "6.6cqw", paddingTop: "1.2cqw", paddingBottom: "1.2cqw", boxSizing: "border-box", opacity: "1", backgroundColor: "rgba(219,245,48,0)", transform: "none" } as CSSProperties}
                                      >
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "3cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "2.5cqw", color: "var(--v2-mock-text)", whiteSpace: "nowrap" } as CSSProperties}
                                          >
                                            db.internal
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            9f1c...a4
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "1.9cqw", fontWeight: "500", padding: "0.5cqw 1.4cqw", whiteSpace: "nowrap", backgroundColor: "var(--v2-mock-badge-green-bg)", color: "var(--v2-mock-badge-green-text)" } as CSSProperties}
                                          >
                                            Active
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            2027-02-18
                                          </span>
                                        </div>
                                      </div>
                                      <div
                                        style={{ position: "relative", display: "grid", gridTemplateColumns: "40% 22% 18% 20%", alignItems: "center", borderBottom: "1px solid var(--v2-mock-border)", flex: "0 0 auto", height: "6.6cqw", paddingTop: "1.2cqw", paddingBottom: "1.2cqw", boxSizing: "border-box", opacity: "1", backgroundColor: "rgba(219,245,48,0)", transform: "none" } as CSSProperties}
                                      >
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "3cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "2.5cqw", color: "var(--v2-mock-text)", whiteSpace: "nowrap" } as CSSProperties}
                                          >
                                            gateway.acme.com
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            3e77...b9
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "1.9cqw", fontWeight: "500", padding: "0.5cqw 1.4cqw", whiteSpace: "nowrap", backgroundColor: "var(--v2-mock-badge-green-bg)", color: "var(--v2-mock-badge-green-text)" } as CSSProperties}
                                          >
                                            Active
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            2027-01-05
                                          </span>
                                        </div>
                                      </div>
                                      <div
                                        style={{ position: "relative", display: "grid", gridTemplateColumns: "40% 22% 18% 20%", alignItems: "center", borderBottom: "1px solid var(--v2-mock-border)", flex: "0 0 auto", height: "6.6cqw", paddingTop: "1.2cqw", paddingBottom: "1.2cqw", boxSizing: "border-box", opacity: "1", backgroundColor: "rgba(219,245,48,0)", transform: "none" } as CSSProperties}
                                      >
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "3cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "2.5cqw", color: "var(--v2-mock-text)", whiteSpace: "nowrap" } as CSSProperties}
                                          >
                                            staging.acme.com
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            c0a2...1d
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "1.9cqw", fontWeight: "500", padding: "0.5cqw 1.4cqw", whiteSpace: "nowrap", backgroundColor: "var(--v2-mock-badge-red-bg)", color: "var(--v2-mock-badge-red-text)" } as CSSProperties}
                                          >
                                            Expired
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-badge-red-text)" } as CSSProperties}>
                                            2026-04-30
                                          </span>
                                        </div>
                                      </div>
                                      <div
                                        style={{ position: "relative", display: "grid", gridTemplateColumns: "40% 22% 18% 20%", alignItems: "center", borderBottom: "1px solid var(--v2-mock-border)", flex: "0 0 auto", height: "6.6cqw", paddingTop: "1.2cqw", paddingBottom: "1.2cqw", boxSizing: "border-box", opacity: "1", backgroundColor: "rgba(219,245,48,0)", transform: "none" } as CSSProperties}
                                      >
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "3cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "2.5cqw", color: "var(--v2-mock-text)", whiteSpace: "nowrap" } as CSSProperties}
                                          >
                                            metrics.internal
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            8b54...7f
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "1.9cqw", fontWeight: "500", padding: "0.5cqw 1.4cqw", whiteSpace: "nowrap", backgroundColor: "var(--v2-mock-badge-amber-bg)", color: "var(--v2-mock-badge-amber-text)" } as CSSProperties}
                                          >
                                            Expiring Soon
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-badge-amber-text)" } as CSSProperties}>
                                            2026-06-12
                                          </span>
                                        </div>
                                      </div>
                                      <div
                                        style={{ position: "relative", display: "grid", gridTemplateColumns: "40% 22% 18% 20%", alignItems: "center", borderBottom: "1px solid var(--v2-mock-border)", flex: "0 0 auto", height: "6.6cqw", paddingTop: "1.2cqw", paddingBottom: "1.2cqw", boxSizing: "border-box", opacity: "1", backgroundColor: "rgba(219,245,48,0)", transform: "none" } as CSSProperties}
                                      >
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "3cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "2.5cqw", color: "var(--v2-mock-text)", whiteSpace: "nowrap" } as CSSProperties}
                                          >
                                            registry.acme.com
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            d6e3...02
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span
                                            style={{ fontSize: "1.9cqw", fontWeight: "500", padding: "0.5cqw 1.4cqw", whiteSpace: "nowrap", backgroundColor: "var(--v2-mock-badge-green-bg)", color: "var(--v2-mock-badge-green-text)" } as CSSProperties}
                                          >
                                            Active
                                          </span>
                                        </div>
                                        <div
                                          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2cqw", paddingRight: "2cqw" } as CSSProperties}
                                        >
                                          <span style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)" } as CSSProperties}>
                                            2027-06-14
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{ position: "absolute", left: "0", top: "5cqw", right: "4cqw", bottom: "0", pointerEvents: "none", zIndex: "10" } as CSSProperties}
                                  >
                                    <div
                                      style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "40", willChange: "transform", opacity: "0" } as CSSProperties}
                                    >
                                      <div style={{ width: "2.6cqw", height: "auto", transformOrigin: "0% 0%" } as CSSProperties}>
                                        <svg
                                          viewBox="0 0 14 18"
                                          width="100%"
                                          style={{ display: "block", height: "auto", overflow: "visible", filter: "drop-shadow(0 1px 0.9px rgba(0,0,0,0.65))" } as CSSProperties}
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0 16 V0 L11.6 11.608 H4.554 L4.402 11.732 Z"
                                            fill="#ffffff"
                                          />
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1 2.3 V13.5 L3.969 10.631 L4.129 10.492 L9.165 10.5 Z"
                                            fill="#000000"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="v2-product-block"
                          style={{ padding: "calc(var(--v2-gutter) * 2.5) var(--v2-grid-padding)" } as CSSProperties}
                        >
                          <div
                            className="v2-block-inset"
                            style={{ paddingLeft: "calc((100% - 6 * var(--v2-gutter)) / 7 / 2)", paddingRight: "calc((100% - 6 * var(--v2-gutter)) / 7 / 2)" } as CSSProperties}
                          >
                            <div
                              className="v2-product-block-header flex items-center justify-between"
                              style={{ marginBottom: "48px", gap: "32px" } as CSSProperties}
                            >
                              <div style={{ maxWidth: "640px", minWidth: "0" } as CSSProperties}>
                                <h3 id="openai-dots"
                                  className="v2-product-headline font-v2-sans text-v2-text"
                                  style={{ marginTop: "0", fontSize: "calc(var(--v2-text-h2) * 0.72)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.02em", lineHeight: "var(--v2-lh-heading)" } as CSSProperties}
                                >
                                  <span
                                    style={{ position: "relative", display: "inline-block", padding: "0.06em 0.18em", margin: "0 0.02em", color: "var(--v2-color-void)", whiteSpace: "nowrap" } as CSSProperties}
                                  >
                                    <span
                                      aria-hidden="true"
                                      style={{ position: "absolute", inset: "0", background: "var(--v2-color-product-pam-accent)", zIndex: "0" } as CSSProperties}
                                    />
                                    <span style={{ position: "relative", zIndex: "1" } as CSSProperties}>
                                      Ponytail
                                    </span>
                                  </span>
                                </h3>
                                <p
                                  className="font-v2-sans"
                                  style={{ marginTop: "14px", fontSize: "var(--v2-text-b1)", lineHeight: "var(--v2-lh-body)", color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                >
                                  Ponytail and OpenAI Dots finish the lineup. Ponytail only pushes a minimal diff. OpenAI Dots reviews on the same contract.
                                </p>
                              </div>
                              <a
                                className="v2-btn v2-btn--md v2-btn--secondary v2-product-block-cta shrink-0 whitespace-nowrap"
                                href="/#ponytail"
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="" aria-hidden="true">
                                  <path
                                    d="M4.5 2.5L8 6l-3.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                See Ponytail
                              </a>
                            </div>
                            <div
                              className="v2-stack-mobile grid"
                              style={{ border: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", overflow: "hidden", height: "560px", gridTemplateRows: "1fr", gridTemplateColumns: "minmax(0, 0.68fr) minmax(0, 1.3199999999999998fr)" } as CSSProperties}
                            >
                              <div className="flex flex-col" style={{ order: "0" } as CSSProperties}>
                                <div
                                  className="v2-feature-card flex flex-col "
                                  style={{ flex: "1 1 0", minHeight: "0", justifyContent: "center", padding: "56px 40px" } as CSSProperties}
                                >
                                  <div className="mb-3 flex items-center" style={{ gap: "8px" } as CSSProperties}>
                                    <span
                                      className="inline-flex"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      <svg
                                        width="15"
                                        height="16"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        color="currentColor"
                                        className=""
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M15 12V16.4C15 16.7314 14.7314 17 14.4 17H3.6C3.26863 17 3 16.7314 3 16.4V7.6C3 7.26863 3.26863 7 3.6 7H14.4C14.7314 7 15 7.26863 15 7.6V12ZM15 12L20.0159 7.82009C20.4067 7.49443 21 7.77232 21 8.28103V15.719C21 16.2277 20.4067 16.5056 20.0159 16.1799L15 12Z"
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </span>
                                    <span
                                      className="font-v2-mono uppercase"
                                      style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text-tertiary)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.01em" } as CSSProperties}
                                    >
                                      Ponytail
                                    </span>
                                  </div>
                                  <p
                                    className="font-v2-sans"
                                    style={{ fontSize: "var(--v2-text-b2)", lineHeight: "var(--v2-lh-body)", color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                  >
                                    Minimal-diff fixes only. Small reviewable patches, and never on fork pull requests.
                                  </p>
                                  <a
                                    className="flex items-center font-v2-sans text-v2-b3 transition-opacity hover:opacity-70 "
                                    style={{ gap: "5px", paddingTop: "10px", color: "var(--v2-color-product-pam-ink)" } as CSSProperties}
                                    href="/#ponytail"
                                  >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                      <path
                                        d="M4.5 2.5L8 6l-3.5 3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    See Ponytail
                                  </a>
                                </div>
                                <div
                                  className="v2-feature-card flex flex-col "
                                  style={{ flex: "1 1 0", minHeight: "0", justifyContent: "center", padding: "56px 40px", borderTop: "var(--v2-border-width) solid var(--v2-color-border-subtle)" } as CSSProperties}
                                >
                                  <div className="mb-3 flex items-center" style={{ gap: "8px" } as CSSProperties}>
                                    <span
                                      className="inline-flex"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      <svg
                                        width="15"
                                        height="16"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        color="currentColor"
                                        className=""
                                        aria-hidden="true"
                                      >
                                        <path d="M5 12V18C5 18 5 21 12 21C19 21 19 18 19 18V12" stroke="currentColor" />
                                        <path d="M5 6V12C5 12 5 15 12 15C19 15 19 12 19 12V6" stroke="currentColor" />
                                        <path d="M12 3C19 3 19 6 19 6C19 6 19 9 12 9C5 9 5 6 5 6C5 6 5 3 12 3Z" stroke="currentColor" />
                                      </svg>
                                    </span>
                                    <span
                                      className="font-v2-mono uppercase"
                                      style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text-tertiary)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.01em" } as CSSProperties}
                                    >
                                      OpenAI Dots
                                    </span>
                                  </div>
                                  <p
                                    className="font-v2-sans"
                                    style={{ fontSize: "var(--v2-text-b2)", lineHeight: "var(--v2-lh-body)", color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                  >
                                    Another open agent on the same request and result contract. Enable it per repo from the dashboard.
                                  </p>
                                  <a
                                    className="flex items-center font-v2-sans text-v2-b3 transition-opacity hover:opacity-70 "
                                    style={{ gap: "5px", paddingTop: "10px", color: "var(--v2-color-product-pam-ink)" } as CSSProperties}
                                    href="/#ponytail"
                                  >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                      <path
                                        d="M4.5 2.5L8 6l-3.5 3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    See OpenAI Dots
                                  </a>
                                </div>
                                <div
                                  className="v2-feature-card flex flex-col "
                                  style={{ flex: "1 1 0", minHeight: "0", justifyContent: "center", padding: "56px 40px", borderTop: "var(--v2-border-width) solid var(--v2-color-border-subtle)" } as CSSProperties}
                                >
                                  <div className="mb-3 flex items-center" style={{ gap: "8px" } as CSSProperties}>
                                    <span
                                      className="inline-flex"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      <svg
                                        width="15"
                                        height="16"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        color="currentColor"
                                        className=""
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8"
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3"
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </span>
                                    <span
                                      className="font-v2-mono uppercase"
                                      style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text-tertiary)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.01em" } as CSSProperties}
                                    >
                                      Merge gates
                                    </span>
                                  </div>
                                  <p
                                    className="font-v2-sans"
                                    style={{ fontSize: "var(--v2-text-b2)", lineHeight: "var(--v2-lh-body)", color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                  >
                                    Each agent gets a check run. The ones you mark blocking can hold the merge.
                                  </p>
                                  <a
                                    className="flex items-center font-v2-sans text-v2-b3 transition-opacity hover:opacity-70 "
                                    style={{ gap: "5px", paddingTop: "10px", color: "var(--v2-color-product-pam-ink)" } as CSSProperties}
                                    href="/#ponytail"
                                  >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                      <path
                                        d="M4.5 2.5L8 6l-3.5 3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    See Merge gates
                                  </a>
                                </div>
                              </div>
                              <div
                                className="relative w-full overflow-hidden v2-stack-illustration"
                                style={{ order: "1", borderLeft: "var(--v2-border-width) solid var(--v2-color-border-subtle)" } as CSSProperties}
                              >
                                <div
                                  style={{ containerType: "inline-size", backgroundImage: "var(--v2-product-pam-gradient)", backgroundSize: "cover", backgroundPosition: "center", paddingTop: "5cqw", paddingLeft: "4cqw", paddingRight: "0cqw" } as CSSProperties}
                                  className="jsx-9a4216720975784f pam-illustration relative flex h-full w-full flex-col"
                                >
                                  <div
                                    style={{ flex: "1 1 0", minHeight: "0", backgroundColor: "var(--v2-mock-surface)", border: "1px solid var(--v2-mock-border)", borderRight: "none", borderBottom: "none", fontFamily: "var(--v2-font-sans)" } as CSSProperties}
                                    className="jsx-9a4216720975784f flex flex-col overflow-hidden"
                                  >
                                    <div
                                      style={{ flex: "0 0 auto", padding: "max(1.6cqw, 11px) max(3cqw, 18px)", gap: "2cqw" } as CSSProperties}
                                      className="jsx-9a4216720975784f flex items-center justify-between"
                                    >
                                      <span
                                        style={{ fontSize: "2.8cqw", lineHeight: "1.2", fontWeight: "600", color: "var(--v2-mock-text)" } as CSSProperties}
                                        className="jsx-9a4216720975784f"
                                      >
                                        Session replay
                                      </span>
                                    </div>
                                    <div
                                      style={{ display: "grid", gridTemplateColumns: "14% 1fr auto", alignItems: "center", columnGap: "2cqw", flex: "1 1 0", minHeight: "0", overflow: "hidden", borderTop: "1px solid var(--v2-mock-border)", padding: "max(1cqw, 6px) max(3cqw, 18px)", opacity: "0", transform: "translateY(6px)", transition: "opacity 300ms ease-out, transform 300ms ease-out" } as CSSProperties}
                                    >
                                      <div className="flex flex-col" style={{ gap: "max(0.3cqw, 2px)" } as CSSProperties}>
                                        <span
                                          style={{ fontSize: "2.3cqw", lineHeight: "2.7cqw", color: "var(--v2-mock-text)", fontVariantNumeric: "tabular-nums", fontWeight: "500" } as CSSProperties}
                                        >
                                          0:02
                                        </span>
                                        <span
                                          className="pam-sub"
                                          style={{ fontSize: "1.9cqw", lineHeight: "2.5cqw", color: "var(--v2-mock-text-faint)", fontVariantNumeric: "tabular-nums" } as CSSProperties}
                                        >
                                          14:32:08
                                        </span>
                                      </div>
                                      <div
                                        className="flex flex-col"
                                        style={{ gap: "max(0.3cqw, 2px)", minWidth: "0" } as CSSProperties}
                                      >
                                        <span
                                          style={{ fontSize: "2.5cqw", lineHeight: "2.7cqw", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--v2-mock-text)" } as CSSProperties}
                                        >
                                          SSH login to prod-db-01
                                        </span>
                                        <span
                                          className="pam-sub"
                                          style={{ fontSize: "2.3cqw", lineHeight: "2.5cqw", color: "var(--v2-mock-text-faint)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as CSSProperties}
                                        >
                                          Access granted · james.okoro
                                        </span>
                                      </div>
                                      <span
                                        className="relative inline-flex items-center overflow-hidden"
                                        style={{ alignSelf: "center", gap: "0.8cqw", fontSize: "1.9cqw", fontWeight: "500", borderRadius: "0", padding: "0.6cqw 1.6cqw", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums", backgroundColor: "var(--v2-mock-badge-green-bg)", color: "var(--v2-mock-badge-green-text)" } as CSSProperties}
                                      >
                                        <svg
                                          width="1.5em"
                                          height="1.5em"
                                          strokeWidth="2.5"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          color="currentColor"
                                          style={{ width: "2cqw", height: "2cqw" } as CSSProperties}
                                          aria-hidden="true"
                                        >
                                          <path d="M12 6L12 12L18 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                          <path
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <span>
                                          1h access
                                        </span>
                                        <span
                                          aria-hidden="true"
                                          style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "0.4cqw", backgroundColor: "var(--v2-mock-badge-green-text)", opacity: "0.55", transformOrigin: "left center", transform: "none" } as CSSProperties}
                                        />
                                      </span>
                                    </div>
                                    <div
                                      style={{ display: "grid", gridTemplateColumns: "14% 1fr auto", alignItems: "center", columnGap: "2cqw", flex: "1 1 0", minHeight: "0", overflow: "hidden", borderTop: "1px solid var(--v2-mock-border)", padding: "max(1cqw, 6px) max(3cqw, 18px)", opacity: "0", transform: "translateY(6px)", transition: "opacity 300ms ease-out, transform 300ms ease-out" } as CSSProperties}
                                    >
                                      <div className="flex flex-col" style={{ gap: "max(0.3cqw, 2px)" } as CSSProperties}>
                                        <span
                                          style={{ fontSize: "2.3cqw", lineHeight: "2.7cqw", color: "var(--v2-mock-text)", fontVariantNumeric: "tabular-nums", fontWeight: "500" } as CSSProperties}
                                        >
                                          0:05
                                        </span>
                                        <span
                                          className="pam-sub"
                                          style={{ fontSize: "1.9cqw", lineHeight: "2.5cqw", color: "var(--v2-mock-text-faint)", fontVariantNumeric: "tabular-nums" } as CSSProperties}
                                        >
                                          14:32:44
                                        </span>
                                      </div>
                                      <div
                                        className="flex flex-col"
                                        style={{ gap: "max(0.3cqw, 2px)", minWidth: "0" } as CSSProperties}
                                      >
                                        <span
                                          style={{ fontSize: "2.5cqw", lineHeight: "2.7cqw", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--v2-mock-text)" } as CSSProperties}
                                        >
                                          psql -U sarah prod_accounts
                                        </span>
                                        <span
                                          className="pam-sub"
                                          style={{ fontSize: "2.3cqw", lineHeight: "2.5cqw", color: "var(--v2-mock-text-faint)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as CSSProperties}
                                        >
                                          Scoped to read-only
                                        </span>
                                      </div>
                                      <span
                                        className="relative inline-flex items-center overflow-hidden"
                                        style={{ alignSelf: "center", gap: "0.8cqw", fontSize: "1.9cqw", fontWeight: "500", borderRadius: "0", padding: "0.6cqw 1.6cqw", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums", backgroundColor: "var(--v2-mock-badge-green-bg)", color: "var(--v2-mock-badge-green-text)" } as CSSProperties}
                                      >
                                        <svg
                                          width="1.5em"
                                          height="1.5em"
                                          strokeWidth="2.5"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          color="currentColor"
                                          style={{ width: "2cqw", height: "2cqw" } as CSSProperties}
                                          aria-hidden="true"
                                        >
                                          <path d="M12 6L12 12L18 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                          <path
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <span>
                                          30m access
                                        </span>
                                        <span
                                          aria-hidden="true"
                                          style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "0.4cqw", backgroundColor: "var(--v2-mock-badge-green-text)", opacity: "0.55", transformOrigin: "left center", transform: "none" } as CSSProperties}
                                        />
                                      </span>
                                    </div>
                                    <div
                                      style={{ display: "grid", gridTemplateColumns: "14% 1fr auto", alignItems: "center", columnGap: "2cqw", flex: "1 1 0", minHeight: "0", overflow: "hidden", borderTop: "1px solid var(--v2-mock-border)", padding: "max(1cqw, 6px) max(3cqw, 18px)", opacity: "0", transform: "translateY(6px)", transition: "opacity 300ms ease-out, transform 300ms ease-out" } as CSSProperties}
                                    >
                                      <div className="flex flex-col" style={{ gap: "max(0.3cqw, 2px)" } as CSSProperties}>
                                        <span
                                          style={{ fontSize: "2.3cqw", lineHeight: "2.7cqw", color: "var(--v2-mock-text)", fontVariantNumeric: "tabular-nums", fontWeight: "500" } as CSSProperties}
                                        >
                                          0:11
                                        </span>
                                        <span
                                          className="pam-sub"
                                          style={{ fontSize: "1.9cqw", lineHeight: "2.5cqw", color: "var(--v2-mock-text-faint)", fontVariantNumeric: "tabular-nums" } as CSSProperties}
                                        >
                                          14:34:03
                                        </span>
                                      </div>
                                      <div
                                        className="flex flex-col"
                                        style={{ gap: "max(0.3cqw, 2px)", minWidth: "0" } as CSSProperties}
                                      >
                                        <span
                                          style={{ fontSize: "2.5cqw", lineHeight: "2.7cqw", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--v2-mock-text)" } as CSSProperties}
                                        >
                                          sudo systemctl restart api
                                        </span>
                                        <span
                                          className="pam-sub"
                                          style={{ fontSize: "2.3cqw", lineHeight: "2.5cqw", color: "var(--v2-mock-text-faint)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as CSSProperties}
                                        >
                                          Just-in-time elevation
                                        </span>
                                      </div>
                                      <span
                                        className="relative inline-flex items-center overflow-hidden"
                                        style={{ alignSelf: "center", gap: "0.8cqw", fontSize: "1.9cqw", fontWeight: "500", borderRadius: "0", padding: "0.6cqw 1.6cqw", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums", backgroundColor: "var(--v2-mock-badge-green-bg)", color: "var(--v2-mock-badge-green-text)" } as CSSProperties}
                                      >
                                        <svg
                                          width="1.5em"
                                          height="1.5em"
                                          strokeWidth="2.5"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          color="currentColor"
                                          style={{ width: "2cqw", height: "2cqw" } as CSSProperties}
                                          aria-hidden="true"
                                        >
                                          <path d="M12 6L12 12L18 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                          <path
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <span>
                                          15m access
                                        </span>
                                        <span
                                          aria-hidden="true"
                                          style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "0.4cqw", backgroundColor: "var(--v2-mock-badge-green-text)", opacity: "0.55", transformOrigin: "left center", transform: "none" } as CSSProperties}
                                        />
                                      </span>
                                    </div>
                                    <div
                                      style={{ display: "grid", gridTemplateColumns: "14% 1fr auto", alignItems: "center", columnGap: "2cqw", flex: "1 1 0", minHeight: "0", overflow: "hidden", borderTop: "1px solid var(--v2-mock-border)", padding: "max(1cqw, 6px) max(3cqw, 18px)", opacity: "0", transform: "translateY(6px)", transition: "opacity 300ms ease-out, transform 300ms ease-out" } as CSSProperties}
                                    >
                                      <div className="flex flex-col" style={{ gap: "max(0.3cqw, 2px)" } as CSSProperties}>
                                        <span
                                          style={{ fontSize: "2.3cqw", lineHeight: "2.7cqw", color: "var(--v2-mock-text)", fontVariantNumeric: "tabular-nums", fontWeight: "500" } as CSSProperties}
                                        >
                                          0:14
                                        </span>
                                        <span
                                          className="pam-sub"
                                          style={{ fontSize: "1.9cqw", lineHeight: "2.5cqw", color: "var(--v2-mock-text-faint)", fontVariantNumeric: "tabular-nums" } as CSSProperties}
                                        >
                                          14:34:37
                                        </span>
                                      </div>
                                      <div
                                        className="flex flex-col"
                                        style={{ gap: "max(0.3cqw, 2px)", minWidth: "0" } as CSSProperties}
                                      >
                                        <span
                                          style={{ fontSize: "2.5cqw", lineHeight: "2.7cqw", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--v2-mock-text)" } as CSSProperties}
                                        >
                                          Elevated to root
                                        </span>
                                        <span
                                          className="pam-sub"
                                          style={{ fontSize: "2.3cqw", lineHeight: "2.5cqw", color: "var(--v2-mock-text-faint)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as CSSProperties}
                                        >
                                          Approved by on-call
                                        </span>
                                      </div>
                                      <span
                                        className="relative inline-flex items-center overflow-hidden"
                                        style={{ alignSelf: "center", gap: "0.8cqw", fontSize: "1.9cqw", fontWeight: "500", borderRadius: "0", padding: "0.6cqw 1.6cqw", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums", backgroundColor: "var(--v2-mock-badge-green-bg)", color: "var(--v2-mock-badge-green-text)" } as CSSProperties}
                                      >
                                        <svg
                                          width="1.5em"
                                          height="1.5em"
                                          strokeWidth="2.5"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          color="currentColor"
                                          style={{ width: "2cqw", height: "2cqw" } as CSSProperties}
                                          aria-hidden="true"
                                        >
                                          <path d="M12 6L12 12L18 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                          <path
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <span>
                                          15m access
                                        </span>
                                        <span
                                          aria-hidden="true"
                                          style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "0.4cqw", backgroundColor: "var(--v2-mock-badge-green-text)", opacity: "0.55", transformOrigin: "left center", transform: "none" } as CSSProperties}
                                        />
                                      </span>
                                    </div>
                                    <div
                                      style={{ display: "grid", gridTemplateColumns: "14% 1fr auto", alignItems: "center", columnGap: "2cqw", flex: "1 1 0", minHeight: "0", overflow: "hidden", borderTop: "1px solid var(--v2-mock-border)", padding: "max(1cqw, 6px) max(3cqw, 18px)", opacity: "0", transform: "translateY(6px)", transition: "opacity 300ms ease-out, transform 300ms ease-out" } as CSSProperties}
                                    >
                                      <div className="flex flex-col" style={{ gap: "max(0.3cqw, 2px)" } as CSSProperties}>
                                        <span
                                          style={{ fontSize: "2.3cqw", lineHeight: "2.7cqw", color: "var(--v2-mock-text)", fontVariantNumeric: "tabular-nums", fontWeight: "500" } as CSSProperties}
                                        >
                                          0:20
                                        </span>
                                        <span
                                          className="pam-sub"
                                          style={{ fontSize: "1.9cqw", lineHeight: "2.5cqw", color: "var(--v2-mock-text-faint)", fontVariantNumeric: "tabular-nums" } as CSSProperties}
                                        >
                                          14:35:58
                                        </span>
                                      </div>
                                      <div
                                        className="flex flex-col"
                                        style={{ gap: "max(0.3cqw, 2px)", minWidth: "0" } as CSSProperties}
                                      >
                                        <span
                                          style={{ fontSize: "2.5cqw", lineHeight: "2.7cqw", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--v2-mock-text)" } as CSSProperties}
                                        >
                                          Read-only window closed
                                        </span>
                                        <span
                                          className="pam-sub"
                                          style={{ fontSize: "2.3cqw", lineHeight: "2.5cqw", color: "var(--v2-mock-text-faint)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as CSSProperties}
                                        >
                                          psql access auto-revoked
                                        </span>
                                      </div>
                                      <span
                                        className="relative inline-flex items-center overflow-hidden"
                                        style={{ alignSelf: "center", gap: "0.8cqw", fontSize: "1.9cqw", fontWeight: "500", borderRadius: "0", padding: "0.6cqw 1.6cqw", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums", backgroundColor: "var(--v2-mock-badge-red-bg)", color: "var(--v2-mock-badge-red-text)" } as CSSProperties}
                                      >
                                        <svg
                                          width="1.5em"
                                          height="1.5em"
                                          strokeWidth="2.5"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          color="currentColor"
                                          style={{ width: "2cqw", height: "2cqw" } as CSSProperties}
                                          aria-hidden="true"
                                        >
                                          <path d="M12 6L12 12L18 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                          <path
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <span>
                                          Expired
                                        </span>
                                      </span>
                                    </div>
                                    <div
                                      style={{ display: "grid", gridTemplateColumns: "14% 1fr auto", alignItems: "center", columnGap: "2cqw", flex: "1 1 0", minHeight: "0", overflow: "hidden", borderTop: "1px solid var(--v2-mock-border)", padding: "max(1cqw, 6px) max(3cqw, 18px)", opacity: "0", transform: "translateY(6px)", transition: "opacity 300ms ease-out, transform 300ms ease-out" } as CSSProperties}
                                    >
                                      <div className="flex flex-col" style={{ gap: "max(0.3cqw, 2px)" } as CSSProperties}>
                                        <span
                                          style={{ fontSize: "2.3cqw", lineHeight: "2.7cqw", color: "var(--v2-mock-text)", fontVariantNumeric: "tabular-nums", fontWeight: "500" } as CSSProperties}
                                        >
                                          0:23
                                        </span>
                                        <span
                                          className="pam-sub"
                                          style={{ fontSize: "1.9cqw", lineHeight: "2.5cqw", color: "var(--v2-mock-text-faint)", fontVariantNumeric: "tabular-nums" } as CSSProperties}
                                        >
                                          14:37:26
                                        </span>
                                      </div>
                                      <div
                                        className="flex flex-col"
                                        style={{ gap: "max(0.3cqw, 2px)", minWidth: "0" } as CSSProperties}
                                      >
                                        <span
                                          style={{ fontSize: "2.5cqw", lineHeight: "2.7cqw", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--v2-mock-text)" } as CSSProperties}
                                        >
                                          Session terminated
                                        </span>
                                        <span
                                          className="pam-sub"
                                          style={{ fontSize: "2.3cqw", lineHeight: "2.5cqw", color: "var(--v2-mock-text-faint)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as CSSProperties}
                                        >
                                          Auto-revoked · idle 90s
                                        </span>
                                      </div>
                                      <span
                                        className="relative inline-flex items-center overflow-hidden"
                                        style={{ alignSelf: "center", gap: "0.8cqw", fontSize: "1.9cqw", fontWeight: "500", borderRadius: "0", padding: "0.6cqw 1.6cqw", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums", backgroundColor: "var(--v2-mock-badge-red-bg)", color: "var(--v2-mock-badge-red-text)" } as CSSProperties}
                                      >
                                        <svg
                                          width="1.5em"
                                          height="1.5em"
                                          strokeWidth="2.5"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          color="currentColor"
                                          style={{ width: "2cqw", height: "2cqw" } as CSSProperties}
                                          aria-hidden="true"
                                        >
                                          <path d="M12 6L12 12L18 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                          <path
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <span>
                                          Expired
                                        </span>
                                      </span>
                                    </div>
                                    <div
                                      style={{ flex: "0 0 auto", borderTop: "1px solid var(--v2-mock-border)", padding: "max(1.4cqw, 10px) max(3cqw, 18px)", display: "grid", gridTemplateColumns: "auto auto 1fr auto", alignItems: "center", columnGap: "2cqw" } as CSSProperties}
                                    >
                                      <button
                                        type="button"
                                        className="inline-flex items-center justify-center shrink-0"
                                        style={{ width: "4.4cqw", height: "4.4cqw", borderRadius: "50%", backgroundColor: "var(--v2-mock-text)", color: "var(--v2-mock-surface)", border: "none", padding: "0", cursor: "pointer" } as CSSProperties}
                                        aria-label="Pause"
                                      >
                                        <svg
                                          viewBox="0 0 10 10"
                                          style={{ width: "1.8cqw", height: "1.8cqw" } as CSSProperties}
                                          fill="currentColor"
                                        >
                                          <rect x="2" y="1.5" width="2" height="7" />
                                          <rect x="6" y="1.5" width="2" height="7" />
                                        </svg>
                                      </button>
                                      <span
                                        style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text)", fontVariantNumeric: "tabular-nums" } as CSSProperties}
                                      >
                                        0:00
                                      </span>
                                      <span
                                        style={{ position: "relative", display: "block", height: "0.4cqw", minHeight: "2px", backgroundColor: "var(--v2-mock-border)", borderRadius: "999px", cursor: "pointer", touchAction: "none" } as CSSProperties}
                                      >
                                        <span
                                          style={{ position: "absolute", inset: "0 auto 0 0", width: "0%", backgroundColor: "var(--v2-mock-text)", borderRadius: "999px" } as CSSProperties}
                                        />
                                        <span
                                          aria-hidden="true"
                                          title="Access expired"
                                          style={{ position: "absolute", top: "50%", left: "80%", transform: "translate(-50%, -50%)", width: "0.4cqw", minWidth: "2px", height: "1.6cqw", minHeight: "6px", backgroundColor: "var(--v2-mock-badge-red-text)", borderRadius: "1px" } as CSSProperties}
                                        />
                                        <span
                                          style={{ position: "absolute", top: "50%", left: "0%", transform: "translate(-50%, -50%)", width: "1.6cqw", height: "1.6cqw", minWidth: "6px", minHeight: "6px", borderRadius: "50%", backgroundColor: "var(--v2-mock-text)" } as CSSProperties}
                                        />
                                      </span>
                                      <span
                                        style={{ fontSize: "2.3cqw", color: "var(--v2-mock-text-faint)", fontVariantNumeric: "tabular-nums" } as CSSProperties}
                                      >
                                        0:25
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="h-[190px] lg:h-[calc(var(--v2-gutter)*1.5)]" />
                      </div>
                    </div>
                    <div
                      className="relative w-full overflow-hidden bg-v2-bg"
                      style={{ height: "var(--v2-sectionbreak-py)" } as CSSProperties}
                    >
                      <div
                        className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                        style={{ height: "var(--v2-border-width)", top: "40px" } as CSSProperties}
                      />
                      <div
                        className="relative mx-auto h-full"
                        style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 flex items-center"
                          style={{ top: "40px", paddingLeft: "var(--v2-grid-padding)" } as CSSProperties}
                        >
                          <div
                            className="mr-5 shrink-0 bg-v2-accent-green"
                            style={{ width: "1.7px", height: "13.5px" } as CSSProperties}
                          />
                          <span
                            className="font-v2-mono uppercase"
                            style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text)", opacity: "0.64", fontWeight: "var(--v2-weight-medium)", letterSpacing: "0.02em" } as CSSProperties}
                          >
                            Integrations
                          </span>
                        </div>
                      </div>
                    </div>
                    <svg
                      aria-hidden="true"
                      width="0"
                      height="0"
                      style={{ position: "absolute", pointerEvents: "none" } as CSSProperties}
                    >
                      <defs>
                        <filter id="v2-blob-warp-a" x="-20%" y="-20%" width="140%" height="140%">
                          <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="2" seed="7" result="noise" />
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="55" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                        <filter id="v2-blob-warp-b" x="-20%" y="-20%" width="140%" height="140%">
                          <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="2" seed="3" result="noise" />
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="45" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                      </defs>
                    </svg>
                    <div className="relative w-full overflow-hidden bg-v2-bg">
                      <div
                        className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                        style={{ height: "var(--v2-border-width)", top: "0" } as CSSProperties}
                      />
                      <div
                        className="relative mx-auto "
                        style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                      >
                        <div
                          className="integrations-stage"
                          style={{ position: "relative", padding: "calc(var(--v2-grid-padding) + var(--v2-half-col) / 2) var(--v2-grid-padding) 0", "--v2-integrations-bg": "none", "--v2-integrations-bg-invert": "0", "--v2-cta-corner-brightness": "1", "--v2-cta-corner-saturation": "1" } as CSSProperties}
                        >
                          <div
                            aria-hidden="true"
                            className="v2-reliability-bg"
                            style={{ position: "absolute", top: "0", bottom: "0", left: "var(--v2-content-padding)", right: "var(--v2-content-padding)", backgroundImage: "var(--v2-integrations-bg)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "invert(var(--v2-integrations-bg-invert, 0)) saturate(var(--v2-integrations-bg-saturate, 1))", opacity: "0.8", pointerEvents: "none", zIndex: "0" } as CSSProperties}
                          />
                          <div
                            aria-hidden="true"
                            style={{ position: "absolute", top: "0", bottom: "0", left: "var(--v2-content-padding)", right: "var(--v2-content-padding)", backgroundColor: "transparent", mixBlendMode: "hard-light", filter: "saturate(1.5)", opacity: "0", transition: "opacity var(--v2-dur-slow) var(--v2-ease), background-color var(--v2-dur-slow) var(--v2-ease)", pointerEvents: "none", zIndex: "1" } as CSSProperties}
                          />
                          <div
                            className="v2-block-inset"
                            style={{ position: "relative", zIndex: "2", paddingLeft: "calc((100% - 6 * var(--v2-gutter)) / 7 / 2)", paddingRight: "calc((100% - 6 * var(--v2-gutter)) / 7 / 2)" } as CSSProperties}
                          >
                            <div
                              className="v2-stack-mobile grid"
                              style={{ gridTemplateColumns: "calc(4 * ((100% - 6 * var(--v2-gutter)) / 7) + 3 * var(--v2-gutter)) calc(3 * ((100% - 6 * var(--v2-gutter)) / 7) + 3 * var(--v2-gutter))", borderTop: "var(--v2-border-width) solid var(--v2-color-border-subtle)", borderLeft: "var(--v2-border-width) solid var(--v2-color-border-subtle)", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", overflow: "hidden" } as CSSProperties}
                            >
                              <div>
                                <div
                                  className="relative w-full"
                                  style={{ backgroundColor: "var(--v2-color-bg)", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "64px", paddingBottom: "64px", height: "calc(calc(4 * clamp(64px, 7vw, 104px) + 3 * clamp(8px, 1vw, 14px)) + 128px)", overflow: "hidden" } as CSSProperties}
                                >
                                  <div
                                    style={{ display: "grid", gridTemplateColumns: "repeat(12, clamp(64px, 7vw, 104px))", gridTemplateRows: "repeat(10, clamp(64px, 7vw, 104px))", gap: "clamp(8px, 1vw, 14px)", flexShrink: "0" } as CSSProperties}
                                  >
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ position: "relative", border: "1px solid var(--v2-color-border)", overflow: "hidden" } as CSSProperties}
                                    >
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "-50%", backgroundImage: "var(--v2-integrations-bg)", backgroundSize: "600%", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "invert(var(--v2-integrations-bg-invert, 0)) saturate(var(--v2-integrations-bg-saturate, 1))", opacity: "0.8", transform: "rotate(105deg)", pointerEvents: "none" } as CSSProperties}
                                      />
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "0", backgroundColor: "transparent", mixBlendMode: "hard-light", filter: "saturate(1.5)", opacity: "0", transition: "opacity var(--v2-dur-slow) var(--v2-ease), background-color var(--v2-dur-slow) var(--v2-ease)", pointerEvents: "none" } as CSSProperties}
                                      />
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ position: "relative", border: "1px solid var(--v2-color-border)", overflow: "hidden" } as CSSProperties}
                                    >
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "-50%", backgroundImage: "var(--v2-integrations-bg)", backgroundSize: "600%", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "invert(var(--v2-integrations-bg-invert, 0)) saturate(var(--v2-integrations-bg-saturate, 1))", opacity: "0.8", transform: "rotate(190deg)", pointerEvents: "none" } as CSSProperties}
                                      />
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "0", backgroundColor: "transparent", mixBlendMode: "hard-light", filter: "saturate(1.5)", opacity: "0", transition: "opacity var(--v2-dur-slow) var(--v2-ease), background-color var(--v2-dur-slow) var(--v2-ease)", pointerEvents: "none" } as CSSProperties}
                                      />
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ position: "relative", border: "1px solid var(--v2-color-border)", overflow: "hidden" } as CSSProperties}
                                    >
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "-50%", backgroundImage: "var(--v2-integrations-bg)", backgroundSize: "600%", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "invert(var(--v2-integrations-bg-invert, 0)) saturate(var(--v2-integrations-bg-saturate, 1))", opacity: "0.8", transform: "rotate(97deg)", pointerEvents: "none" } as CSSProperties}
                                      />
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "0", backgroundColor: "transparent", mixBlendMode: "hard-light", filter: "saturate(1.5)", opacity: "0", transition: "opacity var(--v2-dur-slow) var(--v2-ease), background-color var(--v2-dur-slow) var(--v2-ease)", pointerEvents: "none" } as CSSProperties}
                                      />
                                    </div>
                                    <a
                                      aria-label="Hermes"
                                      style={{ position: "relative", background: "#ffffff", border: "1px solid var(--v2-color-border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease", transform: "translateY(0)", cursor: "pointer" } as CSSProperties}
                                      href="/#hermes"
                                    >
                                      <img alt="" src="/logo/hermes-agent-icon.png" style={{ width: "100%", height: "100%", objectFit: "cover" } as CSSProperties} />
                                    </a>
                                    <a
                                      aria-label="OpenClaw"
                                      style={{ position: "relative", background: "#ffffff", border: "1px solid var(--v2-color-border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease", transform: "translateY(0)", cursor: "pointer" } as CSSProperties}
                                      href="/#openclaw"
                                    >
                                      <img alt="" src="/logo/openclaw-icon.png" style={{ width: "100%", height: "100%", objectFit: "cover" } as CSSProperties} />
                                    </a>
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ position: "relative", border: "1px solid var(--v2-color-border)", overflow: "hidden" } as CSSProperties}
                                    >
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "-50%", backgroundImage: "var(--v2-integrations-bg)", backgroundSize: "600%", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "invert(var(--v2-integrations-bg-invert, 0)) saturate(var(--v2-integrations-bg-saturate, 1))", opacity: "0.8", transform: "rotate(331deg)", pointerEvents: "none" } as CSSProperties}
                                      />
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "0", backgroundColor: "transparent", mixBlendMode: "hard-light", filter: "saturate(1.5)", opacity: "0", transition: "opacity var(--v2-dur-slow) var(--v2-ease), background-color var(--v2-dur-slow) var(--v2-ease)", pointerEvents: "none" } as CSSProperties}
                                      />
                                    </div>
                                    <a
                                      aria-label="GitHub"
                                      style={{ position: "relative", background: "#181717", border: "1px solid var(--v2-color-border)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease", transform: "translateY(0)", cursor: "pointer" } as CSSProperties}
                                      href="#"
                                    >
                                      <div
                                        style={{ width: "52%", height: "52%", backgroundColor: "#ffffff", WebkitMaskImage: "url(/gitcrew/images/landing/integrations/github-black.png)", maskImage: "url(/gitcrew/images/landing/integrations/github-black.png)", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center", WebkitMaskSize: "contain", maskSize: "contain", transition: "background-color 200ms ease" } as CSSProperties}
                                      />
                                    </a>
                                    <a
                                      aria-label="Grokbot"
                                      style={{ position: "relative", background: "#ffffff", border: "1px solid var(--v2-color-border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease", transform: "translateY(0)", cursor: "pointer" } as CSSProperties}
                                      href="/#grokbot"
                                    >
                                      <img alt="" src="/logo/grok-bot-icon.png" style={{ width: "100%", height: "100%", objectFit: "cover" } as CSSProperties} />
                                    </a>
                                    <a
                                      aria-label="Ponytail"
                                      style={{ position: "relative", background: "#ffffff", border: "1px solid var(--v2-color-border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease", transform: "translateY(0)", cursor: "pointer" } as CSSProperties}
                                      href="/#ponytail"
                                    >
                                      <img alt="" src="/logo/ponytail-icon.png" style={{ width: "100%", height: "100%", objectFit: "cover" } as CSSProperties} />
                                    </a>
                                    <a
                                      aria-label="AntiSlop"
                                      style={{ position: "relative", background: "#ffffff", border: "1px solid var(--v2-color-border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease", transform: "translateY(0)", cursor: "pointer" } as CSSProperties}
                                      href="/#antislop"
                                    >
                                      <span aria-hidden="true" style={{ width: "34%", height: "34%", background: "#1f8a4c" } as CSSProperties} />
                                    </a>
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <a
                                      aria-label="OpenAI Dots"
                                      style={{ position: "relative", background: "#ffffff", border: "1px solid var(--v2-color-border)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6%", overflow: "hidden", transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease", transform: "translateY(0)", cursor: "pointer" } as CSSProperties}
                                      href="/#openai-dots"
                                    >
                                      <span aria-hidden="true" style={{ width: "12%", height: "12%", borderRadius: "50%", background: "#f0d45c" } as CSSProperties} />
                                      <span aria-hidden="true" style={{ width: "12%", height: "12%", borderRadius: "50%", background: "#f0d45c" } as CSSProperties} />
                                      <span aria-hidden="true" style={{ width: "12%", height: "12%", borderRadius: "50%", background: "#f0d45c" } as CSSProperties} />
                                    </a>
                                    <a
                                      aria-label="Hermes"
                                      style={{ position: "relative", background: "#ffffff", border: "1px solid var(--v2-color-border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease", transform: "translateY(0)", cursor: "pointer" } as CSSProperties}
                                      href="/#hermes"
                                    >
                                      <img alt="" src="/logo/hermes-agent-icon.png" style={{ width: "100%", height: "100%", objectFit: "cover" } as CSSProperties} />
                                    </a>
                                    <a
                                      aria-label="OpenClaw"
                                      style={{ position: "relative", background: "#ffffff", border: "1px solid var(--v2-color-border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease", transform: "translateY(0)", cursor: "pointer" } as CSSProperties}
                                      href="/#openclaw"
                                    >
                                      <img alt="" src="/logo/openclaw-icon.png" style={{ width: "100%", height: "100%", objectFit: "cover" } as CSSProperties} />
                                    </a>
                                    <a
                                      aria-label="Vercel"
                                      style={{ position: "relative", background: "#000000", border: "1px solid var(--v2-color-border)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease", transform: "translateY(0)", cursor: "pointer" } as CSSProperties}
                                      href="#"
                                    >
                                      <div
                                        style={{ width: "52%", height: "52%", backgroundColor: "#ffffff", WebkitMaskImage: "url(/gitcrew/images/landing/integrations/vercel-black.png)", maskImage: "url(/gitcrew/images/landing/integrations/vercel-black.png)", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center", WebkitMaskSize: "contain", maskSize: "contain", transition: "background-color 200ms ease" } as CSSProperties}
                                      />
                                    </a>
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ position: "relative", border: "1px solid var(--v2-color-border)", overflow: "hidden" } as CSSProperties}
                                    >
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "-50%", backgroundImage: "var(--v2-integrations-bg)", backgroundSize: "600%", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "invert(var(--v2-integrations-bg-invert, 0)) saturate(var(--v2-integrations-bg-saturate, 1))", opacity: "0.8", transform: "rotate(21deg)", pointerEvents: "none" } as CSSProperties}
                                      />
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "0", backgroundColor: "transparent", mixBlendMode: "hard-light", filter: "saturate(1.5)", opacity: "0", transition: "opacity var(--v2-dur-slow) var(--v2-ease), background-color var(--v2-dur-slow) var(--v2-ease)", pointerEvents: "none" } as CSSProperties}
                                      />
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <a
                                      aria-label="Grokbot"
                                      style={{ position: "relative", background: "#ffffff", border: "1px solid var(--v2-color-border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease", transform: "translateY(0)", cursor: "pointer" } as CSSProperties}
                                      href="/#grokbot"
                                    >
                                      <img alt="" src="/logo/grok-bot-icon.png" style={{ width: "100%", height: "100%", objectFit: "cover" } as CSSProperties} />
                                    </a>
                                    <a
                                      aria-label="Ponytail"
                                      style={{ position: "relative", background: "#ffffff", border: "1px solid var(--v2-color-border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease", transform: "translateY(0)", cursor: "pointer" } as CSSProperties}
                                      href="/#ponytail"
                                    >
                                      <img alt="" src="/logo/ponytail-icon.png" style={{ width: "100%", height: "100%", objectFit: "cover" } as CSSProperties} />
                                    </a>
                                    <div
                                      aria-hidden="true"
                                      style={{ position: "relative", border: "1px solid var(--v2-color-border)", overflow: "hidden" } as CSSProperties}
                                    >
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "-50%", backgroundImage: "var(--v2-integrations-bg)", backgroundSize: "600%", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "invert(var(--v2-integrations-bg-invert, 0)) saturate(var(--v2-integrations-bg-saturate, 1))", opacity: "0.8", transform: "rotate(26deg)", pointerEvents: "none" } as CSSProperties}
                                      />
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "0", backgroundColor: "transparent", mixBlendMode: "hard-light", filter: "saturate(1.5)", opacity: "0", transition: "opacity var(--v2-dur-slow) var(--v2-ease), background-color var(--v2-dur-slow) var(--v2-ease)", pointerEvents: "none" } as CSSProperties}
                                      />
                                    </div>
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ position: "relative", border: "1px solid var(--v2-color-border)", overflow: "hidden" } as CSSProperties}
                                    >
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "-50%", backgroundImage: "var(--v2-integrations-bg)", backgroundSize: "600%", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "invert(var(--v2-integrations-bg-invert, 0)) saturate(var(--v2-integrations-bg-saturate, 1))", opacity: "0.8", transform: "rotate(76deg)", pointerEvents: "none" } as CSSProperties}
                                      />
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "0", backgroundColor: "transparent", mixBlendMode: "hard-light", filter: "saturate(1.5)", opacity: "0", transition: "opacity var(--v2-dur-slow) var(--v2-ease), background-color var(--v2-dur-slow) var(--v2-ease)", pointerEvents: "none" } as CSSProperties}
                                      />
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ position: "relative", border: "1px solid var(--v2-color-border)", overflow: "hidden" } as CSSProperties}
                                    >
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "-50%", backgroundImage: "var(--v2-integrations-bg)", backgroundSize: "600%", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "invert(var(--v2-integrations-bg-invert, 0)) saturate(var(--v2-integrations-bg-saturate, 1))", opacity: "0.8", transform: "rotate(217deg)", pointerEvents: "none" } as CSSProperties}
                                      />
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "0", backgroundColor: "transparent", mixBlendMode: "hard-light", filter: "saturate(1.5)", opacity: "0", transition: "opacity var(--v2-dur-slow) var(--v2-ease), background-color var(--v2-dur-slow) var(--v2-ease)", pointerEvents: "none" } as CSSProperties}
                                      />
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ position: "relative", border: "1px solid var(--v2-color-border)", overflow: "hidden" } as CSSProperties}
                                    >
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "-50%", backgroundImage: "var(--v2-integrations-bg)", backgroundSize: "600%", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "invert(var(--v2-integrations-bg-invert, 0)) saturate(var(--v2-integrations-bg-saturate, 1))", opacity: "0.8", transform: "rotate(329deg)", pointerEvents: "none" } as CSSProperties}
                                      />
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "0", backgroundColor: "transparent", mixBlendMode: "hard-light", filter: "saturate(1.5)", opacity: "0", transition: "opacity var(--v2-dur-slow) var(--v2-ease), background-color var(--v2-dur-slow) var(--v2-ease)", pointerEvents: "none" } as CSSProperties}
                                      />
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ position: "relative", border: "1px solid var(--v2-color-border)", overflow: "hidden" } as CSSProperties}
                                    >
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "-50%", backgroundImage: "var(--v2-integrations-bg)", backgroundSize: "600%", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "invert(var(--v2-integrations-bg-invert, 0)) saturate(var(--v2-integrations-bg-saturate, 1))", opacity: "0.8", transform: "rotate(240deg)", pointerEvents: "none" } as CSSProperties}
                                      />
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "0", backgroundColor: "transparent", mixBlendMode: "hard-light", filter: "saturate(1.5)", opacity: "0", transition: "opacity var(--v2-dur-slow) var(--v2-ease), background-color var(--v2-dur-slow) var(--v2-ease)", pointerEvents: "none" } as CSSProperties}
                                      />
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ position: "relative", border: "1px solid var(--v2-color-border)", overflow: "hidden" } as CSSProperties}
                                    >
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "-50%", backgroundImage: "var(--v2-integrations-bg)", backgroundSize: "600%", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "invert(var(--v2-integrations-bg-invert, 0)) saturate(var(--v2-integrations-bg-saturate, 1))", opacity: "0.8", transform: "rotate(47deg)", pointerEvents: "none" } as CSSProperties}
                                      />
                                      <div
                                        aria-hidden="true"
                                        style={{ position: "absolute", inset: "0", backgroundColor: "transparent", mixBlendMode: "hard-light", filter: "saturate(1.5)", opacity: "0", transition: "opacity var(--v2-dur-slow) var(--v2-ease), background-color var(--v2-dur-slow) var(--v2-ease)", pointerEvents: "none" } as CSSProperties}
                                      />
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div aria-hidden="true" />
                                    <div aria-hidden="true" />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                    <div
                                      aria-hidden="true"
                                      style={{ border: "1px dashed var(--v2-color-border)", backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--v2-color-text) 14%, transparent) 1px, transparent 1.4px)", backgroundSize: "10px 10px", backgroundPosition: "center", opacity: "0.85" } as CSSProperties}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div
                                className="flex flex-col justify-center"
                                style={{ borderLeft: "var(--v2-border-width) solid var(--v2-color-border-subtle)" } as CSSProperties}
                              >
                                <div
                                  className="v2-label-card group relative flex flex-col overflow-hidden"
                                  style={{ padding: "48px 64px", gap: "10px", flex: "1", justifyContent: "center" } as CSSProperties}
                                >
                                  <div className="relative flex flex-col" style={{ gap: "10px", zIndex: "1" } as CSSProperties}>
                                    <div className="flex items-center" style={{ gap: "8px" } as CSSProperties}>
                                      <span
                                        className="inline-flex"
                                        style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                      >
                                        <svg
                                          width="15"
                                          height="16"
                                          strokeWidth="2.5"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          color="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path d="M12 13.1538V21" stroke="currentColor" strokeLinecap="round" />
                                          <path
                                            d="M17 8.38452V11.1538C17 12.2583 16.1046 13.1538 15 13.1538H9C7.89543 13.1538 7 12.2583 7 11.1538V8.38452C7 7.27995 7.89543 6.38452 9 6.38452H15C16.1046 6.38452 17 7.27995 17 8.38452Z"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                          />
                                          <path d="M15.3334 6.38462V3" stroke="currentColor" strokeLinecap="round" />
                                          <path d="M8.66663 6.38462V3" stroke="currentColor" strokeLinecap="round" />
                                        </svg>
                                      </span>
                                      <span
                                        className="font-v2-mono uppercase"
                                        style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text-tertiary)", fontWeight: "var(--v2-weight-medium)", letterSpacing: "0.02em" } as CSSProperties}
                                      >
                                        Integrations
                                      </span>
                                    </div>
                                    <h3
                                      className="font-v2-sans text-v2-h2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.02em" } as CSSProperties}
                                    >
                                      They run on 
                                      <span
                                        style={{ position: "relative", display: "inline-block", padding: "0.06em 0.18em", margin: "0 0.02em", color: "var(--v2-color-void)", whiteSpace: "nowrap" } as CSSProperties}
                                      >
                                        <span
                                          aria-hidden="true"
                                          style={{ position: "absolute", inset: "0", background: "var(--v2-color-volt)", zIndex: "0" } as CSSProperties}
                                        />
                                        <span style={{ position: "relative", zIndex: "1" } as CSSProperties}>
                                          your PRs.
                                        </span>
                                      </span>
                                    </h3>
                                    <p
                                      className="font-v2-sans text-v2-b1"
                                      style={{ color: "var(--v2-color-text-secondary)" } as CSSProperties}
                                    >
                                      GitCrew installs as a GitHub App and runs the agents in GitHub Actions, inside your repository.
                                    </p>
                                    <a
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex w-fit items-center self-start font-v2-sans transition-opacity hover:opacity-70"
                                      style={{ gap: "4px", color: "var(--v2-color-text-accent)", fontSize: "var(--v2-text-b2)", lineHeight: "var(--v2-lh-body)", fontWeight: "var(--v2-weight-medium)" } as CSSProperties}
                                      href="https://github.com/MrSpideyNihal/Pr-agent"
                                    >
                                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                        <path
                                          d="M4.5 2.5L8 6l-3.5 3.5"
                                          stroke="currentColor"
                                          strokeWidth="1.2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      See the GitHub App
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="relative w-full overflow-hidden bg-v2-bg"
                      style={{ height: "var(--v2-sectionbreak-py)" } as CSSProperties}
                    >
                      <div
                        className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                        style={{ height: "var(--v2-border-width)", top: "0" } as CSSProperties}
                      />
                      <div
                        className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                        style={{ height: "var(--v2-border-width)", top: "40px" } as CSSProperties}
                      />
                      <div
                        className="relative mx-auto h-full"
                        style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 flex items-center"
                          style={{ top: "40px", paddingLeft: "var(--v2-grid-padding)" } as CSSProperties}
                        >
                          <div
                            className="mr-5 shrink-0 bg-v2-accent-green"
                            style={{ width: "1.7px", height: "13.5px" } as CSSProperties}
                          />
                          <span
                            className="font-v2-mono uppercase"
                            style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text)", opacity: "0.64", fontWeight: "var(--v2-weight-medium)", letterSpacing: "0.02em" } as CSSProperties}
                          >
                            The lineup
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full overflow-hidden bg-v2-bg">
                      <div
                        className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                        style={{ height: "var(--v2-border-width)", top: "0" } as CSSProperties}
                      />
                      <div
                        className="relative mx-auto "
                        style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                      >
                        <div
                          style={{ padding: "0 var(--v2-grid-padding)", paddingTop: "var(--v2-space-6)" } as CSSProperties}
                        >
                          <div
                            className="v2-section-header-row flex items-center justify-between"
                            style={{ paddingTop: "var(--v2-space-9)", paddingBottom: "var(--v2-space-7)" } as CSSProperties}
                          >
                            <div
                              style={{ maxWidth: "72%", marginLeft: "calc((100% - 6 * var(--v2-gutter)) / 14)" } as CSSProperties}
                            >
                              <h2
                                className="font-v2-sans text-v2-h2 text-v2-text"
                                style={{ fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.02em" } as CSSProperties}
                              >
                                Multiple agents, managed and 
                                <span
                                  style={{ position: "relative", display: "inline-block", padding: "0.06em 0.18em", margin: "0 0.02em", color: "var(--v2-color-void)", whiteSpace: "nowrap" } as CSSProperties}
                                >
                                  <span
                                    aria-hidden="true"
                                    style={{ position: "absolute", inset: "0", background: "var(--v2-color-volt)", zIndex: "0" } as CSSProperties}
                                  />
                                  <span style={{ position: "relative", zIndex: "1" } as CSSProperties}>
                                    billed
                                  </span>
                                </span>
                                 together.
                              </h2>
                            </div>
                            <div style={{ marginRight: "calc((100% - 6 * var(--v2-gutter)) / 14)" } as CSSProperties}>
                              <a className="v2-btn v2-btn--md v2-btn--primary" href="/#lineup">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="" aria-hidden="true">
                                  <path
                                    d="M4.5 2.5L8 6l-3.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                See the agents
                              </a>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{ paddingTop: "var(--v2-space-1)", paddingBottom: "calc(var(--v2-content-padding-y) * 0.5)" } as CSSProperties}
                          className="jsx-164446a02e993597"
                        >
                          <div
                            style={{ padding: "0 var(--v2-content-padding)" } as CSSProperties}
                            className="jsx-164446a02e993597"
                          >
                            <div
                              style={{ overflow: "hidden" } as CSSProperties}
                              className="jsx-164446a02e993597 customer-stories-clip"
                            >
                              <div
                                style={{ display: "flex", columnGap: "24px", overflowX: "auto", scrollSnapType: "x mandatory", scrollBehavior: "smooth", paddingLeft: "calc(var(--v2-gutter) + var(--v2-half-col))", scrollPaddingLeft: "calc(var(--v2-gutter) + var(--v2-half-col))", paddingRight: "var(--v2-gutter)", paddingBottom: "4px" } as CSSProperties}
                                className="jsx-164446a02e993597 customer-stories-strip no-scrollbar"
                              >
                                <a
                                  data-card="true"
                                  className="group relative no-underline customer-stories-card"
                                  aria-label="Read John Doe"
                                  style={{ flex: "0 0 auto", width: "min(480px, 78vw)", aspectRatio: "4 / 3", scrollSnapAlign: "start", background: "var(--v2-color-bg)", border: "var(--v2-border-width) solid var(--v2-color-frame)", color: "#ffffff", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px", overflow: "hidden", position: "relative", transition: "transform var(--v2-dur-fast) var(--v2-ease), border-color var(--v2-dur-fast) var(--v2-ease), background var(--v2-dur-fast) var(--v2-ease), color var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                  href="#"
                                >
                                  <p
                                    className="font-v2-sans"
                                    style={{ position: "relative", margin: "0", fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)", fontWeight: "var(--v2-weight-medium)", lineHeight: "1.25", letterSpacing: "-0.015em", maxWidth: "28ch", textWrap: "pretty", color: "#ffffff" } as CSSProperties}
                                  >
                                    “AntiSlop reads the diff for slop, bad packages, and security holes, then leaves the review on the pull request.”
                                  </p>
                                  <div
                                    className="flex items-end justify-between"
                                    style={{ position: "relative", gap: "16px" } as CSSProperties}
                                  >
                                    <div className="flex flex-col" style={{ minWidth: "0", gap: "10px" } as CSSProperties}>
                                      <div className="flex flex-col" style={{ gap: "2px", minWidth: "0" } as CSSProperties}>
                                        <span
                                          className="font-v2-sans"
                                          style={{ fontSize: "var(--v2-text-b4)", fontWeight: "var(--v2-weight-medium)", color: "#ffffff", lineHeight: "var(--v2-lh-body)" } as CSSProperties}
                                        >
                                          John Doe
                                        </span>
                                        <span
                                          className="font-v2-sans"
                                          style={{ fontSize: "var(--v2-text-b4)", color: "rgba(255, 255, 255, 0.78)", lineHeight: "var(--v2-lh-body)" } as CSSProperties}
                                        >
                                          Engineering lead
                                        </span>
                                      </div>
                                      <span
                                        className="inline-flex items-center font-v2-sans group-focus-within:gap-[9px] group-hover:gap-[9px]"
                                        style={{ gap: "5px", fontSize: "var(--v2-text-b4)", fontWeight: "var(--v2-weight-semibold)", color: "#ffffff", textDecoration: "underline", textUnderlineOffset: "4px", transition: "gap var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                      >
                                        See the agent
                                        <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          aria-hidden="true"
                                          className="group-focus-within:translate-x-[2px] group-hover:translate-x-[2px]"
                                          style={{ transition: "transform var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                        >
                                          <path
                                            d="M4.5 2.5L8 6l-3.5 3.5"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", height: "28px", maxWidth: "44%", filter: "none", opacity: "0.92", flexShrink: "0" } as CSSProperties}
                                    >
                                      <img
                                        src="/logo/ponytail-icon.png"
                                        alt="Northwind"
                                        style={{ height: "100%", width: "auto", display: "block" } as CSSProperties}
                                      />
                                    </div>
                                  </div>
                                </a>
                                <a
                                  data-card="true"
                                  className="group relative no-underline customer-stories-card"
                                  aria-label="Read Jane Doe"
                                  style={{ flex: "0 0 auto", width: "min(480px, 78vw)", aspectRatio: "4 / 3", scrollSnapAlign: "start", background: "var(--v2-color-bg)", border: "var(--v2-border-width) solid var(--v2-color-frame)", color: "var(--v2-color-text)", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px", overflow: "hidden", position: "relative", transition: "transform var(--v2-dur-fast) var(--v2-ease), border-color var(--v2-dur-fast) var(--v2-ease), background var(--v2-dur-fast) var(--v2-ease), color var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                  href="#"
                                >
                                  <p
                                    className="font-v2-sans"
                                    style={{ position: "relative", margin: "0", fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)", fontWeight: "var(--v2-weight-medium)", lineHeight: "1.25", letterSpacing: "-0.015em", maxWidth: "28ch", textWrap: "pretty", color: "var(--v2-color-text)" } as CSSProperties}
                                  >
                                    “Hermes, OpenClaw, and Grokbot are different agents. You turn on the ones you want, per repository.”
                                  </p>
                                  <div
                                    className="flex items-end justify-between"
                                    style={{ position: "relative", gap: "16px" } as CSSProperties}
                                  >
                                    <div className="flex flex-col" style={{ minWidth: "0", gap: "10px" } as CSSProperties}>
                                      <div className="flex flex-col" style={{ gap: "2px", minWidth: "0" } as CSSProperties}>
                                        <span
                                          className="font-v2-sans"
                                          style={{ fontSize: "var(--v2-text-b4)", fontWeight: "var(--v2-weight-medium)", color: "var(--v2-color-text)", lineHeight: "var(--v2-lh-body)" } as CSSProperties}
                                        >
                                          Jane Doe
                                        </span>
                                        <span
                                          className="font-v2-sans"
                                          style={{ fontSize: "var(--v2-text-b4)", color: "var(--v2-color-text-subtle)", lineHeight: "var(--v2-lh-body)" } as CSSProperties}
                                        >
                                          Maintainer
                                        </span>
                                      </div>
                                      <span
                                        className="inline-flex items-center font-v2-sans group-focus-within:gap-[9px] group-hover:gap-[9px]"
                                        style={{ gap: "5px", fontSize: "var(--v2-text-b4)", fontWeight: "var(--v2-weight-semibold)", color: "var(--v2-color-text)", textDecoration: "underline", textUnderlineOffset: "4px", transition: "gap var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                      >
                                        See the agent
                                        <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          aria-hidden="true"
                                          className="group-focus-within:translate-x-[2px] group-hover:translate-x-[2px]"
                                          style={{ transition: "transform var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                        >
                                          <path
                                            d="M4.5 2.5L8 6l-3.5 3.5"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", height: "28px", maxWidth: "44%", filter: "brightness(0)", opacity: "0.92", flexShrink: "0" } as CSSProperties}
                                    >
                                      <img
                                        src="/gitcrew/images/logos/testimonitals-default/lucid-logo.webp"
                                        alt="Brightline"
                                        className=""
                                        style={{ height: "26px", width: "auto", display: "block" } as CSSProperties}
                                      />
                                    </div>
                                  </div>
                                </a>
                                <a
                                  data-card="true"
                                  className="group relative no-underline customer-stories-card"
                                  aria-label="Read Alex Doe"
                                  style={{ flex: "0 0 auto", width: "min(480px, 78vw)", aspectRatio: "4 / 3", scrollSnapAlign: "start", background: "var(--v2-color-bg)", border: "var(--v2-border-width) solid var(--v2-color-frame)", color: "var(--v2-color-text)", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px", overflow: "hidden", position: "relative", transition: "transform var(--v2-dur-fast) var(--v2-ease), border-color var(--v2-dur-fast) var(--v2-ease), background var(--v2-dur-fast) var(--v2-ease), color var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                  href="#"
                                >
                                  <p
                                    className="font-v2-sans"
                                    style={{ position: "relative", margin: "0", fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)", fontWeight: "var(--v2-weight-medium)", lineHeight: "1.25", letterSpacing: "-0.015em", maxWidth: "28ch", textWrap: "pretty", color: "var(--v2-color-text)" } as CSSProperties}
                                  >
                                    “Ponytail only pushes a small patch. The rest of the change stays yours to review.”
                                  </p>
                                  <div
                                    className="flex items-end justify-between"
                                    style={{ position: "relative", gap: "16px" } as CSSProperties}
                                  >
                                    <div className="flex flex-col" style={{ minWidth: "0", gap: "10px" } as CSSProperties}>
                                      <div className="flex flex-col" style={{ gap: "2px", minWidth: "0" } as CSSProperties}>
                                        <span
                                          className="font-v2-sans"
                                          style={{ fontSize: "var(--v2-text-b4)", fontWeight: "var(--v2-weight-medium)", color: "var(--v2-color-text)", lineHeight: "var(--v2-lh-body)" } as CSSProperties}
                                        >
                                          Alex Doe
                                        </span>
                                        <span
                                          className="font-v2-sans"
                                          style={{ fontSize: "var(--v2-text-b4)", color: "var(--v2-color-text-subtle)", lineHeight: "var(--v2-lh-body)" } as CSSProperties}
                                        >
                                          Reviewer
                                        </span>
                                      </div>
                                      <span
                                        className="inline-flex items-center font-v2-sans group-focus-within:gap-[9px] group-hover:gap-[9px]"
                                        style={{ gap: "5px", fontSize: "var(--v2-text-b4)", fontWeight: "var(--v2-weight-semibold)", color: "var(--v2-color-text)", textDecoration: "underline", textUnderlineOffset: "4px", transition: "gap var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                      >
                                        See the agent
                                        <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          aria-hidden="true"
                                          className="group-focus-within:translate-x-[2px] group-hover:translate-x-[2px]"
                                          style={{ transition: "transform var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                        >
                                          <path
                                            d="M4.5 2.5L8 6l-3.5 3.5"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", height: "28px", maxWidth: "44%", filter: "brightness(0)", opacity: "0.92", flexShrink: "0" } as CSSProperties}
                                    >
                                      <img
                                        src="/gitcrew/images/logos/testimonitals-default/writer-logo.webp"
                                        alt="Paper Co"
                                        className=""
                                        style={{ height: "26px", width: "auto", display: "block" } as CSSProperties}
                                      />
                                    </div>
                                  </div>
                                </a>
                                <a
                                  data-card="true"
                                  className="group relative no-underline customer-stories-card"
                                  aria-label="Read Sam Doe"
                                  style={{ flex: "0 0 auto", width: "min(480px, 78vw)", aspectRatio: "4 / 3", scrollSnapAlign: "start", background: "var(--v2-color-bg)", border: "var(--v2-border-width) solid var(--v2-color-frame)", color: "var(--v2-color-text)", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px", overflow: "hidden", position: "relative", transition: "transform var(--v2-dur-fast) var(--v2-ease), border-color var(--v2-dur-fast) var(--v2-ease), background var(--v2-dur-fast) var(--v2-ease), color var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                  href="#"
                                >
                                  <p
                                    className="font-v2-sans"
                                    style={{ position: "relative", margin: "0", fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)", fontWeight: "var(--v2-weight-medium)", lineHeight: "1.25", letterSpacing: "-0.015em", maxWidth: "28ch", textWrap: "pretty", color: "var(--v2-color-text)" } as CSSProperties}
                                  >
                                    “OpenAI Dots sits on the same contract: a pull request in, a check run and a review out.”
                                  </p>
                                  <div
                                    className="flex items-end justify-between"
                                    style={{ position: "relative", gap: "16px" } as CSSProperties}
                                  >
                                    <div className="flex flex-col" style={{ minWidth: "0", gap: "10px" } as CSSProperties}>
                                      <div className="flex flex-col" style={{ gap: "2px", minWidth: "0" } as CSSProperties}>
                                        <span
                                          className="font-v2-sans"
                                          style={{ fontSize: "var(--v2-text-b4)", fontWeight: "var(--v2-weight-medium)", color: "var(--v2-color-text)", lineHeight: "var(--v2-lh-body)" } as CSSProperties}
                                        >
                                          Sam Doe
                                        </span>
                                        <span
                                          className="font-v2-sans"
                                          style={{ fontSize: "var(--v2-text-b4)", color: "var(--v2-color-text-subtle)", lineHeight: "var(--v2-lh-body)" } as CSSProperties}
                                        >
                                          Engineer
                                        </span>
                                      </div>
                                      <span
                                        className="inline-flex items-center font-v2-sans group-focus-within:gap-[9px] group-hover:gap-[9px]"
                                        style={{ gap: "5px", fontSize: "var(--v2-text-b4)", fontWeight: "var(--v2-weight-semibold)", color: "var(--v2-color-text)", textDecoration: "underline", textUnderlineOffset: "4px", transition: "gap var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                      >
                                        See the agent
                                        <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          aria-hidden="true"
                                          className="group-focus-within:translate-x-[2px] group-hover:translate-x-[2px]"
                                          style={{ transition: "transform var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                        >
                                          <path
                                            d="M4.5 2.5L8 6l-3.5 3.5"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", height: "28px", maxWidth: "44%", filter: "brightness(0)", opacity: "0.92", flexShrink: "0" } as CSSProperties}
                                    >
                                      <img
                                        src="/gitcrew/images/logos/testimonitals-default/openrouter-logo.svg"
                                        alt="Route Co"
                                        className=""
                                        style={{ height: "40px", width: "auto", display: "block" } as CSSProperties}
                                      />
                                    </div>
                                  </div>
                                </a>
                                <a
                                  data-card="true"
                                  className="group relative no-underline customer-stories-card"
                                  aria-label="Read Casey Doe"
                                  style={{ flex: "0 0 auto", width: "min(480px, 78vw)", aspectRatio: "4 / 3", scrollSnapAlign: "start", background: "var(--v2-color-bg)", border: "var(--v2-border-width) solid var(--v2-color-frame)", color: "var(--v2-color-text)", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px", overflow: "hidden", position: "relative", transition: "transform var(--v2-dur-fast) var(--v2-ease), border-color var(--v2-dur-fast) var(--v2-ease), background var(--v2-dur-fast) var(--v2-ease), color var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                  href="#"
                                >
                                  <p
                                    className="font-v2-sans"
                                    style={{ position: "relative", margin: "0", fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)", fontWeight: "var(--v2-weight-medium)", lineHeight: "1.25", letterSpacing: "-0.015em", maxWidth: "28ch", textWrap: "pretty", color: "var(--v2-color-text)" } as CSSProperties}
                                  >
                                    “It is open source. Install the GitHub App, pick the agents, and they run on the next pull request.”
                                  </p>
                                  <div
                                    className="flex items-end justify-between"
                                    style={{ position: "relative", gap: "16px" } as CSSProperties}
                                  >
                                    <div className="flex flex-col" style={{ minWidth: "0", gap: "10px" } as CSSProperties}>
                                      <div className="flex flex-col" style={{ gap: "2px", minWidth: "0" } as CSSProperties}>
                                        <span
                                          className="font-v2-sans"
                                          style={{ fontSize: "var(--v2-text-b4)", fontWeight: "var(--v2-weight-medium)", color: "var(--v2-color-text)", lineHeight: "var(--v2-lh-body)" } as CSSProperties}
                                        >
                                          Casey Doe
                                        </span>
                                        <span
                                          className="font-v2-sans"
                                          style={{ fontSize: "var(--v2-text-b4)", color: "var(--v2-color-text-subtle)", lineHeight: "var(--v2-lh-body)" } as CSSProperties}
                                        >
                                          Maintainer
                                        </span>
                                      </div>
                                      <span
                                        className="inline-flex items-center font-v2-sans group-focus-within:gap-[9px] group-hover:gap-[9px]"
                                        style={{ gap: "5px", fontSize: "var(--v2-text-b4)", fontWeight: "var(--v2-weight-semibold)", color: "var(--v2-color-text)", textDecoration: "underline", textUnderlineOffset: "4px", transition: "gap var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                      >
                                        See the agent
                                        <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          aria-hidden="true"
                                          className="group-focus-within:translate-x-[2px] group-hover:translate-x-[2px]"
                                          style={{ transition: "transform var(--v2-dur-fast) var(--v2-ease)" } as CSSProperties}
                                        >
                                          <path
                                            d="M4.5 2.5L8 6l-3.5 3.5"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                    <div
                                      aria-hidden="true"
                                      style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", height: "28px", maxWidth: "44%", filter: "brightness(0)", opacity: "0.92", flexShrink: "0" } as CSSProperties}
                                    >
                                      <img
                                        src="/gitcrew/images/logos/testimonitals-default/excalidraw-logo.svg"
                                        alt="Sketch Co"
                                        className=""
                                        style={{ height: "17px", width: "auto", display: "block" } as CSSProperties}
                                      />
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{ display: "flex", marginTop: "28px", paddingLeft: "calc(var(--v2-grid-padding) + var(--v2-half-col))", paddingRight: "var(--v2-grid-padding)", gap: "10px" } as CSSProperties}
                            className="jsx-164446a02e993597 customer-stories-controls"
                          >
                            <button
                              type="button"
                              disabled
                              aria-label="Previous customer story"
                              style={{ width: "44px", height: "44px", borderRadius: "0", border: "var(--v2-border-width) solid var(--v2-color-border)", background: "var(--v2-color-bg)", color: "var(--v2-color-text)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "not-allowed", opacity: "0.35", transition: "none" } as CSSProperties}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 12 12"
                                fill="none"
                                aria-hidden="true"
                                style={{ transform: "rotate(180deg)" } as CSSProperties}
                              >
                                <path
                                  d="M4.5 2.5L8 6l-3.5 3.5"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              aria-label="Next customer story"
                              style={{ width: "44px", height: "44px", borderRadius: "0", border: "var(--v2-border-width) solid var(--v2-color-border)", background: "var(--v2-color-bg)", color: "var(--v2-color-text)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: "1", transition: "none" } as CSSProperties}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 12 12"
                                fill="none"
                                aria-hidden="true"
                                style={{ transform: "none" } as CSSProperties}
                              >
                                <path
                                  d="M4.5 2.5L8 6l-3.5 3.5"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="relative w-full overflow-hidden bg-v2-bg"
                      style={{ height: "var(--v2-sectionbreak-py)" } as CSSProperties}
                    >
                      <div
                        className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                        style={{ height: "var(--v2-border-width)", top: "0" } as CSSProperties}
                      />
                      <div
                        className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                        style={{ height: "var(--v2-border-width)", top: "40px" } as CSSProperties}
                      />
                      <div
                        className="relative mx-auto h-full"
                        style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 flex items-center"
                          style={{ top: "40px", paddingLeft: "var(--v2-grid-padding)" } as CSSProperties}
                        >
                          <div
                            className="mr-5 shrink-0 bg-v2-accent-green"
                            style={{ width: "1.7px", height: "13.5px" } as CSSProperties}
                          />
                          <span
                            className="font-v2-mono uppercase"
                            style={{ fontSize: "var(--v2-text-b4)", lineHeight: "var(--v2-lh-heading)", color: "var(--v2-color-text)", opacity: "0.64", fontWeight: "var(--v2-weight-medium)", letterSpacing: "0.02em" } as CSSProperties}
                          >
                            Open source
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full overflow-hidden bg-v2-bg">
                      <div
                        className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                        style={{ height: "var(--v2-border-width)", top: "0" } as CSSProperties}
                      />
                      <div
                        className="relative mx-auto "
                        style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                      >
                        <div
                          style={{ position: "relative", padding: "0 var(--v2-grid-padding)", "--v2-community-bg": "none" } as CSSProperties}
                        >
                          <div
                            aria-hidden="true"
                            style={{ position: "absolute", top: "0", bottom: "0", left: "var(--v2-content-padding)", right: "var(--v2-content-padding)", backgroundImage: "var(--v2-community-bg)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", opacity: "0.8", pointerEvents: "none", zIndex: "0" } as CSSProperties}
                          />
                          <div
                            className="text-center"
                            style={{ position: "relative", zIndex: "1", paddingTop: "calc(var(--v2-content-padding-y) * 0.5)", paddingBottom: "var(--v2-space-7)", display: "flex", flexDirection: "column", alignItems: "center" } as CSSProperties}
                          >
                            <div
                              style={{ alignSelf: "stretch", marginLeft: "calc(var(--v2-content-padding) - var(--v2-grid-padding))", marginRight: "calc(var(--v2-content-padding) - var(--v2-grid-padding))", overflowX: "clip", display: "flex", justifyContent: "center" } as CSSProperties}
                            >
                              <div
                                className="v2-communities-frame-band"
                                style={{ display: "inline-block" } as CSSProperties}
                              >
                                <div
                                  className="relative "
                                  style={{ display: "inline-block", border: "1px solid var(--v2-color-frame)", padding: "28px 36px" } as CSSProperties}
                                >
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", inset: "0", pointerEvents: "none", background: "var(--v2-color-surface-canvas)", zIndex: "0" } as CSSProperties}
                                  />
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", top: "-1px", left: "-100vw", right: "100%", borderTop: "1px dashed var(--v2-color-frame)", pointerEvents: "none" } as CSSProperties}
                                  />
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", top: "-1px", left: "100%", right: "-100vw", borderTop: "1px dashed var(--v2-color-frame)", pointerEvents: "none" } as CSSProperties}
                                  />
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", bottom: "-1px", left: "-100vw", right: "100%", borderTop: "1px dashed var(--v2-color-frame)", pointerEvents: "none" } as CSSProperties}
                                  />
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", bottom: "-1px", left: "100%", right: "-100vw", borderTop: "1px dashed var(--v2-color-frame)", pointerEvents: "none" } as CSSProperties}
                                  />
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", left: "-1px", top: "-100vw", bottom: "100%", borderLeft: "1px dashed var(--v2-color-frame)", pointerEvents: "none" } as CSSProperties}
                                  />
                                  <div
                                    aria-hidden="true"
                                    style={{ position: "absolute", right: "-1px", top: "-100vw", bottom: "100%", borderLeft: "1px dashed var(--v2-color-frame)", pointerEvents: "none" } as CSSProperties}
                                  />
                                  <span
                                    aria-hidden="true"
                                    style={{ position: "absolute", width: "8px", height: "8px", background: "var(--v2-color-bg)", border: "1px solid var(--v2-color-frame)", pointerEvents: "none", zIndex: "1", top: "-4px", left: "-4px" } as CSSProperties}
                                  />
                                  <span
                                    aria-hidden="true"
                                    style={{ position: "absolute", width: "8px", height: "8px", background: "var(--v2-color-bg)", border: "1px solid var(--v2-color-frame)", pointerEvents: "none", zIndex: "1", top: "-4px", right: "-4px" } as CSSProperties}
                                  />
                                  <span
                                    aria-hidden="true"
                                    style={{ position: "absolute", width: "8px", height: "8px", background: "var(--v2-color-bg)", border: "1px solid var(--v2-color-frame)", pointerEvents: "none", zIndex: "1", bottom: "-4px", left: "-4px" } as CSSProperties}
                                  />
                                  <span
                                    aria-hidden="true"
                                    style={{ position: "absolute", width: "8px", height: "8px", background: "var(--v2-color-bg)", border: "1px solid var(--v2-color-frame)", pointerEvents: "none", zIndex: "1", bottom: "-4px", right: "-4px" } as CSSProperties}
                                  />
                                  <div
                                    style={{ position: "relative", zIndex: "1", display: "flex", flexDirection: "column", flex: "1 1 auto", height: "100%" } as CSSProperties}
                                  >
                                    <h2
                                      className="font-v2-sans text-v2-h2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", letterSpacing: "-0.02em", margin: "0" } as CSSProperties}
                                    >
                                      Different agents 
                                      <span
                                        style={{ position: "relative", display: "inline-block", padding: "0.06em 0.18em", margin: "0 0.02em", color: "var(--v2-color-void)", whiteSpace: "nowrap" } as CSSProperties}
                                      >
                                        <span
                                          aria-hidden="true"
                                          style={{ position: "absolute", inset: "0", background: "var(--v2-color-volt)", zIndex: "0" } as CSSProperties}
                                        />
                                        <span style={{ position: "relative", zIndex: "1" } as CSSProperties}>
                                          run
                                        </span>
                                      </span>
                                       on your pull requests.
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: "0 var(--v2-content-padding) 96px" } as CSSProperties}>
                          <div
                            style={{ height: "var(--v2-border-width)", background: "var(--v2-color-border-subtle)" } as CSSProperties}
                          />
                          <div className="group flex w-full overflow-hidden [--gap:0px] [--duration:80s]">
                            <div
                              className="flex shrink-0 animate-marquee gap-[--gap] group-hover:[animation-play-state:paused]"
                            >
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="John Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      John Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @johndoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by John Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  AntiSlop scans the changed files and posts a slop score on the pull request.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Jane Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Jane Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @janedoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Jane Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Hermes is its own agent. Same GitHub App, its own review and check run.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Alex Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Alex Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @alexdoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Alex Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  OpenClaw plugs into the same contract and posts its review beside the others.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Sam Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Sam Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @samdoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Sam Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Grokbot runs on the pull request and reports back as a check run.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Casey Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Casey Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @caseydoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Casey Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  OpenAI Dots is another agent in the lineup. Turn it on per repository.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Riley Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Riley Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @rileydoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Riley Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Ponytail only pushes a minimal diff, and never on a fork pull request.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Jordan Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Jordan Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @jordandoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Jordan Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Install the GitHub App, pick the agents, and they run in your repository.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Taylor Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Taylor Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @taylordoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Taylor Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Agents never get a GitHub token. GitCrew posts the review for them.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Morgan Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Morgan Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @morgandoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Morgan Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Built-in agents and your own HTTP agents share one result contract.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Avery Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Avery Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @averydoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Avery Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  It is open source. The dashboard, the runner, and the contract are in the repo.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="John Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      John Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @johndoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by John Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  AntiSlop scans the changed files and posts a slop score on the pull request.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Jane Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Jane Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @janedoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Jane Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Hermes is its own agent. Same GitHub App, its own review and check run.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Alex Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Alex Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @alexdoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Alex Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  OpenClaw plugs into the same contract and posts its review beside the others.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Sam Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Sam Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @samdoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Sam Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Grokbot runs on the pull request and reports back as a check run.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Casey Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Casey Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @caseydoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Casey Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  OpenAI Dots is another agent in the lineup. Turn it on per repository.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Riley Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Riley Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @rileydoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Riley Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Ponytail only pushes a minimal diff, and never on a fork pull request.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Jordan Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Jordan Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @jordandoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Jordan Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Install the GitHub App, pick the agents, and they run in your repository.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Taylor Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Taylor Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @taylordoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Taylor Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Agents never get a GitHub token. GitCrew posts the review for them.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Morgan Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Morgan Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @morgandoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Morgan Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Built-in agents and your own HTTP agents share one result contract.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Avery Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Avery Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @averydoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Avery Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  It is open source. The dashboard, the runner, and the contract are in the repo.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{ height: "var(--v2-border-width)", background: "var(--v2-color-border-subtle)" } as CSSProperties}
                          />
                          <div className="group flex w-full overflow-hidden [--gap:0px] [--duration:95s]">
                            <div
                              className="flex shrink-0 animate-marquee gap-[--gap] group-hover:[animation-play-state:paused]"
                              style={{ animationDirection: "reverse" } as CSSProperties}
                            >
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Quinn Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Quinn Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @quinndoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Quinn Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  AntiSlop scans the changed files and posts a slop score on the pull request.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Parker Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Parker Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @parkerdoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Parker Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Hermes is its own agent. Same GitHub App, its own review and check run.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Reese Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Reese Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @reesedoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Reese Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  OpenClaw plugs into the same contract and posts its review beside the others.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Drew Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Drew Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @drewdoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Drew Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Grokbot runs on the pull request and reports back as a check run.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Logan Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Logan Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @logandoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Logan Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  OpenAI Dots is another agent in the lineup. Turn it on per repository.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Quinn Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Quinn Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @quinndoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Quinn Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Ponytail only pushes a minimal diff, and never on a fork pull request.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Jamie Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Jamie Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @jamiedoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Jamie Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Install the GitHub App, pick the agents, and they run in your repository.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Skyler Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Skyler Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @skylerdoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Skyler Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Agents never get a GitHub token. GitCrew posts the review for them.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Cameron Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Cameron Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @camerondoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Cameron Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Built-in agents and your own HTTP agents share one result contract.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Quinn Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Quinn Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @quinndoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Quinn Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  AntiSlop scans the changed files and posts a slop score on the pull request.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Parker Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Parker Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @parkerdoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Parker Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Hermes is its own agent. Same GitHub App, its own review and check run.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Reese Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Reese Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @reesedoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Reese Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  OpenClaw plugs into the same contract and posts its review beside the others.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Drew Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Drew Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @drewdoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Drew Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Grokbot runs on the pull request and reports back as a check run.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Logan Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Logan Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @logandoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Logan Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  OpenAI Dots is another agent in the lineup. Turn it on per repository.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Quinn Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Quinn Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @quinndoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Quinn Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Ponytail only pushes a minimal diff, and never on a fork pull request.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Jamie Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Jamie Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @jamiedoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Jamie Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Install the GitHub App, pick the agents, and they run in your repository.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Skyler Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Skyler Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @skylerdoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Skyler Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Agents never get a GitHub token. GitCrew posts the review for them.
                                </p>
                              </div>
                              <div
                                className="relative shrink-0"
                                style={{ width: "380px", borderRight: "var(--v2-border-width) solid var(--v2-color-border-subtle)", backgroundColor: "var(--v2-color-surface-canvas)", padding: "24px 28px" } as CSSProperties}
                              >
                                <div className="flex items-center" style={{ gap: "12px", minHeight: "36px" } as CSSProperties}>
                                  <img
                                    src="/logo/hermes-agent-icon.png"
                                    alt="Cameron Doe"
                                    width="36"
                                    height="36"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    className="shrink-0 rounded-full grayscale"
                                    style={{ width: "36px", height: "36px", objectFit: "cover" } as CSSProperties}
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="font-v2-sans text-v2-b2 text-v2-text"
                                      style={{ fontWeight: "var(--v2-weight-medium)", lineHeight: "1.2" } as CSSProperties}
                                    >
                                      Cameron Doe
                                    </span>
                                    <span
                                      className="font-v2-sans text-v2-b3"
                                      style={{ color: "var(--v2-color-text-tertiary)" } as CSSProperties}
                                    >
                                      @camerondoe
                                    </span>
                                  </div>
                                  <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto self-start transition-opacity hover:opacity-70"
                                    style={{ color: "var(--v2-color-text-accent)" } as CSSProperties}
                                    aria-label="View post by Cameron Doe"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                      <path
                                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p
                                  className="font-v2-sans text-v2-b2"
                                  style={{ color: "var(--v2-color-text-primary)", marginTop: "14px" } as CSSProperties}
                                >
                                  Built-in agents and your own HTTP agents share one result contract.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{ height: "var(--v2-border-width)", background: "var(--v2-color-border-subtle)" } as CSSProperties}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="relative w-full overflow-hidden bg-v2-bg"
                      style={{ height: "var(--v2-sectionbreak-py)" } as CSSProperties}
                    >
                      <div
                        className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                        style={{ height: "var(--v2-border-width)", top: "40px" } as CSSProperties}
                      />
                      <div
                        className="relative mx-auto h-full"
                        style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                      />
                    </div>
                    <section className="relative w-full overflow-hidden bg-v2-bg">
                      <div
                        className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                        style={{ height: "var(--v2-border-width)", top: "0" } as CSSProperties}
                      />
                      <div className="relative h-[40px] w-full" />
                      <div
                        className="w-full bg-v2-border "
                        style={{ height: "var(--v2-border-width)" } as CSSProperties}
                      />
                      <div
                        className="relative mx-auto "
                        style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                      >
                        <div style={{ padding: "0 var(--v2-content-padding)" } as CSSProperties}>
                          <div
                            style={{ position: "relative", width: "100%", minHeight: "clamp(340px, 46vh, 480px)", overflow: "hidden", background: "var(--v2-cta-bg)", backgroundImage: "var(--v2-cta-bg-image)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", userSelect: "none" } as CSSProperties}
                            className="jsx-4d46f7683c8d7a44"
                          >
                            <div
                              style={{ position: "absolute", inset: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" } as CSSProperties}
                              className="jsx-4d46f7683c8d7a44"
                            >
                              <h2
                                style={{ margin: "0", fontFamily: "var(--v2-font-sans)", fontWeight: "var(--v2-weight-medium)", fontSize: "clamp(1.75rem, 4.2vw, 2.875rem)", lineHeight: "1.05", letterSpacing: "-0.025em", maxWidth: "720px", textWrap: "balance", textAlign: "center" } as CSSProperties}
                              >
                                <span style={{ color: "var(--v2-cta-text)" } as CSSProperties}>
                                  GitCrew is open source, and it runs on your next pull request.
                                </span>
                              </h2>
                              <div
                                style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "calc(var(--v2-gutter) * 0.75)", "--v2-color-bg": "var(--v2-cta-button-bg)", "--v2-color-text": "var(--v2-cta-button-text)", "--v2-color-text-muted": "var(--v2-cta-button-muted)", "--v2-color-border": "var(--v2-cta-button-border)" } as CSSProperties}
                              >
                                <a className="v2-btn v2-btn--md v2-btn--primary" href="/dashboard">
                                  Get started
                                </a>
                                <a
                                  className="v2-btn v2-btn--md v2-btn--ghost"
                                  style={{ color: "var(--v2-cta-text)" } as CSSProperties}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href="https://github.com/MrSpideyNihal/Pr-agent"
                                >
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="" aria-hidden="true">
                                    <path
                                      d="M4.5 2.5L8 6l-3.5 3.5"
                                      stroke="currentColor"
                                      strokeWidth="1.2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  View the source
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="w-full bg-v2-border "
                        style={{ height: "var(--v2-border-width)" } as CSSProperties}
                      />
                      <div className="relative h-[40px] w-full" />
                    </section>
                  </div>
                </div>
              </div>
            </main>
            <footer className="relative w-full bg-v2-bg">
              <div
                className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                style={{ height: "var(--v2-border-width)", top: "0" } as CSSProperties}
              />
              <div
                className="pointer-events-none absolute left-0 right-0 z-20 bg-v2-border "
                style={{ height: "var(--v2-border-width)", bottom: "0" } as CSSProperties}
              />
              <div className="relative w-full">
                <div
                  className="relative mx-auto "
                  style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                >
                  <div
                    className="v2-footer-cols relative grid gap-12 md:items-start md:gap-x-[var(--v2-gutter)] md:gap-y-0"
                    style={{ padding: "calc(var(--v2-gutter) * 2) var(--v2-grid-padding)" } as CSSProperties}
                  >
                    <div className="v2-footer-logo shrink-0">
                      <a aria-label="GitCrew home" className="inline-flex items-center font-v2-sans text-[15px] font-medium tracking-tight" href="/" style={{ color: "var(--v2-nav-text)", letterSpacing: "-0.04em" } as CSSProperties}>
                        GitCrew
                      </a>
                    </div>
                    <div
                      className="v2-footer-link-col v2-footer-link-col-1 flex flex-col"
                      style={{ gap: "18px" } as CSSProperties}
                    >
                      <span
                        className="font-v2-mono text-v2-b4 font-medium uppercase tracking-wider"
                        style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                      >
                        AGENTS
                      </span>
                      <ul className="flex flex-col" style={{ gap: "12px" } as CSSProperties}>
                        <li>
                          <a
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="/#antislop"
                          >
                            AntiSlop
                          </a>
                        </li>
                        <li>
                          <a
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="/#antislop"
                          >
                            Slop score
                          </a>
                        </li>
                        <li>
                          <a
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="/#hermes"
                          >
                            Hermes
                          </a>
                        </li>
                        <li>
                          <a
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="/#ponytail"
                          >
                            Ponytail
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            Grokbot
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            OpenClaw
                          </a>
                        </li>
                        <li>
                          <a
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="/pricing"
                          >
                            Pricing
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            Open source
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="v2-footer-link-col v2-footer-link-col-2 flex flex-col"
                      style={{ gap: "18px" } as CSSProperties}
                    >
                      <span
                        className="font-v2-mono text-v2-b4 font-medium uppercase tracking-wider"
                        style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                      >
                        ON A PR
                      </span>
                      <ul className="flex flex-col" style={{ gap: "12px" } as CSSProperties}>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            OpenAI Dots
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            Pipelines
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            Check runs
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            Inline reviews
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            Merge gates
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            GitHub App
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            Your runners
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            Fork safety
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            Bring your own
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            The repo
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="v2-footer-link-col v2-footer-link-col-3 flex flex-col"
                      style={{ gap: "18px" } as CSSProperties}
                    >
                      <span
                        className="font-v2-mono text-v2-b4 font-medium uppercase tracking-wider"
                        style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                      >
                        DEVELOPERS
                      </span>
                      <ul className="flex flex-col" style={{ gap: "12px" } as CSSProperties}>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="/developers#why"
                          >
                            Why we built
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="/developers#how"
                          >
                            How we're working
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="/docs"
                          >
                            Docs
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            Status
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            {"Feedback & Requests"}
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            Open source
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            Contributing
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="v2-footer-link-col v2-footer-link-col-4 flex flex-col"
                      style={{ gap: "18px" } as CSSProperties}
                    >
                      <span
                        className="font-v2-mono text-v2-b4 font-medium uppercase tracking-wider"
                        style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                      >
                        RESOURCES
                      </span>
                      <ul className="flex flex-col" style={{ gap: "12px" } as CSSProperties}>
                        <li>
                          <a
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="/blog"
                          >
                            Blog
                          </a>
                        </li>
                        <li>
                          <a
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="/docs"
                          >
                            Docs
                          </a>
                        </li>
                        <li>
                          <a
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="/community"
                          >
                            Contribute
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="v2-footer-link-col v2-footer-link-col-5 flex flex-col"
                      style={{ gap: "18px" } as CSSProperties}
                    >
                      <span
                        className="font-v2-mono text-v2-b4 font-medium uppercase tracking-wider"
                        style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                      >
                        LEGAL
                      </span>
                      <ul className="flex flex-col" style={{ gap: "12px" } as CSSProperties}>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            The repo
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="v2-footer-link-col v2-footer-link-col-6 flex flex-col"
                      style={{ gap: "18px" } as CSSProperties}
                    >
                      <span
                        className="font-v2-mono text-v2-b4 font-medium uppercase tracking-wider"
                        style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                      >
                        CONTACT
                      </span>
                      <ul className="flex flex-col" style={{ gap: "12px" } as CSSProperties}>
                        <li>
                          <a
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="/community"
                          >
                            Community
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                            style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                            href="https://github.com/MrSpideyNihal/Pr-agent"
                          >
                            GitHub
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="w-full bg-v2-border "
                style={{ height: "var(--v2-border-width)" } as CSSProperties}
              />
              <div className="relative w-full">
                <div
                  className="relative mx-auto "
                  style={{ maxWidth: "var(--v2-max-width)" } as CSSProperties}
                >
                  <div
                    className="v2-footer-bottom relative flex flex-wrap items-center justify-between gap-y-2"
                    style={{ padding: "0 var(--v2-grid-padding)", minHeight: "40px" } as CSSProperties}
                  >
                    <span
                      className="font-v2-mono text-v2-b4 font-medium uppercase tracking-wider"
                      style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                    >
                      © 
                      2026
                       GITCREW
                    </span>
                    <a
                      className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 text-[color:var(--v2-nav-text)] transition-colors hover:text-[color:var(--v2-color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--v2-color-focus)] print:hidden"
                      href="https://github.com/MrSpideyNihal/Pr-agent"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source
                    </a>
                    <div
                      className="v2-footer-bottom-links flex flex-wrap items-center"
                      style={{ gap: "calc(var(--v2-gutter) * 2.5)" } as CSSProperties}
                    >
                      <a
                        className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                        style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                        href="/community"
                      >
                        Contribute
                      </a>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                        style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                        href="https://github.com/MrSpideyNihal/Pr-agent"
                      >
                        Trust Center
                      </a>
                      <a
                        className="v2-footer-link inline-flex items-center font-v2-sans text-v2-b3 transition-colors hover:text-v2-text"
                        style={{ color: "var(--v2-nav-text)" } as CSSProperties}
                        href="/docs"
                      >
                        Docs
                      </a>
                      <button
                        type="button"
                        aria-label="Switch to dark mode"
                        aria-pressed="false"
                        className="flex items-center justify-center transition-opacity hover:opacity-80"
                        style={{ width: "28px", height: "28px", background: "transparent", border: "0", color: "var(--v2-nav-text)", cursor: "pointer" } as CSSProperties}
                      >
                        <svg
                          width="16"
                          height="16"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          color="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
