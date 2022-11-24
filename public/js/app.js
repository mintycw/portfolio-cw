reveal();
window.addEventListener("scroll", reveal);
window.addEventListener("mousemove", reveal);

function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    
    for (let i = 0; i < reveals.length; i++) {
        const windowWidth = window.innerWidth;
        const elementLeft = reveals[i].getBoundingClientRect().left;
        
        if (elementLeft < windowWidth) {
            reveals[i].classList.add("active");
            console.log("active");
        }
    }
}

const imgArray = createImageArray();
const imgElement = createImageElement();
nextImage();
imgElement.addEventListener('click', nextImage);

function createImageArray() {
    array = [];
    for (let i = 0; i < 17; i++) {
        array[i] = `public/img/me/${i}.jpg`;
    }
    return array;
}

function createImageElement() {
    const parentDiv = document.getElementById('about-me-pictures');
    const newImg = document.createElement('img');
    newImg.classList.add('reveal', 'fade-right');
    newImg.id = 'me-picture';
    parentDiv.appendChild(newImg);
    return newImg;
}

function nextImage(e = null) {
    array = imgArray;
    if (e !== null) { 
        array = array.filter((item) => (!e.target.src.includes(item)));
    }
    imgElement.src = array[Math.floor(Math.random() * array.length)];
}

const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('down');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('down');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('down');
});

slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1;
    slider.scrollLeft = scrollLeft - walk;
});

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    })
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('on');
    overlay.classList.add('on');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('on');
    overlay.classList.remove('on');
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.key == 'Escape') {
        const modals = document.querySelectorAll('.modal.on');
        modals.forEach(modal => {
        closeModal(modal);
        })
    }
};