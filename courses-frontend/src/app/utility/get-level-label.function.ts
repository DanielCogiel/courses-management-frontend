import { Level } from "../data-access/level/level.enum";

export const getLevelLabel = (level: Level) => {
  switch(level) {
    case Level.BEGINNER:
      return 'Początkujący';
    case Level.INTERMEDIATE:
      return 'Średnio zaawansowany';
    case Level.EXPERT:
      return 'Zaawansowany';
    default:
      return undefined;
  }
}
