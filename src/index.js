import Notiflix, { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchFunction } from './fetchFunction';
import { onGalleryRender } from './onGalleryRender';


//refs
const searchForm = document.querySelector('.search-form');
const btnSubmit = document.querySelector('.search-button');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = '';
let perPage = '';

searchForm.addEventListener('submit', onSearchSubmit);


function onSearchSubmit (event) {
    event.preventDefault();
    const inputSearch = event.target.elements.searchQuery.value.trim();
    page = 1;
    if(!inputSearch){
        return Notify.info("Sorry, there are no images matching your search query. Please try again.");
    }
    
    fetchFunction(inputSearch, page, perPage).then(onSchowGallery).catch(onError)
}

function onSchowGallery(content) {
    const markup = onGalleryRender(content);
    gallery.insertAdjacentHTML('beforeend', markup);
    loadMoreBtn.classList.remove('is-hidden')
}

function onError(error) {
    loadMoreBtn.classList.add('is-hidden')
    if(error){
    return Notify.failure('Sorry, there are no images matching your search query. Please try again.')}
}

