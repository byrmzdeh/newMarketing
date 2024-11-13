

//Counter
function animateCounter(counterElement, targetNumber, duration) {
    let startTime = null;

    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const currentNumber = Math.min((progress / duration) * targetNumber, targetNumber);

        counterElement.textContent = Math.floor(currentNumber) + "+";

        if (currentNumber < targetNumber) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const targetNumber = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // Adjust duration as needed
        animateCounter(counter, targetNumber, duration);
    });
});

