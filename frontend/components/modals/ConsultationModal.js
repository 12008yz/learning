'use client';

import BaseModal from '@/components/modals/BaseModal';

const involve = {
  fontFamily: 'var(--font-involve), system-ui, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSynthesis: 'none',
};

/**
 * Модальное окно консультации (по аналогии с next/frontend/src/components/modals/ConsultationModal.tsx).
 * Контент можно нарастить позже.
 */
export default function ConsultationModal({ isOpen, onClose, onComplete }) {
  const handleClose = () => {
    onClose();
  };

  const handleDone = () => {
    if (typeof onComplete === 'function') {
      onComplete();
    }
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose}>
      <div
        className="mx-4 overflow-y-auto rounded-[20px] bg-white p-6"
        style={{
          width: '360px',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 80px)',
        }}
      >
        <h2 className="mb-4 text-xl text-[#101010]" style={involve}>
          Консультация
        </h2>
        <p className="mb-6 text-[14px] leading-[110%] text-[rgba(16,16,16,0.65)]" style={involve}>
          Оставьте заявку в форме на главной странице или закройте это окно.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-[10px] border border-[rgba(16,16,16,0.2)] px-4 py-2 text-[#101010] transition-opacity hover:opacity-90"
            style={involve}
          >
            Закрыть
          </button>
          <button
            type="button"
            onClick={handleDone}
            className="rounded-[10px] bg-[#101010] px-4 py-2 text-white transition-opacity hover:opacity-90"
            style={involve}
          >
            Понятно
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
