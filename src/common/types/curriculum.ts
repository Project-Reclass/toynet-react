export interface DashboardIntf {
  id: number;
  name: string;
  introduction: string;
  modules: ModuleIntf[];
}

export interface ModuleIntf {
  id: number;
  name: string;
  introduction: string;
  submodules: SubModuleIntf[];
}

export type SubModuleType = 'SURVEY' | 'VALUE' | 'LESSON' | 'ARTICLE' | 'LAB' | 'QUIZ';

export interface SubModuleIntf {
  id: number;
  name: string;
  introduction: string;
  type: SubModuleType;
}