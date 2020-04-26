import { FAVORITES_DATA } from 'constants/reduxState';

export const getFavoritesQuery = uid => {
  return uid
    ? [
        {
          collection: 'users',
          doc: uid || '',
          subcollections: [
            {
              collection: 'favoritesData',
              orderBy: ['dateTime', 'desc'],
            },
          ],
          storeAs: FAVORITES_DATA,
        },
      ]
    : [];
};
