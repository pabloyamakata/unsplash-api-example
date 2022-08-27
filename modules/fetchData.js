import { saveUrl } from "./url.js";
import { observerCallback, observerOptions } from "./intersectionObserver.js";

const root = document.getElementById('root');
const input = document.getElementById('input');
const baseUrl = 'https://api.unsplash.com';
const accessKey = config.ACCESS_KEY;

const observer = new IntersectionObserver(observerCallback, observerOptions);

const fetchData = async() => {
    root.replaceChildren();

    if(input.value == '') input.value = 'London';

    const response = await fetch(`${baseUrl}/search/photos?query=${input.value}&per_page=30&client_id=${accessKey}`);
    const data = await response.json();

    if(data.results.length > 0) {
        let images = [];
        let fragment = document.createDocumentFragment();

        for(let i = 0; i < data.results.length; i++) {
            images[i] = document.createElement('div');
            images[i].setAttribute('class', 'image');
            saveUrl(data.results[i].urls.raw);

            if(data.results[i].width > data.results[i].height) {
                images[i].classList.add('column-span');
            } else if(data.results[i].width < data.results[i].height) {
                images[i].classList.add('row-span');
            }
    
            fragment.appendChild(images[i]);
        }

        root.appendChild(fragment);
        let targets = document.querySelectorAll('.image');
        
        targets.forEach(target => {
            observer.observe(target);
        });
    } else {
        let errorContainer = document.createElement('div');
        let errorMessage = document.createElement('span');

        errorContainer.setAttribute('class', 'error-container');
        errorMessage.setAttribute('class', 'error-message');
        errorMessage.textContent = `Oops! There's been an error...`;

        errorContainer.appendChild(errorMessage);

        root.style.gridTemplateColumns = '100%';
        root.appendChild(errorContainer);
    }
};

export default fetchData;
