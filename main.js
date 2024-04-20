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
    lines.forEach(function(line) {
        let itemsInLine = line.split(','); // Split the line by commas
        itemsInLine.forEach(function(item) {
            let trimmedItem = item.trim();
            if (trimmedItem !== "") {
                items.push(trimmedItem);
            }
        });
    });
    output.innerHTML = "Items added from file: " + items.length;
}


nitem.addEventListener('click', function(){
    var randomItem = items[Math.floor(Math.random() * items.length)]
    output.innerHTML = randomItem;
});

aitem.addEventListener('click', function(){
    // Get the value from the text field
    let inputText = textField.value.trim();

    // Check if the input is not empty
    if(inputText !== "") {
        // Split the input text by commas
        let newItems = inputText.split(",");

        // Add each item to the items array
        newItems.forEach(function(item) {
            let trimmedItem = item.trim();
            if (trimmedItem !== "") {
                items.push(trimmedItem);
            }
        });

        // Clear the text field
        textField.value = "";
        // Optionally, update the output to show the added items
        output.innerHTML = "Items added: " + newItems.join(", ");
    }
});
