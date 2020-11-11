import axios from 'axios';

const nhkAxios = axios.create({
    baseURL: 'https://www3.nhk.or.jp'
});

export default nhkAxios;