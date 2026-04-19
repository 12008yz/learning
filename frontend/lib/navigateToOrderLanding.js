/**
 * Переход к первой карточке блока заявки на главной (секция #section-order, orderStep 0).
 * Слушатель: NavigateToOrderLandingBridge (router.push('/?section=order')).
 * Дополнительно OrderCreationLandingPage сбрасывает мастер по этому же событию.
 */
export const NAVIGATE_TO_ORDER_LANDING_EVENT = 'app:navigate-to-order-landing';

export function dispatchNavigateToOrderLanding() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(NAVIGATE_TO_ORDER_LANDING_EVENT, { bubbles: true }));
}
