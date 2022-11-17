reveal();
window.addEventListener("scroll", reveal);

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    
    for (var i = 0; i < reveals.length; i++) {
        var windowWidth = window.innerWidth;
        var elementRight = reveals[i].getBoundingClientRect().right;
        
        if (elementRight < windowWidth) {
            reveals[i].classList.add("active");
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
    newImg.classList.add('reveal', 'fade-picture');
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