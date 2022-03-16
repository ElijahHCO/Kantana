//hamburger
const hamburger = document.querySelector(".hamburger");
const topNav = document.querySelector("#nav-ul");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    topNav.classList.toggle("active");
})
document.querySelectorAll(".nav-links").forEach(n => n.addEventListener)