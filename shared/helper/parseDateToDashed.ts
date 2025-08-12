export default function parseDateToDashed(v: Date): string {
  const year = v.getFullYear();
  const month = String(v.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(v.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}