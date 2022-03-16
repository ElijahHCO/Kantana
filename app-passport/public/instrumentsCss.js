//Animated card flip script
const $card = document.querySelector('.card_inner');
$card.addEventListener('click', () => {
    $card.classList.toggle('is-flipped');
})
//carousel slideshow code
let slidePosition = 0;
const slides = document.getElementsByClassName('slide');
const totalSlides = slides.length;
const next = document.getElementById('next').addEventListener("click", () => {
    moveToNextSlide();
})
document.getElementById('prev').addEventListener("click", () => {
    moveToPrevSlide();
})
const updateSlidePosition = () => {
    for (let slide of slides) {
        console.log(slide);
        slide.classList.remove('slide--visible');
        slide.classList.add('slide--hidden');
    }
    slides[slidePosition].classList.remove('slide--hidden');
    slides[slidePosition].classList.add('slide--visible');
}
const moveToNextSlide = () => {
    updateSlidePosition();
    if(slidePosition === totalSlides -1) {
        slidePosition = 0;
    }
    else {
        slidePosition++;
    }
    updateSlidePosition();
}
const moveToPrevSlide = () => {
    updateSlidePosition();
    if(slidePosition === 0) {
        slidePosition = slides.length -1;
    }
    else {
        slidePosition--;
    }
}