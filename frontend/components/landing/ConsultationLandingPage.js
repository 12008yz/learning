'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ConsultationModal from '@/components/modals/ConsultationModal';
import CloseIcon from '@/components/common/CloseIcon';

const involve = {
  fontFamily: 'var(--font-involve), system-ui, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSynthesis: 'none',
};

const PRIVACY_HREF = '/privacy-policy';
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3040';

/** 4 круга 2×2: в каждой ячейке 10×10 отступы 15.62% → r = (10 − 2×0.1562×10) / 2 ≈ 3.438 */
function CirclesFourIcon() {
  const r = 3.438;
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="5" cy="5" r={r} fill="#000000" />
      <circle cx="15" cy="5" r={r} fill="#000000" />
      <circle cx="5" cy="15" r={r} fill="#000000" />
      <circle cx="15" cy="15" r={r} fill="#000000" />
    </svg>
  );
}

function HeaderLogoSvg() {
  return (
    <svg
      width="140"
      height="10"
      viewBox="0 0 140 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="МНОЖИТЕЛ"
    >
      <g clipPath="url(#clipMnozhHeaderLogo)">
        <path
          d="M0 9.12458V0.875421H4.97725L9.56529 6.53199L14.1533 0.875421H19.3193V9.12458H15.5922V4.28115L11.6647 9.12458H7.46588L3.72704 4.51684V9.12458H0ZM20.2601 9.12458V0.875421H23.9872V3.58586H32.2197V0.875421H35.9467V9.12458H32.2197V6.41414H23.9872V9.12458H20.2601ZM40.7899 0.757576H49.3998C51.6762 0.757576 53.5279 2.72559 53.5279 5C53.5279 7.27441 51.6762 9.24242 49.3998 9.24242H40.7899C38.5136 9.24242 36.6618 7.27441 36.6618 5C36.6618 2.72559 38.5136 0.757576 40.7899 0.757576ZM48.6332 3.82155H41.5565C40.9078 3.82155 40.3771 4.35185 40.3771 5C40.3771 5.64815 40.9078 6.17845 41.5565 6.17845H48.6332C49.2819 6.17845 49.8126 5.64815 49.8126 5C49.8126 4.35185 49.2819 3.82155 48.6332 3.82155ZM60.6291 3.45623V0.875421H64.3561V3.45623L67.6586 0.875421H72.6358L67.3637 5L72.6358 9.12458H67.6586L64.3561 6.54377V9.12458H60.6291V6.54377L57.3266 9.12458H52.3494L57.6215 5L52.3494 0.875421H57.3266L60.6291 3.45623ZM89.0333 0.875421V9.12458H85.3062V4.41077L77.0737 9.12458H73.3467V0.875421H77.0737V5.58923L85.3062 0.875421H89.0333ZM95.9467 9.12458V3.7037H89.9787V0.875421H105.665V3.7037H99.6738V9.12458H95.9467ZM106.611 9.12458V0.875421H121.944V2.99663H110.338V3.93939H121.944V6.06061H110.338V7.00337H121.944V9.12458H106.611ZM131.2 3.46801L126.612 9.12458H122.413L129.101 0.875421H133.3L139.987 9.12458H135.788L131.2 3.46801Z"
          fill="#101010"
        />
      </g>
      <defs>
        <clipPath id="clipMnozhHeaderLogo">
          <rect width="140" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PaperPlaneIcon() {
  return (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M17.2042 15.1825C17.0876 15.3218 16.9418 15.4339 16.7771 15.5107C16.6124 15.5875 16.4328 15.6272 16.2511 15.627C16.1082 15.6269 15.9663 15.6026 15.8316 15.5551L9.58546 13.4457C9.52351 13.4248 9.46969 13.385 9.43157 13.3319C9.39345 13.2788 9.37295 13.215 9.37296 13.1496V7.50199C9.37315 7.41631 9.35571 7.33151 9.32175 7.25285C9.28778 7.17419 9.23801 7.10335 9.17551 7.04474C9.11302 6.98613 9.03914 6.94099 8.95846 6.91213C8.87779 6.88327 8.79204 6.87131 8.70655 6.87699C8.54584 6.89116 8.39641 6.96552 8.28819 7.08519C8.17997 7.20485 8.12095 7.36097 8.12296 7.5223V13.1473C8.12296 13.2127 8.10246 13.2764 8.06434 13.3295C8.02622 13.3827 7.9724 13.4225 7.91046 13.4434L1.66436 15.5528C1.42474 15.637 1.16515 15.6462 0.92016 15.5791C0.675174 15.5121 0.456417 15.3721 0.293018 15.1776C0.129619 14.9832 0.0293321 14.7436 0.00551085 14.4907C-0.0183104 14.2378 0.0354645 13.9837 0.159675 13.7621L7.65733 0.637145C7.76607 0.44384 7.92429 0.282948 8.11574 0.17098C8.3072 0.0590119 8.52499 0 8.74679 0C8.96858 0 9.18637 0.0590119 9.37783 0.17098C9.56928 0.282948 9.7275 0.44384 9.83624 0.637145L17.337 13.7598C17.4641 13.9817 17.5196 14.2375 17.4958 14.4922C17.472 14.7468 17.3702 14.9879 17.2042 15.1825Z"
        fill="#101010"
      />
    </svg>
  );
}

function BadgeCheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M10.7928 5.36106C10.8464 5.41464 10.889 5.47827 10.918 5.5483C10.9471 5.61834 10.962 5.69341 10.962 5.76923C10.962 5.84505 10.9471 5.92012 10.918 5.99016C10.889 6.06019 10.8464 6.12382 10.7928 6.1774L6.75433 10.2159C6.70075 10.2695 6.63712 10.3121 6.56708 10.3411C6.49705 10.3701 6.42197 10.3851 6.34616 10.3851C6.27034 10.3851 6.19527 10.3701 6.12523 10.3411C6.05519 10.3121 5.99156 10.2695 5.93798 10.2159L4.20721 8.4851C4.09896 8.37684 4.03814 8.23002 4.03814 8.07692C4.03814 7.92383 4.09896 7.777 4.20721 7.66875C4.31547 7.56049 4.46229 7.49968 4.61539 7.49968C4.76848 7.49968 4.91531 7.56049 5.02356 7.66875L6.34616 8.99207L9.97644 5.36106C10.03 5.30742 10.0937 5.26486 10.1637 5.23583C10.2337 5.2068 10.3088 5.19185 10.3846 5.19185C10.4604 5.19185 10.5355 5.2068 10.6055 5.23583C10.6756 5.26486 10.7392 5.30742 10.7928 5.36106ZM15 7.5C15 8.98336 14.5601 10.4334 13.736 11.6668C12.9119 12.9001 11.7406 13.8614 10.3701 14.4291C8.99968 14.9968 7.49168 15.1453 6.03682 14.8559C4.58197 14.5665 3.2456 13.8522 2.1967 12.8033C1.14781 11.7544 0.433503 10.418 0.144114 8.96318C-0.145275 7.50832 0.00324965 6.00032 0.570907 4.62987C1.13856 3.25943 2.09986 2.08809 3.33323 1.26398C4.56659 0.439867 6.01664 0 7.5 0C9.48848 0.00209987 11.3949 0.79295 12.801 2.19902C14.2071 3.60509 14.9979 5.51152 15 7.5ZM13.8462 7.5C13.8462 6.24485 13.474 5.01788 12.7766 3.97426C12.0793 2.93065 11.0882 2.11724 9.92857 1.63692C8.76896 1.15659 7.49296 1.03092 6.26193 1.27579C5.0309 1.52065 3.90012 2.12507 3.01259 3.01259C2.12507 3.90012 1.52066 5.03089 1.27579 6.26193C1.03092 7.49296 1.1566 8.76896 1.63692 9.92857C2.11725 11.0882 2.93065 12.0793 3.97427 12.7766C5.01789 13.474 6.24485 13.8462 7.5 13.8462C9.18252 13.8442 10.7956 13.175 11.9853 11.9853C13.175 10.7956 13.8442 9.18252 13.8462 7.5Z"
        fill="#101010"
        fillOpacity={0.75}
      />
    </svg>
  );
}

function ConsentCheckIcon() {
  return (
    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M1 3L3 5L7 1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Лендинг по структуре next/frontend Frame1/index.tsx:
 * контейнер 400px, шапка absolute (20 / 340, --header-top), cookie 360×120, карточка left/right 15, top 230, padding 15, gap 5.
 */
export default function ConsultationLandingPage() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [cookieTimer, setCookieTimer] = useState(7);
  const [phone, setPhone] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  useEffect(() => {
    if (!showCookieBanner || cookieTimer <= 0) return;
    const id = setInterval(() => {
      setCookieTimer((prev) => {
        if (prev <= 1) {
          setShowCookieBanner(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [showCookieBanner, cookieTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if (!privacyAccepted) {
      setSubmitError('Нужно согласие с политикой приватности');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/leads/consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          privacyAccepted: true,
          contactMethod: null,
          source: 'landing',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || 'Не удалось отправить заявку');
        return;
      }
      setPhone('');
      setPrivacyAccepted(false);
    } catch {
      setSubmitError('Ошибка сети. Проверьте подключение и адрес API.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center overflow-x-hidden overflow-y-auto bg-[#F5F5F5]"
      style={{
        height: '100dvh',
        boxSizing: 'border-box',
        paddingTop: 'var(--sat, 0px)',
        paddingBottom: 'calc(28px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div
        className="relative shrink-0 bg-[#F5F5F5]"
        style={{
          width: 400,
          minWidth: 400,
          maxWidth: 400,
          minHeight: 230 + 495 + 20,
          boxSizing: 'border-box',
        }}
      >
        {/* Header — как layout/Header.tsx: left 20 / 340, top --header-top */}
        <div
          className="absolute z-10 h-10 w-10 cursor-pointer"
          style={{ left: 20, top: 'var(--header-top, 50px)' }}
        >
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white backdrop-blur-[5px]"
            aria-label="Меню"
          >
            <CirclesFourIcon />
          </Link>
        </div>

        <div
          className="absolute z-10 flex items-center"
          style={{
            left: 70,
            top: 'calc(var(--header-top, 50px) + 15px)',
            width: 140,
            height: 10,
          }}
        >
          <HeaderLogoSvg />
        </div>

        <div
          className="absolute z-10 h-10 w-10 cursor-pointer"
          style={{ left: 340, top: 'var(--header-top, 50px)' }}
        >
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white backdrop-blur-[5px] transition-opacity hover:opacity-90"
            aria-label="Связаться"
            onClick={() => setConsultationModalOpen(true)}
          >
            <PaperPlaneIcon />
          </button>
        </div>

        <ConsultationModal
          isOpen={consultationModalOpen}
          onClose={() => setConsultationModalOpen(false)}
          onComplete={() => setConsultationModalOpen(false)}
        />

        {/* Cookie — Group 7476: 360×120, как Frame1 */}
        {showCookieBanner && (
          <div
            className="absolute z-20 box-border bg-white"
            style={{
              width: 360,
              height: 120,
              left: 'calc(50% - 360px / 2)',
              top: 'var(--header-top, 50px)',
              borderRadius: 20,
            }}
          >
            <div
              className="absolute flex items-center justify-between"
              style={{
                left: 15,
                right: 15,
                top: 15,
                height: 20,
                boxSizing: 'border-box',
              }}
            >
              <span
                style={{
                  ...involve,
                  fontSize: 14,
                  lineHeight: '145%',
                  color: 'rgba(16, 16, 16, 0.25)',
                }}
              >
                Автоматически закроется через {cookieTimer}
              </span>
              <button
                type="button"
                onClick={() => setShowCookieBanner(false)}
                className="flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent outline-none"
                aria-label="Закрыть"
              >
                <CloseIcon width={16} height={16} />
              </button>
            </div>
            <p
              className="absolute m-0"
              style={{
                left: 15,
                top: 45,
                width: 330,
                height: 60,
                ...involve,
                fontSize: 14,
                lineHeight: '110%',
                color: '#101010',
              }}
            >
              Если продолжаете использовать этот портал, вы выражаете согласие на использование файлов куки в соответствии с
              условиями{' '}
              <Link
                href={PRIVACY_HREF}
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
            </p>
          </div>
        )}

        {/* Белая карточка — Frame1: left 15 right 15 top 230, padding 15, gap 5 */}
        <div
          className="absolute box-border bg-white"
          style={{
            left: 15,
            right: 15,
            top: 230,
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 15,
            paddingRight: 15,
            paddingBottom: 'calc(15px + env(safe-area-inset-bottom, 0px))',
            paddingLeft: 15,
            boxSizing: 'border-box',
            gap: 5,
          }}
        >
          <h1
            className="m-0 flex-shrink-0"
            style={{
              ...involve,
              fontSize: 20,
              lineHeight: '125%',
              color: '#101010',
              paddingTop: 0,
              paddingBottom: 10,
            }}
          >
            Подготавливание школьников с 5 по 11 класс, чтобы все государственные экзамены сдали на топ баллов
          </h1>

          {/* Group 7409: 320×25 — по центру поля карточки (внутренняя ширина 370 − 30 = 340) */}
          <div className="mx-auto box-border flex h-[25px] w-[320px] max-w-full shrink-0 items-center gap-[5px] rounded-[100px] bg-[#F5F5F5] px-[5px]">
            <span className="flex h-[15px] w-[15px] shrink-0 items-center justify-center" aria-hidden>
              <BadgeCheckIcon />
            </span>
            <span
              className="flex min-h-0 min-w-0 flex-1 items-center text-[12px] font-medium leading-[205%] text-[rgba(16,16,16,0.75)]"
              style={involve}
            >
              свыше 999+ школьников подготовились с нами
            </span>
          </div>

          <form className="flex w-full flex-col gap-[5px]" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="landing-phone">
              Номер сотового телефона
            </label>
            <input
              id="landing-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Номер сотового телефона"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="box-border w-full rounded-[10px] border border-solid border-[rgba(16,16,16,0.25)] bg-white px-[15px] outline-none placeholder:text-[rgba(16,16,16,0.5)]"
              style={{
                ...involve,
                height: 50,
                minHeight: 50,
                paddingLeft: 15,
                paddingRight: 16,
                fontSize: 16,
                lineHeight: '125%',
                color: '#101010',
              }}
            />

            {/* PrivacyConsent — как Frame1/PrivacyConsent: border 0.25, чекбокс 16×16 круг, mr 10 */}
            <div className="w-full shrink-0">
              <button
                type="button"
                className="relative box-border flex w-full cursor-pointer items-center rounded-[10px] border border-solid border-[rgba(16,16,16,0.25)] bg-white text-left"
                style={{ height: 50, minHeight: 50, paddingLeft: 15, paddingRight: 15 }}
                onClick={() => setPrivacyAccepted(!privacyAccepted)}
              >
                <span
                  className="flex flex-shrink-0 items-center justify-center rounded-full border border-solid box-border"
                  style={{
                    width: 16,
                    height: 16,
                    marginRight: 10,
                    borderColor: privacyAccepted ? 'transparent' : 'rgba(16, 16, 16, 0.5)',
                    background: privacyAccepted ? '#101010' : 'transparent',
                  }}
                >
                  {privacyAccepted ? <ConsentCheckIcon /> : null}
                </span>
                <span className="text-[14px] font-medium leading-[105%] text-[#101010]" style={involve}>
                  Я, полностью соглашаюсь с условиями{' '}
                  <Link
                    href={PRIVACY_HREF}
                    className="text-[#2563eb] underline decoration-solid [text-underline-offset:3px]"
                    style={{ textDecorationSkipInk: 'none' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    политики приватности
                  </Link>{' '}
                  этого портала
                </span>
              </button>
            </div>

            {submitError ? (
              <p className="m-0 text-center text-[13px] text-red-600" role="alert">
                {submitError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="box-border flex w-full cursor-pointer items-center justify-center rounded-[10px] text-white outline-none transition-opacity disabled:opacity-60"
              style={{
                ...involve,
                marginTop: 15,
                height: 50,
                minHeight: 50,
                background: '#101010',
                border: '1px solid rgba(16, 16, 16, 0.25)',
                borderRadius: 10,
                fontSize: 16,
                lineHeight: '315%',
              }}
            >
              {submitting ? 'Отправка…' : 'Консультирование'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
