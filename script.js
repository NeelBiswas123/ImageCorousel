document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const dotsContainer = document.querySelector('.dots');

// Set slider width dynamically
    slider.style.width = `${images.length * 100}%`;

// Set each image width and object-fit
    images.forEach(img => {
        img.style.width = `${100 / images.length}%`;
        img.style.objectFit = 'cover';
    });

// Create dots(below website)
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

// slide functions of image 
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

// Set up buttons working
    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);

// Auto slide
    let slideInterval = setInterval(nextSlide, 3000);


// Pause hover if mouse on the image 
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderContainer.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 3000));

    

});
