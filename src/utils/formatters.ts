/**
 * Format a numeric amount into local Cameroon FCFA standard:
 * e.g., 65000 -> "65 000 FCFA" with non-breaking spaces
 */
export function formatFCFA(amount: number): string {
  const parts = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
  return `${parts}\u00A0FCFA`;
}

/**
 * Generate a pre-filled WhatsApp click-to-chat URL for Cameroonian merchants
 * Standard Cameroon international dialing code: +237
 */
export function getWhatsAppOrderLink(phone: string, productTitle: string, price: number, boutiqueName: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const targetPhone = cleanPhone.startsWith('237') ? cleanPhone : `237${cleanPhone}`;
  const message = `Bonjour ${boutiqueName}, je suis intéressé(e) par votre article "${productTitle}" affiché à ${formatFCFA(price)} sur MultiBoutiques Cameroun. Est-il disponible pour livraison ?`;
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}
