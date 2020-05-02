import { FAVORITES_DATA, SETTINGS } from 'constants/reduxState';

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

export const getSettingsQuery = uid => {
  return uid
    ? [
        {
          collection: 'users',
          doc: uid || '',
          subcollections: [
            {
              collection: 'settings',
            },
          ],
          storeAs: SETTINGS,
        },
      ]
    : [];
};
