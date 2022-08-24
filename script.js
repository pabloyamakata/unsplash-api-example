const root = document.getElementById('root');
const input = document.getElementById('input');

const url = 'https://api.unsplash.com';
const accessKey = config.ACCESS_KEY;

let urls = [];

// Intersection Observer API
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6
};

let callback = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.backgroundImage = `url(${urls[0]})`;
            observer.unobserve(entry.target);
        }
    });
};

let observer = new IntersectionObserver(callback, options);

const fetchData = async() => {
    root.replaceChildren();

    if(input.value == '') input.value = 'London';

    const response = await fetch(`${url}/search/photos?query=${input.value}&per_page=30&client_id=${accessKey}`);
    const data = await response.json();

    if(data.results.length > 0) {
        let images = [];
        let fragment = document.createDocumentFragment();

        for(i = 0; i < data.results.length; i++) {
            images[i] = document.createElement('div');
            images[i].setAttribute('class', 'image');
            urls[i] = data.results[i].urls.raw;
    
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
        alert('0 results!');
    }
};

window.addEventListener('load', () => {
    fetchData();
});

window.addEventListener('keydown', event => {
    if(event.code == 'Enter') {
        fetchData();
    }
});
