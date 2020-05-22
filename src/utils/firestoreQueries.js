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

export const getSuggestionsQuery = uid => {
  return uid
    ? [
        {
          collection: 'suggestions',
          // orderBy: ['votes', 'desc'],
        },
        {
          collection: 'users',
          doc: uid || '',
          subcollections: [
            {
              collection: 'suggestionVotes',
            },
          ],
          storeAs: 'suggestionVotes',
        },
      ]
    : [];
};
