export interface Module {
  id: number;
  name: string;
  introduction: string;
  submodules: string;
}

export interface SubModule {
  id: number;
  name: string;
  introduction: string;
  type: 'SURVEY' | 'VALUE' | 'LESSON' | 'ARTICLE' | 'LAB';
}