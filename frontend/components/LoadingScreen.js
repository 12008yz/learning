'use client';

const LOGO_PATH =
  'M0 13.7458V0.193602H8.17692L15.7144 9.48653L23.2519 0.193602H31.7388V13.7458H25.6158V5.78872L19.1634 13.7458H12.2654L6.123 6.17593V13.7458H0ZM33.2845 13.7458V0.193602H39.4075V4.64646H52.9324V0.193602H59.0554V13.7458H52.9324V9.29293H39.4075V13.7458H33.2845ZM67.012 0H81.1569C84.8965 0 87.9387 3.23317 87.9387 6.9697C87.9387 10.7062 84.8965 13.9394 81.1569 13.9394H67.012C63.2723 13.9394 60.2302 10.7062 60.2302 6.9697C60.2302 3.23317 63.2723 0 67.012 0ZM79.8974 5.03367H68.2714C67.2057 5.03367 66.3338 5.90488 66.3338 6.9697C66.3338 8.03451 67.2057 8.90572 68.2714 8.90572H79.8974C80.9631 8.90572 81.835 8.03451 81.835 6.9697C81.835 5.90488 80.9631 5.03367 79.8974 5.03367ZM99.6049 4.4335V0.193602H105.728V4.4335L111.153 0.193602H119.33L110.669 6.9697L119.33 13.7458H111.153L105.728 9.50589V13.7458H99.6049V9.50589L94.1795 13.7458H86.0026L94.6639 6.9697L86.0026 0.193602H94.1795L99.6049 4.4335ZM146.269 0.193602V13.7458H140.146V6.00168L126.621 13.7458H120.498V0.193602H126.621V7.93771L140.146 0.193602H146.269ZM157.627 13.7458V4.84007H147.822V0.193602H173.593V4.84007H163.75V13.7458H157.627ZM175.146 13.7458V0.193602H200.336V3.67845H181.269V5.22727H200.336V8.71212H181.269V10.2609H200.336V13.7458H175.146ZM215.543 4.45286L208.006 13.7458H201.108L212.094 0.193602H218.992L229.979 13.7458H223.081L215.543 4.45286Z';

/**
 * Экран как в next/LoadingScreen.tsx: белый фон, логотип по вертикали ~375px, прогресс внизу.
 */
export default function LoadingScreen({ progress = 0 }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-white"
      style={{
        paddingTop: 'var(--sat, 0px)',
        paddingBottom: 'var(--sab, 0px)',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          minHeight: '100dvh',
          paddingBottom: 'var(--sab, 0px)',
          background: '#FFFFFF',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '0%',
            right: '0.06%',
            top: '0%',
            bottom: '0%',
            background: '#FFFFFF',
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: '230px',
            height: '14px',
            left: 'calc(50% - 230px / 2 + 2px)',
            top: '375px',
          }}
          role="img"
          aria-label="МНОЖИТЕЛЬ"
        >
          <svg width="230" height="14" viewBox="0 0 230 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={LOGO_PATH} fill="#101010" />
          </svg>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          top: '90%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '280px',
          maxWidth: 'calc(100% - 80px)',
          height: '4px',
          background: '#E5E5E5',
          borderRadius: '2px',
          zIndex: 10000,
        }}
      >
        <div
          style={{
            width: `${Math.min(100, Math.max(0, progress))}%`,
            height: '100%',
            background: '#000000',
            transition: 'width 0.2s ease-out',
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  );
}
