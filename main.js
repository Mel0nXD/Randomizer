let nitem = document.getElementById('new-item');
let aitem = document.getElementById('add-item');
let output = document.getElementById('output');
let textField = document.getElementById('text-field');
let items = [];

// Function to handle file upload
document.getElementById('upload-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    let file = document.getElementById('myFile').files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
        let fileContent = event.target.result;
        addItemsFromFile(fileContent);
    };

    reader.readAsText(file);
});

function addItemsFromFile(fileContent) {
    let lines = fileContent.split('\n');
    let itemsFromUpload = [];
    lines.forEach(function(line) {
        let itemsInLine = line.split(','); // Split the line by commas
        itemsInLine.forEach(function(item) {
            let trimmedItem = item.trim();
            if (trimmedItem !== "") {
                itemsFromUpload.push(trimmedItem);
            }
        });
    });

    let inputText = textField.value.trim();
    let newItems = [];
    if (inputText !== "") {
        newItems = inputText.split(",");
    }

    items = [...newItems, ...itemsFromUpload]; // Concatenate items from text field and file
    output.innerHTML = items.map(item => '<span class="bubble">' + item + '</span>').join('');
}


nitem.addEventListener('click', function(){
    if (items.length > 0) {
        var iterations = (items.length * 2); // Number of iterations for spinning
        var currentIndex = 0; // Index to start from
        var interval = setInterval(function() {
            output.innerHTML = items.map((item, index) => {
                if (index === currentIndex) {
                    return '<span class="bubble glow">' + item + '</span>';
                } else {
                    return '<span class="bubble">' + item + '</span>';
                }
            }).join('');
            
            currentIndex = (currentIndex + 1) % items.length; // Move to the next item
            iterations--;

            var audio = new Audio('spin-1.mp3');
            audio.play();

            if (iterations === 0) {
                clearInterval(interval); // Stop spinning
                var randomIndex = Math.floor(Math.random() * items.length);
                output.innerHTML = items.map((item, index) => {
                    if (index === randomIndex) {
                        return '<span class="bubble glow">' + item + '</span>';
                    } else {
                        return '<span class="bubble">' + item + '</span>';
                    }
                }).join('');
            }
        }, 200); // Time interval for each iteration
    } else {
        output.innerHTML = "No items added.";
    }
});


// Update the event listener for the text field to listen for input changes
textField.addEventListener('input', function() {
    // Get the value from the text field
    let inputText = textField.value.trim();

    // Check if the input is not empty
    if(inputText !== "") {
        // Split the input text by commas
        let newItems = inputText.split(",");

        // Clear the items array
        items = [];

        // Add each item to the items array
        newItems.forEach(function(item) {
            let trimmedItem = item.trim();
            if (trimmedItem !== "") {
                items.push(trimmedItem);
            }
        });

        // Optionally, update the output to show the added items
        let itemsHTML = newItems.map(item => '<span class="bubble">' + item.trim() + '</span>').join('');
        output.innerHTML = itemsHTML;
    } else {
        output.innerHTML = "No items added.";
    }
});
