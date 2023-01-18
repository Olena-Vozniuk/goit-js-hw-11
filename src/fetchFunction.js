import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32873101-26554fb46a442edcfb4427fc4';

export async function fetchFunction(inputSearch, page, perPage) {
    return await axios.get(`${BASE_URL}?key=${KEY}&q=${inputSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`).then(response => response.data);
}