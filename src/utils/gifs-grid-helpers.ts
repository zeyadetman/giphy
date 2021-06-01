export const getGridWidth = (width: number, contentWidth: number): number =>
  (contentWidth * width) / 100;
export const getGridColumns = (width: number, contentWidth: number): number => {
  const gridWidth = getGridWidth(width, contentWidth);
  if (gridWidth <= 300) return 2;
  else if (gridWidth > 300 && gridWidth <= 600) return 3;
  else if (gridWidth > 600 && gridWidth <= 900) return 4;
  else if (gridWidth > 900 && gridWidth <= 1200) return 5;
  else return 6;
};
