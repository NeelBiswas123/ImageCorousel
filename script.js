function waitForImagesToLoad(images, callback) {
    let loaded = 0;
    const total = images.length;

    images.forEach(img => {
        if (img.complete) {
            loaded++;
        } else {
            img.addEventListener('load', () => {
                loaded++;
                if (loaded === total) callback();
            });
        }
    });

    if (loaded === total) callback();
}

window.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.slider img');
    waitForImagesToLoad(images, initSlider);
});

function initSlider() {
    let index = 0;
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const dotsContainer = document.querySelector('.dots');

    console.log("Slider initialized with", images.length, "images");
    // Set slider width dynamically
    slider.style.width = `${images.length * 100}%`;

    // Set each image width and object-fit
    images.forEach(img => {
        img.style.width = `${100 / images.length}%`;
        img.style.objectFit = 'cover';
    });

    // Create dots (below website)
    images.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            index = i;
            showSlide();
        });
        dotsContainer.appendChild(dot);
    });

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function showSlide() {
        slider.style.transform = `translateX(${-index * (100 / images.length)}%)`;
        updateDots();
    }

    function nextSlide() {
        index = (index + 1) % images.length;
        showSlide();
    }

    function prevSlide() {
        index = (index - 1 + images.length) % images.length;
        showSlide();
    }

    // Button events
    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);

    // Auto slide
    let slideInterval = setInterval(nextSlide, 3000);

    // Pause on hover
    // Force reflow to ensure layout is correct before hover bindings
    void slider.offsetWidth;

    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderContainer.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 3000));

    // Initialize
    showSlide();
}
