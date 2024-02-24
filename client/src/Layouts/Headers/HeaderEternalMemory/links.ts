import { PathsEternalMemory } from '@/App/Routes/types/Paths';

export type TLinkEternalMemory = {
  path: string;
  label: string;
};

export const links: TLinkEternalMemory[] = [
  {
    path: PathsEternalMemory.EternalMemory,
    label: 'ГЛАВНАЯ'
  },
  {
    path: PathsEternalMemory.Question,
    label: 'ЧТО ЭТО ТАКОЕ',
  },
  {
    path: PathsEternalMemory.Working,
    label: 'КАК РАБОТАЕТ',
  },
  {
    path: PathsEternalMemory.Faq,
    label: 'FAQ',
  },
  {
    path: PathsEternalMemory.Price,
    label: 'ЦЕНА',
  },
];
