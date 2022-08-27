import fetchData from "./modules/fetchData.js";
import resetGridColumns from "./modules/resetGridColumns.js";

window.addEventListener('load', () => {
    fetchData();
});

window.addEventListener('keydown', event => {
    if(event.code == 'Enter' && document.getElementById('input') == document.activeElement) {
        resetGridColumns();
        fetchData();
    }
});
