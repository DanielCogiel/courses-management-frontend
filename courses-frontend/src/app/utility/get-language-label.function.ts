import { Language } from "../data-access/language/language.enum";

export const getLanguageLabel = (language: Language) => {
  switch(language) {
    case Language.PL:
      return 'Polski';
    case Language.EN:
      return 'Angielski';
    default:
      return undefined;
  }
}
