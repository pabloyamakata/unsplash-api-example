import getRandomItem from "./getRandomItem.js";
import removeModal from "./removeModal.js";
import { getAllUrls } from "./url.js";

export const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

export const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            let image = getRandomItem(getAllUrls());
            entry.target.style.backgroundImage = `url(${image}})`;

            entry.target.addEventListener('click', () => {

                if(document.querySelector('.modal')) {
                    removeModal();
                }

                let modal = document.createElement('div');
                modal.setAttribute('class', 'modal');
                modal.style.backgroundImage = `url(${image})`;

                if(entry.target.classList.contains('column-span')) {
                    modal.classList.add('modal-landscape');
                } else if(entry.target.classList.contains('row-span')) {
                    modal.classList.add('modal-portrait');
                }

                let closeIcon = document.createElement('span');
                closeIcon.setAttribute('class', 'material-icons material-icons-round');
                closeIcon.textContent = 'close';
                closeIcon.addEventListener('click', removeModal);

                modal.appendChild(closeIcon);

                document.body.appendChild(modal);
            });

            observer.unobserve(entry.target);
        }
    });
};
