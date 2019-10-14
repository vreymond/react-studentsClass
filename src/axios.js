import axios from 'axios';

// URL de la base de données contenant les 5 élèves de départ
const instance = axios.create({
  baseURL: 'https://students-numeric-class.firebaseio.com/'
});

export default instance;