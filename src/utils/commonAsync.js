import firestore from 'utils/firestore';

export async function addFavorite(options) {
  try {
    const favoritesRef = firestore
      .collection('users')
      .doc(options.uid)
      .collection('favoritesData');
    const response = await favoritesRef.where('city', '==', options.action.favoriteCity.city).get();
    if (response.empty) {
      favoritesRef.add(options.action.favoriteCity);
    }
    return null;
  } catch (error) {
    return error;
  }
}

export default {};
