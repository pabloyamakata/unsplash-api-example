const root = document.getElementById('root');

const url = 'https://api.unsplash.com';
const query = 'london';
const accessKey = config.ACCESS_KEY;

const fetchData = async() => {
    const response = await fetch(`${url}/search/photos?query=${query}&client_id=${accessKey}`);
    const data = await response.json();

    let gridItems = [];
    let fragment = document.createDocumentFragment();

    for(i = 0; i < data.results.length; i++) {
        gridItems[i] = document.createElement('div');
        gridItems[i].style.backgroundImage = `url(${data.results[i].urls.raw})`;
        fragment.appendChild(gridItems[i]);
    }

    root.appendChild(fragment);
};

fetchData();
