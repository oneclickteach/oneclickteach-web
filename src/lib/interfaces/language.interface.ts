import { LanguageCode, LanguageDirection } from "../enums";
import { LanguageTranslationInterface } from "./language-translation.interface";

export interface LanguageInterface {
  id: string;
  code: LanguageCode;
  name: string;
  native_name: string;
  direction: LanguageDirection;
  is_default: boolean;
  is_active: boolean;
  flag_emoji: string;
  translations: LanguageTranslationInterface[];
}


