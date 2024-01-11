import * as languages from "./export-lang";
import {makeAutoObservable} from "mobx";

interface Language {
  words: Record<string, string>;
}

interface Languages {
  [lang: string]: Language;
}

class Interpreter {
  lang: string;
  languages: Languages = languages;

  constructor() {
    this.lang = "russian";
    makeAutoObservable(this);
  }

  switchLang = (language: string) => {
    this.lang = language;
  };

  translate = (key: string) => {
    return this.languages[this.lang]?.words[key] || '';
  };
}

export default new Interpreter();