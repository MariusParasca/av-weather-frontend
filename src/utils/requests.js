import ipStackAxios from 'axios/ipStack';

async function makeIpRequest() {
  try {
    const response = await ipStackAxios.get('/check');

    return { ip: response.data.ip };
  } catch (error) {
    return { error };
  }
}