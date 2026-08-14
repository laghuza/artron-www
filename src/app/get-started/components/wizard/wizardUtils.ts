export const formatFedCode = (val: string) => {
  const cleaned = val.replace(/\D/g, '').slice(0, 9);
  const parts = [];
  for (let i = 0; i < cleaned.length; i += 3) {
    parts.push(cleaned.slice(i, i + 3));
  }
  return parts.join(' ');
};

export const formatPhone = (val: string) => {
  const cleaned = val.replace(/\D/g, '');
  let digits = cleaned;
  if (cleaned.startsWith('995')) {
    digits = cleaned.slice(3);
  }
  digits = digits.slice(0, 9);

  let formatted = '+995';
  if (digits.length > 0) {
    const area = digits.slice(0, 3);
    formatted += ` (${area}`;
    if (digits.length > 3) {
      formatted += `) ${digits.slice(3, 5)}`;
      if (digits.length > 5) {
        formatted += ` ${digits.slice(5, 7)}`;
        if (digits.length > 7) {
          formatted += ` ${digits.slice(7, 9)}`;
        }
      }
    }
  }
  return formatted;
};
