import React, { useState } from 'react';
import AIModal from '../AIModal';
import './App.css';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null); // Store the generated message

  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInsertMessage = (generatedMessage: string) => {
    setMessage(generatedMessage); // Save the message in state
    setIsModalOpen(false); // Close the modal after insertion
  };

  return (
    <div className="App">
      <h1 className="text-2xl font-bold mb-4">LinkedIn AI Reply Demo</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleOpenModal}
      >
        Open AI Reply Modal
      </button>

      {isModalOpen && (
        <AIModal
          onClose={handleCloseModal}
          onInsert={handleInsertMessage} // Use the handler to insert the message
        />
      )}

      {/* Display the inserted message below */}
      {message && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold">Inserted Message:</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default App;
