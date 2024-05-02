import { PathsDashboard } from '@/Components/App/Routing';

export const banners = {
  MBTIbanner: '/banners/mbti_image.jpg',
  SMILbanner: '/banners/smil_banner.png',
};

export const TestsData = {
  MBTI: {
    title: 'Тестирование MBTI (Myers — Briggs Type Indicator, или индикатор типа Майерс — Бриггс)',
    description: 'Это метод психологической оценки в формате теста. Специальные вопросы определяют сильные и слабые стороны человека, подчёркивают его взгляды и предпочтения, выявляют мотивацию и особенности поведения. Результаты укладываются в определённые комбинации, на основании которых и выделяются типы личности.',
    bannerSrc: '/banners/mbti_image.jpg',
    buttonText: 'Пройти тестирование',
    to: PathsDashboard.MBTI,
    disabled: false,
  },
  STROOP: {
    title: 'Тест Струпа',
    description: 'Это классический психологический тест, который используется для измерения когнитивного контроля и способности подавлять конфликтующие реакции. Этот тест не защищен авторскими правами и может быть адаптирован для использования в различных контекстах. ',
    bannerSrc: '/banners/stroop_banner.png',
    buttonText: 'Пройти тестирование',
    to: PathsDashboard.STROOP,
    disabled: false,
  },
  SMIL: {
    title: 'Тестирование СМИЛ',
    description: 'Стандартизированный метод исследования личности. Адаптация теста MMPI, сделанная Людмилой Николаевной Собчик. В отличие от оригинальной версии, СМИЛ не имеет клинической направленности и основывается на индивидуально-типологическом подходе автора.',
    bannerSrc: '/banners/smil_banner.png',
    buttonText: 'Пройти тестирование',
    to: PathsDashboard.SMIL,
    disabled: true,
  },
};
