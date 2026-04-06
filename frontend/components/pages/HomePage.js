'use client';

import ConsultationLandingPage from '@/components/landing/ConsultationLandingPage';
import PrivacyPolicyPage from '@/components/privacy/PrivacyPolicyPage';

/**
 * Главная страница приложения: сначала политика, после сворачивания — лендинг.
 * По структуре аналогично тому, как в next/frontend подключают Frame1 к page.
 */
export default function HomePage({ privacyCollapsed, onPrivacyCollapse }) {
  if (privacyCollapsed) {
    return <ConsultationLandingPage />;
  }
  return <PrivacyPolicyPage onCollapse={onPrivacyCollapse} />;
}
