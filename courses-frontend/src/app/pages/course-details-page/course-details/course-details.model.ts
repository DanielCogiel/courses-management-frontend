import { Language } from "../../../data-access/language/language.enum";
import { Level } from "../../../data-access/level/level.enum";

export interface CourseDetailsModel {
  title: string,
  language: Language,
  level: Level,
  location: string,
  image_path: string,
  ownerFirstName: string,
  ownerLastName: string,
  trainerFirstName: string,
  trainerLastName: string
}
