// Sheet URL (Publish "Configuration" Sheet as CSV File and use the CSV Link Here)
const sourceUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQdXUdGL6DN4CwP3mMVmUQv6M9ZCOshTjxIYKGynpPhnzTi8ZoV8_YEu-vEI72nS9Yf6ZnyaYOi48V8/pub?gid=326358480&single=true&output=csv';

// Store CSV data globally
let csvData = null;

// Fetch and store CSV data once
async function fetchCsvData() {
    if (!csvData) {
        try {
            const response = await fetch(sourceUrl);
            const data = await response.text();
            csvData = data.split('\n').map(row => row.split(','));
        } catch (error) {
            console.error('Error fetching CSV:', error);
        }
    }
}

// Predefined models array (empty)
let models = [];

// Fetch model options from the CSV data and store them
async function fetchModelOptions() {
    await fetchCsvData();
    // Extract models from CSV, ensuring uniqueness
    models = [...new Set(csvData.slice(1).map(row => row[0].trim()).filter(Boolean))];
}

// Fetch models on page load
document.addEventListener("DOMContentLoaded", async () => {
    await fetchModelOptions();
    console.log('Models fetched:', models);
});

// Get references to DOM elements
const modelContainer = document.getElementById("model-container");
const modelForm = document.getElementById("model-form");
const addedModelsDiv = document.getElementById("added-models");
const qtyField = document.getElementById("Qty"); // The field where the sum of all quantities will be displayed
const submitButton = document.getElementById("submitBtn"); // The submit button

// Fetch the predefined HTML structure from addModel.html and append it to the page
async function fetchModelHtml() {
    try {
        const response = await fetch('addModel.html');
        const htmlContent = await response.text();
        return htmlContent; // Return the HTML string
    } catch (error) {
        console.error('Error fetching addModel.html:', error);
    }
}

// Populate the model options into the dropdown
function populateModelDropdown(modelSelect) {
    // Clear existing options
    modelSelect.innerHTML = '<option value="">Select a model</option>'; // Optional default option

    // Add models to the dropdown
    models.forEach(model => {
        const option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });
}

// Add new model fields when the "Add Model" button is clicked
async function addModelVariant() {
    const modelHtml = await fetchModelHtml(); // Fetch the predefined HTML structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(modelHtml, 'text/html'); // Convert the HTML string into a document
    const modelGroup = doc.body.firstChild; // Get the first (and only) element of the HTML structure

    // Append the fetched model HTML to the container
    modelContainer.appendChild(modelGroup);

    // Now that the HTML is added, populate the model dropdown
    const modelSelect = modelGroup.querySelector('select'); // Get the select element
    if (models.length > 0) {
        populateModelDropdown(modelSelect); // Populate the dropdown immediately
    } else {
        // Set up an interval to check and populate the dropdown when models are loaded
        const interval = setInterval(() => {
            if (models.length > 0) {
                populateModelDropdown(modelSelect);
                clearInterval(interval); // Stop checking once the models are populated
            }
        }, 100); // Check every 100ms
    }
}

// Calculate the total quantity when form is submitted
function calculateTotalQuantity() {
    const quantities = document.querySelectorAll('input[name="Model Quantity[]"]');
    let totalQuantity = 0;
    quantities.forEach(quantityInput => {
        const quantity = parseFloat(quantityInput.value) || 0;
        totalQuantity += quantity;
    });
    return totalQuantity;
}

// Get current timestamp in the format YYYY-MM-DD HH:MM:SS
function getTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Handle form submission
modelForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    // Disable submit button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.textContent = "Please Wait..."; // Show "Please Wait..."

    const formData = new FormData(modelForm);
    const responseDiv = addedModelsDiv;

    // Collect values for model names and quantities
    const modelNames = formData.getAll('Model Name[]');
    const modelQuantities = formData.getAll('Model Quantity[]');

    // Join model names and quantities with commas
    const modelNameString = modelNames.join(", ");
    const modelQuantityString = modelQuantities.join(", ");

    // Add the processed data to the formData object
    formData.set('Model Name', modelNameString);
    formData.set('Model Quantity', modelQuantityString);

    // Calculate total quantity (Qty) and add it to the form data
    const totalQuantity = calculateTotalQuantity();
    formData.set('Qty', totalQuantity); // Set the "Qty" field in the formData

    // Add timestamp to the form data
    const timestamp = getTimestamp();
    formData.set('Timestamp', timestamp); // Set the "Timestamp" field

    // Submit data to Google Sheets using Google Apps Script URL
    const scriptUrl = "https://script.google.com/macros/s/AKfycbz8PR8P_syCdiI4MooIzSTw2sDz1M59d5WKChwKSeJTMm9qsIaqE3iAe_J4AGhRPr0T/exec";

    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            body: formData
        });

        const result = await response.text();
        responseDiv.textContent = "Data submitted successfully!";

        // Reset the form after submission
        modelForm.reset();
    } catch (error) {
        responseDiv.textContent = "Error submitting data!";
    } finally {
        // Re-enable the submit button and reset its text
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
    }
});
