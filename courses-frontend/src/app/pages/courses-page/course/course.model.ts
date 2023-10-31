import { Level } from "../../../data-access/level/level.enum";
import { Language } from "../../../data-access/language/language.enum";

interface CourseModel {
  id: string,
  trainer_id: string,
  title: string,
  level: Level,
  language: Language,
  location: string,
  image_path: string
}
export default CourseModel;
