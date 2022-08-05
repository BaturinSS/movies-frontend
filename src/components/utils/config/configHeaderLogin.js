export const configHeaderLogin = {
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
}

export default configHeaderLogin;