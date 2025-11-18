
export type Platform = 'web' | 'mobile' | 'both' | '';
export type TechStack = '' | 'none' | 'classic' | 'react' | 'vue' | 'mobile';
export type PrdScope = 'frontend' | 'fullstack';
export type VanillaStructure = 'single' | 'separate' | '';

export interface CustomTechStack {
  frontend: string;
  backend: string;
  database: string;
  deployment: string;
}

export interface PrdInput {
  idea: string;
  platform: Platform;
  scope: PrdScope;
  features: string;
  audience: string;
  techStack: TechStack;
  customTechStack: CustomTechStack;
  vanillaStructure: VanillaStructure;
  monetization: string;
  successMetrics: string;
}

export interface PrdHistoryItem {
  id: string;
  title: string;
  content: string;
  date: number;
  preview: string;
}
