document.addEventListener("DOMContentLoaded", function (event) {
    // Select the test button using querySelector
    var testButton = document.querySelector('#test');
    
    // Add an event listener to the button for the click event
    testButton.addEventListener('click', function() {
        // Add alert("CLICKED!") in the listener
        alert("CLICKED!");
    });
    
    // Create a link element
    var createStudentLink = document.createElement('a');
    
    // Set the href attribute to /students/create
    createStudentLink.href = '/students/create';
    
    // Set the text content of the link
    createStudentLink.textContent = 'Create New Student';
    
    // Append the link to a suitable parent element in the DOM, such as the body
    document.body.appendChild(createStudentLink);
});