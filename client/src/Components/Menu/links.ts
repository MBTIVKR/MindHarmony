import { Paths, PathsEternalMemory } from '@/App/Routes/types/Paths';

export type TLink = {
  path: string;
  label: string;
};

export const links: TLink[] = [
  {
    path: Paths.Home,
    label: 'ГЛАВНАЯ',
  },
  {
    path: Paths.Account,
    label: 'ПРОФИЛЬ',
  },
  {
    path: PathsEternalMemory.EternalMemory,
    label: 'ВЕЧНАЯ ПАМЯТЬ',
  },
  {
    path: Paths.FamilyTree,
    label: 'СЕМЕЙНОЕ ДРЕВО',
  },
  {
    path: Paths.TimeCapsule,
    label: 'КАПСУЛА ВРЕМЕНИ',
  },
  {
    path: Paths.Calendar,
    label: 'КАЛЕНДАРЬ ЖИЗНИ',
  },
];
