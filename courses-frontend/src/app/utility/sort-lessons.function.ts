import { parseDateTimeStrings } from "./parse-string-to-string.function";
export const sortLessons = (lessons: {title: string | null, description: string | null, date: string, timeStart: string, timeFinish: string} []) => {
  return lessons.sort((lessonA, lessonB) => {
    return parseDateTimeStrings(lessonA.date, lessonA.timeStart).getTime() - parseDateTimeStrings(lessonB.date, lessonB.timeStart).getTime();
  })
}
