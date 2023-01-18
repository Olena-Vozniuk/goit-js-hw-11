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

let page = 1;
let perPage = 40;

searchForm.addEventListener('submit', onSearchSubmit);


function onSearchSubmit (event) {
    event.preventDefault();
    const inputSearch = event.target.elements.searchQuery.value.trim();
    if(!inputSearch){
        return Notify.info("Sorry, there are no images matching your search query. Please try again.");
    }
    
    fetchFunction(inputSearch, page, perPage).then(onSchowGallery).catch(console.log(error))
}

function onSchowGallery(content) {
    gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    loadMoreBtn.classList.remove('is-hidden')
}

function onError(error) {
    loadMoreBtn.classList.add('is-hidden')
    if(error){
    return Notify.failure('Sorry, there are no images matching your search query. Please try again.')}
}

