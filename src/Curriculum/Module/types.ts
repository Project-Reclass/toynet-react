export enum ModuleTypes {
  QUIZ = 'quiz',
  ARTICLE = 'article',
  PARENT = 'parent',
  EMULATOR = 'emulator',
}

export interface ModuleInterface {
  id: number | string;
  moduleId: number | string;
  title: string;
  progress: number;
  type: ModuleTypes;
}