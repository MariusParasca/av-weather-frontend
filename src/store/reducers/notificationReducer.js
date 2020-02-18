import { store } from 'react-notifications-component';

import { SEND_NOTIFICATIONS } from 'store/actionTypes/notificationActionTypes';
import { capitalizeFirstLetter } from 'utils/helperFunctions';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_NOTIFICATIONS:
      store.addNotification({
        title: capitalizeFirstLetter(action.notificationType),
        message: action.message,
        type: action.notificationType,
        container: 'top-right',
        dismiss: {
          duration: 3000,
        },
      });
      break;
    default:
      break;
  }
  return state;
};

export default reducer;
