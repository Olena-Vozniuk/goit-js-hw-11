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

async function onSchowGallery({totalHits, hits}) {
    try {
        gallery.insertAdjacentHTML(
            'beforeend',
            onGalleryRender(hits)
        );
        const pages = totalHits / perPage;
        loadMoreBtn.classList.remove('is-hidden');
        lightbox.refresh();
    
        if (page === 1 && totalHits > 1) {
            Notify.success(`Hooray! We found ${totalHits} images.`);
        }
    
        if (totalHits < 40 && totalHits > 0) {
            loadMoreBtn.classList.add('is-hidden');
            return Notify.failure("We're sorry, but you've reached the end of search results."
  );
        }
        
        if (page === pages) {
            loadMoreBtn.classList.add('is-hidden');
            return Notify.failure("We're sorry, but you've reached the end of search results."
  );
        }
        if (totalHits === 0) {
            loadMoreBtn.classList.add('is-hidden');
            return Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
        }
      
    
        const response = await fetchFunction(inputSearch, page, perPage);
        const arrayOfImages = response.data.hits;
        
        if (!arrayOfImages.length) {
            loadMoreBtn.classList.add('is-hidden');
            return Notify.failure("We're sorry, but you've reached the end of search results.");
        }
    }
    catch (error) {
            console.error(error.stack);
        }
    }



function onError(error) { 
    loadMoreBtn.classList.add('is-hidden');
    return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
}

function onResetSearch(page) {
  page = 1;
  gallery.innerHTML = '';
}

const lightbox = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
});

function onLoadFunction() {
  const inputSearch = searchForm.elements.searchQuery.value;
  page += 1;
	fetchFunction(inputSearch, page, perPage)
		.then(onSchowGallery)
        .catch(onError)
}


