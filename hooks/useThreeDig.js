export const useThreeDig = (n) => {
  if (n + 1 < 10) return `00${n + 1}`;
  else return `0${n + 1}`;
};
