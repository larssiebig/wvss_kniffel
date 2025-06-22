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
        className="bg-white p-6 rounded-lg p-6 max-w-sm w-full text-center shadow-lg"
      >
        <p className="mb-4 text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
            OKAY
        </button>
      </div>
    </div>
  )
}