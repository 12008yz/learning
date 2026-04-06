'use client';

import ClickOutsideHint, { HINT_TOP } from '@/components/common/ClickOutsideHint';

export default function BaseModal({
  isOpen,
  onClose,
  children,
  backdropBlur = true,
  className = '',
  hideHint = false,
}) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto overflow-x-hidden"
      style={{
        background: backdropBlur ? '#F5F5F5' : 'rgba(0, 0, 0, 0.5)',
        backdropFilter: backdropBlur ? 'blur(12.5px)' : 'none',
        paddingTop: 'var(--sat, 0px)',
        paddingBottom: 'calc(20px + var(--sab, 0px))',
        boxSizing: 'border-box',
      }}
      onClick={handleBackdropClick}
    >
      {!hideHint && (
        <ClickOutsideHint
          wrapperStyle={{
            left: '20px',
            right: '20px',
            display: 'flex',
            justifyContent: 'center',
            top: HINT_TOP,
          }}
        />
      )}

      <div onClick={(e) => e.stopPropagation()} className={className}>
        {children}
      </div>
    </div>
  );
}
