import axios from 'axios';

export const nhkAxios = axios.create({
    baseURL: 'https://www3.nhk.or.jp'
});

export const waniKaniAxios = axios.create({
    baseURL: 'https://api.wanikani.com/v2',
    headers: {
        common: {
            Authorization: 'Bearer 4b8a01b1-e882-4adf-a1ee-8ab82ee286a4',
            'wanikani-revision': 20170710 
        }
    }
});