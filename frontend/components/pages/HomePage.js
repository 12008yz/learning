'use client';

import ConsultationLandingPage from '@/components/landing/ConsultationLandingPage';
import PrivacyPolicyPage from '@/components/privacy/PrivacyPolicyPage';

/**
 * Главная: лендинг; полный текст политики — по клику на «политики приватности» в баннере про куки (7 с).
 */
export default function HomePage({ privacyPolicyOpen, onOpenPrivacyPolicy, onPrivacyCollapse }) {
  return (
    <>
      <ConsultationLandingPage onOpenFullPrivacyPolicy={onOpenPrivacyPolicy} />
      {privacyPolicyOpen ? (
        <div className="fixed inset-0 z-[10000] w-full min-w-0 overflow-y-auto overflow-x-hidden">
          <PrivacyPolicyPage onCollapse={onPrivacyCollapse} />
        </div>
      ) : null}
    </>
  );
}
