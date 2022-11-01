const getTextBorder = (color: string, width: number) => {
  const shadow = [];
  for (let i = -width; i <= width; i += 1) {
    for (let j = -width; j <= width; j += 1) {
      shadow.push(`${i * 1}px ${j * 1}px 0 ${color}`);
    }
  }
  return shadow.join(',');
};

export default getTextBorder;
