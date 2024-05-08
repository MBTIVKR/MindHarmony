//@ Dotenv variables
export const API_URL = import.meta.env.VITE_APP_API_URL;
export const APP_MODE = import.meta.env.VITE_REACT_APP_MODE;
export const SECRET = import.meta.env.SECRET;
export const TOTAL_TESTS = 3
// export const TOTAL_TESTS = parseInt(import.meta.env.TOTAL_TESTS);

//@ Перемнные с описанием приложения и источниками
export const APP = {
  NAME: 'MH',
  FULLNAME: 'Mind Harmony',
  VERSION: '1.3.1',
  AUTHOR: 'Audyushin Dobrynya <avdushinbeaver1@gmail.com>',
  DESCRIPTION:
    'MindHarmony - сервис для сбора статистики о когнитивных функциях человека, для дальнейшего изучения тенденций',
  //! Стоит попробовать использовать в ссылках на источники метод `dns-prefetching`
  //* пример: <a rel="dns-prefetching" href={APP.GITHUB}></a>
  SOCIAL_MEDIA: {
    TELEGRAM: '',
    GITHUB: 'https://github.com/MBTIVKR/',
  },
  Tests: {
    TotalTests: TOTAL_TESTS,
  }
};
