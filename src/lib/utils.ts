export function formatPhoneNumber(val: string): string {
  const raw = val.replace(/[^0-9]/g, "");
  if (!raw) return "";

  // 대표번호 (1544, 1588 등)
  if (!raw.startsWith("0")) {
    if (raw.length <= 4) return raw;
    return `${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
  }

  // 서울 지역번호 (02)
  if (raw.startsWith("02")) {
    if (raw.length <= 2) return raw;
    if (raw.length <= 5) return `${raw.slice(0, 2)}-${raw.slice(2)}`;
    if (raw.length <= 9) return `${raw.slice(0, 2)}-${raw.slice(2, 5)}-${raw.slice(5)}`;
    return `${raw.slice(0, 2)}-${raw.slice(2, 6)}-${raw.slice(6, 10)}`;
  }

  // 휴대폰 및 기타 지역번호 (010, 031 등)
  if (raw.length <= 3) return raw;
  if (raw.length <= 7) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
  if (raw.length <= 10) return `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6)}`;
  return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
}
