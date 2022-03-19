//Animated card flip script
const $card = document.querySelector('.card_inner');
$card.addEventListener('click', () => {
    window.location = URL("/instruments/show.ejs");
})