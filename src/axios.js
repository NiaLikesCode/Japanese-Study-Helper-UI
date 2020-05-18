import axios from 'axios';

export const nhkAxios = axios.create({
    baseURL: 'https://www3.nhk.or.jp'
});
