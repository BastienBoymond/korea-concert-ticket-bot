window.onclick = function(event) {
    const target = event.target;
    if (target.classList.contains("close")) {
        window.history.back();
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Wait for the DOM to be fully loaded

    // Get the form element
    const form = document.querySelector('form');

    // Add a submit event listener to the form
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Log a message to the console when the submit button is clicked
        console.log('Submit button clicked!');
        
        // Add additional code here if needed
    });
});