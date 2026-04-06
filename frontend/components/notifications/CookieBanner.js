'use client';

import Link from 'next/link';
import CloseIcon from '@/components/common/CloseIcon';

const involve = {
  fontFamily: 'var(--font-involve), system-ui, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSynthesis: 'none',
};

/**
 * Баннер уведомления (куки и т.п.) — по структуре как
 * next/frontend Frame5/components/NotificationBanner.tsx и Frame4 уведомление.
 * Позиция: ниже строки header (40px) с отступом 10px — var(--notification-top).
 */
export default function CookieBanner({
  countdown,
  onClose,
  privacyHref,
  children,
}) {
  return (
    <div
      className="absolute left-1/2 z-20 flex -translate-x-1/2 flex-col rounded-[20px] bg-white"
      style={{
        width: 'min(360px, calc(100vw - 40px))',
        top: 'var(--notification-top)',
        padding: 15,
        boxSizing: 'border-box',
        backdropFilter: 'blur(7.5px)',
      }}
      onClick={(e) => e.stopPropagation()}
      role="region"
      aria-label="Уведомление"
    >
      <div className="flex min-h-[20px] flex-shrink-0 items-center justify-between">
        <span
          style={{
            ...involve,
            fontSize: 14,
            lineHeight: '145%',
            color: 'rgba(16, 16, 16, 0.25)',
          }}
        >
          Автоматически закроется через {countdown}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none"
          aria-label="Закрыть"
        >
          <CloseIcon width={16} height={16} />
        </button>
      </div>
      <div
        style={{
          ...involve,
          fontSize: 14,
          lineHeight: '110%',
          color: '#101010',
          marginTop: 8,
        }}
      >
        {children || (
          <>
            Если продолжаете использовать этот портал,
            <br />
            вы выражаете согласие на использование
            <br />
            файлов куки в соответствии с условиями
            <br />
            <Link
              href={privacyHref || '/privacy-policy'}
              style={{
                color: '#0075FF',
                textDecoration: 'underline',
                textDecorationSkipInk: 'none',
                textUnderlineOffset: '3px',
              }}
            >
              политики приватности
            </Link>{' '}
            такого портала
          </>
        )}
      </div>
    </div>
  );
}
