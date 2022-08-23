const root = document.getElementById('root');
const input = document.getElementById('input');

const url = 'https://api.unsplash.com';
const accessKey = config.ACCESS_KEY;

const fetchData = async() => {
    root.replaceChildren();

    if(input.value == '') input.value = 'London';

    const response = await fetch(`${url}/search/photos?query=${input.value}&client_id=${accessKey}`);
    const data = await response.json();

    if(data.results.length > 0) {
        let images = [];
        let fragment = document.createDocumentFragment();

        for(i = 0; i < data.results.length; i++) {
            images[i] = document.createElement('div');
            images[i].style.backgroundImage = `url(${data.results[i].urls.raw})`;
    
            if(data.results[i].width > data.results[i].height) {
                images[i].classList.add('column-span');
            } else if(data.results[i].width < data.results[i].height) {
                images[i].classList.add('row-span');
            }
    
            fragment.appendChild(images[i]);
        }

        root.appendChild(fragment);
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
