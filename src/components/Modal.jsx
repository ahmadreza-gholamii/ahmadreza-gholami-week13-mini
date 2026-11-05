import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        aria-label={title}
        aria-modal="true"
        className="modal-card w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl sm:p-9"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Close dialog"
          className="modal-close"
          onClick={onClose}
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="m7 7 10 10M17 7 7 17" />
          </svg>
        </button>
        {children}
      </section>
    </div>
  );
}
