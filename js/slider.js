let currentIndex = 0;
let interval;
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            indicators[i].classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                indicators[i].classList.add('active');
            }
        });
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 3000);
    }

    window.setSlide = function(index) {
        currentIndex = index;
        showSlide(currentIndex);
        clearInterval(interval);
        startAutoSlide();
    }

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        touchEndX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (touchStartX - touchEndX > 50) {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        } else if (touchEndX - touchStartX > 50) {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }
    }

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    showSlide(currentIndex);
    startAutoSlide();
});