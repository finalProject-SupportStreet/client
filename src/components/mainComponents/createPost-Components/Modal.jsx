export const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        {children}
        <button onClick={onClose} className="border px-4 py-2 mt-4">
          Schließen
        </button>
      </div>
    </div>
  );
};
