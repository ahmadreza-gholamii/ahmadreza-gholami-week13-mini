import { useEffect, useState } from "react";
import { tabs } from "../../data/tabs";
import Modal from "./Modal";

function Tabs() {
  const [allTabs, setAllTabs] = useState(() => {
    const savedTabs = localStorage.getItem("tabs");
    return savedTabs ? JSON.parse(savedTabs) : tabs;
  });
  const [active, setActive] = useState(localStorage.getItem("tab") || 1);
  const [form, setForm] = useState({
    title: "",
    content: "",
    description: "",
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [deleteTabId, setDeleteTabId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(allTabs));
  }, [allTabs]);

  const tabHandler = (tab) => {
    setActive(tab.id);
    localStorage.setItem("tab", tab.id);
  };

  const formInputHandler = (event) => {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const addTabHandler = (event) => {
    event.preventDefault();
    const newTab = { ...form, id: Date.now() };
    setAllTabs((previousTabs) => [...previousTabs, newTab]);
    setActive(newTab.id);
    localStorage.setItem("tab", newTab.id);
    setForm({ title: "", content: "", description: "" });
    setIsShowModal(false);
  };

  const selectedTab = allTabs.find((tab) => tab.id === deleteTabId);
  const activeTab = allTabs.find((tab) => Number(active) === tab.id);

  const deleteTabHandler = (id) => {
    setAllTabs((previousTabs) => previousTabs.filter((tab) => tab.id !== id));
    if (Number(active) === id) {
      setActive(4);
      localStorage.setItem("tab", 4);
    }
    setDeleteTabId(null);
  };

  return (
    <main className="min-h-screen px-5 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-3">TAMRIN WEEK 13-MINI</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              TabS Exercise
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-(--color-muted)">
              Keep your Tabs organize, add or delete them.
            </p>
          </div>
          <button
            className="primary-button inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-3 font-medium"
            onClick={() => setIsShowModal(true)}
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New tab
          </button>
        </header>

        <section
          aria-label="Your tabs"
          className="workspace overflow-hidden rounded-4xl p-5 sm:p-9"
        >
          <div
            aria-label="Tab navigation"
            className="tab-list flex gap-2  border-b border-black/5"
            role="tablist"
          >
            {allTabs.map((tab) => (
              <div
                className="tab-item group relative flex shrink-0 items-center"
                key={tab.id}
              >
                <button
                  aria-controls={`panel-${tab.id}`}
                  aria-selected={Number(active) === tab.id}
                  className={`tab-button px-4 py-3 text-sm font-medium ${Number(active) === tab.id ? "is-active" : ""}`}
                  id={`tab-${tab.id}`}
                  onClick={() => tabHandler(tab)}
                  role="tab"
                  type="button"
                >
                  {tab.title}
                </button>
                {tab.id > 5 && (
                  <button
                    aria-label={`Delete ${tab.title}`}
                    className="tab-delete"
                    onClick={() => setDeleteTabId(tab.id)}
                    type="button"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                      <path d="M7 7h10m-9 0 .7 12h6.6L16 7m-6-3h4l1 3H9l1-3Zm1 7v5m3-5v5" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            {allTabs.length === 0 && (
              <p className="py-4 text-sm text-(--color-muted)">
                No tabs yet. Create one to get started.
              </p>
            )}
          </div>

          {activeTab && (
            <article
              aria-labelledby={`tab-${activeTab.id}`}
              className="content-enter min-h-64 py-10 sm:py-14"
              id={`panel-${activeTab.id}`}
              key={activeTab.id}
              role="tabpanel"
              tabIndex={0}
            >
              <h2 className="max-w-2xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                {activeTab.content}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-(--color-muted)">
                {activeTab.description}
              </p>
              <div className="mt-10 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-(--color-muted)">
                <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent]" />
                {activeTab.title}
              </div>
            </article>
          )}
        </section>
        <p className="mt-6 text-center text-xs text-(--color-muted)">
          Your tabs are saved on this device.
        </p>
      </div>

      {isShowModal && (
        <Modal onClose={() => setIsShowModal(false)} title="Create a new tab">
          <p className="eyebrow mb-3">MAKE IT YOURS</p>
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">
            Create a tab
          </h2>
          <p className="mb-7 text-sm leading-6 text-(--color-muted)">
            Create your custom tab.
          </p>
          <form className="space-y-4" onSubmit={addTabHandler}>
            <label className="form-field">
              <span>Tab name</span>
              <input
                autoFocus
                maxLength={32}
                name="title"
                onChange={formInputHandler}
                placeholder="Tab Title"
                required
                value={form.title}
              />
            </label>
            <label className="form-field">
              <span>Content</span>
              <input
                maxLength={100}
                name="content"
                onChange={formInputHandler}
                placeholder="What is this tab about?"
                required
                value={form.content}
              />
            </label>
            <label className="form-field">
              <span>Description</span>
              <textarea
                maxLength={240}
                name="description"
                onChange={formInputHandler}
                placeholder="Add a little more detail..."
                required
                rows={3}
                value={form.description}
              />
            </label>
            <button
              className="primary-button mt-2 w-full rounded-full px-5 py-3 font-medium"
              type="submit"
            >
              Create tab
            </button>
          </form>
        </Modal>
      )}

      {selectedTab && (
        <Modal onClose={() => setDeleteTabId(null)} title="Delete tab">
          <p className="eyebrow mb-3">Double CHECK</p>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            Delete this tab?
          </h2>
          <p className="mb-8 text-sm leading-6 text-(--color-muted)">
            “{selectedTab.title}” and its content will be removed from this
            device.
          </p>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              className="secondary-button rounded-full px-5 py-3 font-medium"
              onClick={() => setDeleteTabId(null)}
              type="button"
            >
              Keep tab
            </button>
            <button
              className="danger-button rounded-full px-5 py-3 font-medium"
              onClick={() => deleteTabHandler(selectedTab.id)}
              type="button"
            >
              Delete tab
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}

export default Tabs;
