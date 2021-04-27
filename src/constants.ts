export const getLevel = (level: string | "Beginner"): number => {
  switch (level) {
    case "Beginner":
      return 10;
    case "Intermediate":
      return 15;
    case "Expert":
      return 20;
    default:
      return 10;
  }
};

export const LEVEL_NUM = "level_number";
export const MAX_ROWS = 10;
export const MAX_COLS = 10;
export const NO_OF_BOMBS = 10;
