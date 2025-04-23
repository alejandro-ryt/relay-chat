import { THEMES } from "@/constants/themes";
import { useThemeStore } from "@/store/useThemeStore";
import { CHAT } from "@/constants/chat";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const Settings = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <section className="w-full md:mx-5 p-4">
      <article>
        <section className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <div className="text-sm text-base-content/70 mb-10">
            {CHAT.THEME_SUBTITLE}
            <nav className="dropdown dropdown-left md:dropdown-hover">
              <button tabIndex={0} className="btn m-1">
                <svg
                  width="12px"
                  height="12px"
                  className="inline-block h-2 w-2 fill-current opacity-60"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
              </button>
              <ul className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
                <div className="max-h-48 overflow-y-auto">
                  {THEMES.map((t) => (
                    <li key={t}>
                      <button
                        className={`
                        group w-full flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors cursor-pointer
                        ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                      `}
                        onClick={() => setTheme(t)}
                      >
                        <div
                          className="relative h-8 w-full rounded-md overflow-hidden"
                          data-theme={t}
                        >
                          <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                            <div className="m-[0.2rem] rounded bg-primary"></div>
                            <div className="m-[0.2rem] rounded bg-secondary"></div>
                            <div className="m-[0.2rem] rounded bg-accent"></div>
                            <div className="m-[0.2rem] rounded bg-neutral"></div>
                          </div>
                        </div>
                        <span className="text-[11px] font-medium truncate w-full text-center">
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </span>
                      </button>
                    </li>
                  ))}
                </div>
              </ul>
            </nav>
          </div>
        </section>

        {/* Preview Section */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Preview</h3>
          <aside className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Messages */}
                <section className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <article
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                            max-w-[80%] rounded-xl p-3 shadow-sm
                            ${!message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                          `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                              text-[10px] mt-1.5
                              ${message.isSent ? "text-base-content/70" : "text-primary-content/70"}
                            `}
                        ></p>
                      </div>
                    </article>
                  ))}
                </section>
              </div>
            </div>
          </aside>
        </section>
      </article>
    </section>
  );
};
export default Settings;
