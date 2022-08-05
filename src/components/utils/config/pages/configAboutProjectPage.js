export const configAboutProjectPage = {
  header: {
    configNotLogin: {
      links: [
        {
          id: 1,
          to: '/sign-up',
          title: 'Регистрация',
        },
      ],
      linkEnter: {
        id: 2,
        to: '/sign-in',
        title: 'Войти',
      },
    },
    configLogin: {
      linksNav: [
        {
          id: 1,
          to: '/',
          exact: true,
          title: 'Главная',
        },
        {
          id: 2,
          to: '/movies',
          title: 'Фильмы',
        },
        {
          id: 3,
          to: '/saved-movies',
          title: 'Сохранённые фильмы',
        },
      ],
      linkProfile: {
        to: '/profile',
        title: 'Аккаунт',
        addIcon: true,
      },
    },
  },

  //* Footer default
}

export default configAboutProjectPage;