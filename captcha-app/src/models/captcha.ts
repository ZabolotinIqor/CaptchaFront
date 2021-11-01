export interface Captcha {
  name: string;
  hasCyrillic: boolean;
  hasLatin: boolean;
  hasNumeric: boolean;
  hasSpecialSymbols: boolean;
  isCaseSensitive: boolean;
  hasAnswer: boolean;
  archive: File;
}
