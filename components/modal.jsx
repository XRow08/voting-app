import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">FAQs</h2>
        <div className="mb-4">
          <h3 className="font-semibold">O que é Duel Stakes?</h3>
          <p>Duel Stakes é o novo estilo de apostas, onde os melhores jogadores ganham. A experiência recompensa os melhores jogadores. Quanto mais você aposta, mais você ganha. Em vez de ser BANIDO de outras plataformas de apostas, aqui você recebe MAIS recompensas.</p>
        </div>
        {/* Adicione mais perguntas e respostas aqui */}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;