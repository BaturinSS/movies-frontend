const configAboutMe = {
  title: 'Студент',
  name: 'Виталий',
  profession: 'Фронтенд-разработчик, 30 лет',
  description: 'Я родился и живу в Саратове, закончил факультет экономики СГУ.У меня есть жена и дочь.Я люблю слушать музыку, а ещё увлекаюсь бегом.Недавно начал кодить.С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб- разработке, начал заниматься фриланс - заказами и ушёл с постоянной работы.',
  links: [
    {
      id: 1,
      to: { pathname: "https://vk.com/baturinss" },
      target: '_blank',
      title: 'VK',
    },
    {
      id: 2,
      to: { pathname: "https://github.com/BaturinSS" },
      target: '_blank',
      title: 'Github',
    },
  ],
  portfolio: {
    title: 'Портфолио',
    links: [
      {
        id: 3,
        to: {
          pathname: 'https://baturinss.github.io/how-to-learn'
        },
        target: '_blank',
        title: 'Статичный сайт',
        addIcon: true,
        alt: 'Иконка ссылки',
      },
      {
        id: 4,
        to: {
          pathname: 'https://baturinss.github.io/russian-travel'
        },
        target: '_blank',
        title: 'Адаптивный сайт',
        addIcon: true,
        alt: 'Иконка ссылки',
      },
      {
        id: 5,
        to: {
          pathname: 'https://server-mesto.ru'
        },
        target: '_blank',
        title: 'Одностраничное приложение',
        addIcon: true,
        alt: 'Иконка ссылки',
      },
    ]
  }
};

export default configAboutMe;
