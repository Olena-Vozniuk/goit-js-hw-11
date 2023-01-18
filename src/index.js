import  { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchFunction } from './fetchFunction';
import { onGalleryRender } from './onGalleryRender';

//refs
const searchForm = document.querySelector(
	'.search-form'
);
const btnSubmit = document.querySelector(
	'.search-button'
);
const gallery =
	document.querySelector('.gallery');
const loadMoreBtn =
	document.querySelector('.load-more');

let page = 1;
let perPage = 40;


searchForm.addEventListener(
	'submit',
	onSearchSubmit
);
loadMoreBtn.addEventListener('click', onLoadFunction)

function onSearchSubmit(event) {
    event.preventDefault();
    onResetSearch();
	const inputSearch =
		event.target.elements.searchQuery.value.trim();
    if (!inputSearch) {
        loadMoreBtn.classList.add('is-hidden');
		return Notify.failure(
			'Enter your request, please.'
		);
	}

	fetchFunction(inputSearch, page, perPage)
		.then(onSchowGallery)
        .catch(onError);

}

function onSchowGallery(content) {
    gallery.insertAdjacentHTML(
        'beforeend',
        onGalleryRender(content.hits)
    );
    loadMoreBtn.classList.remove('is-hidden');
    
    if (page === 1 && content.totalHits > 1) {
        Notify.success(`Hooray! We found ${content.totalHits} images.`);
    }
    
    if (content.totalHits < 40) {
        loadMoreBtn.classList.add('is-hidden');
    }
    
    if (content.totalHits === 0) {
        loadMoreBtn.classList.add('is-hidden');
        return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    }
}


function onError(error) { 
    return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
    );
}

function onResetSearch(page) {
  page = 1;
  gallery.innerHTML = '';
}

const lightbox = new SimpleLightbox('.photo-card', {
  captionDelay: 250,
});

function onLoadFunction() {
  const inputSearch = searchForm.elements.searchQuery.value;
  page += 1;
	fetchFunction(inputSearch, page, perPage)
		.then(onSchowGallery)
        .catch(onError);
    lightbox.refresh();
}


