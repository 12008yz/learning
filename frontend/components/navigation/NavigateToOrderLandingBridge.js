'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NAVIGATE_TO_ORDER_LANDING_EVENT } from '@/lib/navigateToOrderLanding';

/** Глобальный переход на главную, секция «Заявка», первая карточка — по событию из любого экрана. */
export default function NavigateToOrderLandingBridge() {
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      router.push('/?section=order');
    };
    window.addEventListener(NAVIGATE_TO_ORDER_LANDING_EVENT, handler);
    return () => window.removeEventListener(NAVIGATE_TO_ORDER_LANDING_EVENT, handler);
  }, [router]);

  return null;
}
