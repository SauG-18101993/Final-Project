document.addEventListener('DOMContentLoaded', function() {
    // Handle favorite button clicks
    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
            icon.style.color = icon.classList.contains('fas') ? '#ff6b6b' : '#666';
        });
    });

    // Handle filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.filter-section input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFilters);
    });

    // Clear all filters
    const clearAllBtn = document.querySelector('.btn-outline-secondary');
    clearAllBtn.addEventListener('click', function() {
        filterCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        updateFilters();
    });

    function updateFilters() {
        // Add your filter logic here
        console.log('Filters updated');
        // You can implement actual filtering based on the selected checkboxes
    }

    // Handle booking buttons
    const bookButtons = document.querySelectorAll('.btn-primary');
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const carTitle = this.closest('.card').querySelector('.card-title').textContent;
            alert(`Booking process started for ${carTitle}`);
            // Add your booking logic here
        });
    });

    // Pagination functionality
    const paginationLinks = document.querySelectorAll('.pagination .page-link');
    const carCards = document.querySelectorAll('.car-card');
    const cardsPerPage = 6; // Show 6 cards per page

    function showPage(pageNumber) {
        const startIndex = (pageNumber - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;

        // Hide all cards first
        carCards.forEach(card => card.parentElement.style.display = 'none');

        // Show only cards for current page
        for (let i = startIndex; i < endIndex && i < carCards.length; i++) {
            carCards[i].parentElement.style.display = 'block';
        }

        // Update active state of pagination buttons
        paginationLinks.forEach(link => {
            if (link.textContent === pageNumber.toString()) {
                link.parentElement.classList.add('active');
            } else {
                link.parentElement.classList.remove('active');
            }
        });

        // Update Previous/Next buttons
        const prevButton = document.querySelector('.pagination .page-item:first-child');
        const nextButton = document.querySelector('.pagination .page-item:last-child');

        prevButton.classList.toggle('disabled', pageNumber === 1);
        nextButton.classList.toggle('disabled', pageNumber === Math.ceil(carCards.length / cardsPerPage));
    }

    // Add click handlers to pagination links
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageText = this.textContent;
            
            if (pageText === 'Previous') {
                const currentPage = document.querySelector('.pagination .active').textContent;
                if (currentPage > 1) {
                    showPage(parseInt(currentPage) - 1);
                }
            } else if (pageText === 'Next') {
                const currentPage = document.querySelector('.pagination .active').textContent;
                const maxPages = Math.ceil(carCards.length / cardsPerPage);
                if (parseInt(currentPage) < maxPages) {
                    showPage(parseInt(currentPage) + 1);
                }
            } else {
                showPage(parseInt(pageText));
            }
        });
    });

    // Show first page by default
    showPage(1);
});
