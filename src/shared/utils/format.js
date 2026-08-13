/*
  shared/utils/format.js
  담당: 천솔 (공통 유틸)
*/

const currencyFormatter = new Intl.NumberFormat('ko-KR');

export function formatKrw(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '-';
  return `${currencyFormatter.format(amount)}원`;
}

export function formatDate(isoString) {
  if (!isoString) return '-';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '-';
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(
    date.getDate()
  ).padStart(2, '0')}`;
}
