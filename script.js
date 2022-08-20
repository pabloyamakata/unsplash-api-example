const root = document.getElementById('root');

const url = 'https://api.unsplash.com';
const query = 'london';
const accessKey = config.ACCESS_KEY;

const fetchData = async() => {
    const response = await fetch(`${url}/search/photos?query=${query}&client_id=${accessKey}`);
    const data = await response.json();
    root.innerHTML = data.results[0].alt_description;
};

fetchData();
