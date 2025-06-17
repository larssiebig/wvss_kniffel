// client/src/components/Modal.jsx

// Modal dialog component that displays a message with an OKAY button.
// Clicking outside the modal or on the OKAY button closes the modal.

export default function Modal({ message, onClose }) {
  if(!message) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-pointer"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-lg max-w-sm w-full p-6 shadow-lg text-center"
      >
        <p className="mb-6 text-gray-800 dark:text-gray-200">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-400 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition"
        >
            OKAY
        </button>
      </div>
    </div>
  )
}