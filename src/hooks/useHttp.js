import { useReducer, useCallback } from 'react';

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case 'RESPONSE':
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not be reached!');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

  const sendRequest = useCallback(async (axiosInstance, methodParams, method, reqExtra, reqIdentifer) => {
    dispatchHttp({ type: 'SEND', identifier: reqIdentifer });
    try {
      const response = await axiosInstance[method](...methodParams);
      dispatchHttp({
        type: 'RESPONSE',
        responseData: response.data,
        extra: reqExtra,
      });
    } catch (error) {
      dispatchHttp({
        type: 'ERROR',
        errorMessage: error.message,
      });
    }
  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    reqExtra: httpState.extra,
    reqIdentifer: httpState.identifier,
    clear,
  };
};

export default useHttp;
