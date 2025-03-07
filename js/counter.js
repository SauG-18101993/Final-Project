$(document).ready(function() {
    // Counter animation function
    function startCounter() {
        $('.counter').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Start counter when the section comes into view
    var waypoint = new Waypoint({
        element: document.querySelector('.counter-section'),
        handler: function(direction) {
            if (direction === 'down') {
                startCounter();
                this.destroy();
            }
        },
        offset: '75%'
    });
});
$('button').click(function(){
         alert("Button clicked")
     })
     document.addEventListener('DOMContentLoaded', function() {
        const sliderTrack = document.querySelector('.slider-track');
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        let currentIndex = 0;
        let slideWidth;
        let slidesToShow;
    
        // Initialize slider
        function initSlider() {
            // Determine number of slides to show based on screen width
            if (window.innerWidth > 992) {
                slidesToShow = 3;
            } else if (window.innerWidth > 768) {
                slidesToShow = 2;
            } else {
                slidesToShow = 1;
            }
    
            // Calculate slide width
            slideWidth = sliderTrack.clientWidth / slidesToShow;
            
            // Set width for each slide
            slides.forEach(slide => {
                slide.style.minWidth = `${slideWidth}px`;
            });
    
            // Update slider position
            updateSliderPosition();
            updateButtons();
        }
    
        // Update slider position
        function updateSliderPosition() {
            const position = -currentIndex * slideWidth;
            sliderTrack.style.transform = `translateX(${position}px)`;
        }
    
        // Update button states
        function updateButtons() {
            prevBtn.classList.toggle('disabled', currentIndex === 0);
            nextBtn.classList.toggle('disabled', currentIndex >= slides.length - slidesToShow);
        }
    
        // Previous slide
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
                updateButtons();
            }
        });
    
        // Next slide
        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - slidesToShow) {
                currentIndex++;
                updateSliderPosition();
                updateButtons();
            }
        });
    
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
    
        sliderTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
    
        sliderTrack.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });
    
        sliderTrack.addEventListener('touchend', () => {
            const swipeDistance = touchStartX - touchEndX;
            const minSwipeDistance = 50;
    
            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0 && currentIndex < slides.length - slidesToShow) {
                    // Swipe left
                    nextBtn.click();
                } else if (swipeDistance < 0 && currentIndex > 0) {
                    // Swipe right
                    prevBtn.click();
                }
            }
        });
    
        // Auto play functionality
        let autoPlayInterval;
        const autoPlayDelay = 5000; // 5 seconds
    
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                if (currentIndex < slides.length - slidesToShow) {
                    nextBtn.click();
                } else {
                    // Reset to first slide
                    currentIndex = 0;
                    updateSliderPosition();
                    updateButtons();
                }
            }, autoPlayDelay);
        }
    
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
    
        // Start/Stop autoplay on hover
        const sliderContainer = document.querySelector('.travel-slider');
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                currentIndex = 0; // Reset position on resize
                initSlider();
            }, 250);
        });
    
        // Initialize slider on load
        initSlider();
        startAutoPlay();
    
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        });
    
        // Add smooth animation class after initial load
        setTimeout(() => {
            sliderTrack.style.transition = 'transform 0.5s ease';
        }, 100);
    
        // Handle button animations
        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'scale(0.95)';
            });
            
            btn.addEventListener('mouseup', () => {
                btn.style.transform = 'scale(1)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
            });
        });
    });
    