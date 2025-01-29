document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.getElementById("review-form");
    const reviewList = document.getElementById("review-list");
    const starsContainer = document.getElementById("stars-container");
    const reviewText = document.getElementById("review-text");
    let selectedRating = 0;

    function updateStars(rating) {
        const stars = starsContainer.querySelectorAll(".star");
        stars.forEach((star, index) => {
            star.style.color = index < rating ? "gold" : "#ccc";
        });
    }

    starsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("star")) {
            selectedRating = parseInt(event.target.dataset.value);
            updateStars(selectedRating);
        }
    });

    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (selectedRating === 0 || reviewText.value.trim() === "") {
            alert("Please select a star rating and enter a review.");
            return;
        }

        const reviewItem = document.createElement("div");
        reviewItem.classList.add("review-item");
        reviewItem.innerHTML = `
            <p class="stars">${"⭐".repeat(selectedRating)}</p>
            <p>${reviewText.value.trim()}</p>
        `;
        
        reviewList.prepend(reviewItem);
        
        reviewForm.reset();
        updateStars(0);
        selectedRating = 0;
    });
});
