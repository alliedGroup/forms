// Sheet URL ( Publish "Confrigation" Sheet As CSV File And use the CSV Link Here )
const sourceUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSS58IoBCM_4m7DohiC2UGYpPKjP1_YTpp0mIRWYfLQnZ-dWEvk-SfwMKABxElSbOUn3oq_3FYeuVBP/pub?gid=1246389069&single=true&output=csv';


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


// Fetch options for Enquiry Capture By
async function fetchDseName() {
    await fetchCsvData();
    const dseNames = [...new Set(csvData.slice(1).map(row => row[7].trim()).filter(Boolean))];
    populateDropdown('dseNameDropDown', dseNames);
}
fetchDseName();


// Fetch Option For  Model
async function fetchModelOptions() {
    await fetchCsvData();
    const modelOptions = [...new Set(csvData.slice(1).map(row => row[1].trim()).filter(Boolean))];
    populateDropdown('modelName', modelOptions);
}
fetchModelOptions();
async function fetchModelVariant() {
    await fetchCsvData();
    const modelOptions = [...new Set(csvData.slice(1).map(row => row[2].trim()).filter(Boolean))];
    populateDropdown('modelVariant', modelOptions);
}
fetchModelVariant();

// Fetch Option For Enquiry Model Color
async function fetchModelColorOptions() {
    await fetchCsvData();
    const modelOptions = [...new Set(csvData.slice(1).map(row => row[3].trim()).filter(Boolean))];
    populateDropdown('modelColor', modelOptions);
}
fetchModelColorOptions();


// Populate Dropdown Helper Function
function populateDropdown(dropdownId, options) {
    const selectElement = document.getElementById(dropdownId);
    selectElement.innerHTML = '<option value="">Select Option</option>';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

// Timestamp and Enquiry ID
function updateTimestamp() {
    const now = new Date();
    const timestamp = ("0" + now.getDate()).slice(-2) + "/" + ("0" + (now.getMonth() + 1)).slice(-2) + "/" + now.getFullYear() + " " + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
    document.getElementById("timestamp").value = timestamp;
}
setInterval(updateTimestamp, 1000);

document.getElementById("enquiryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    updateTimestamp();
});

// Exchnage Option (Show / Hide)
document.querySelectorAll('input[name="Exchange"]').forEach(radio => {
    radio.addEventListener("change", () => {
        document.getElementById("exchangeSection").style.display = radio.value === "Yes" ? "flex" : "none";
    });
});

// Reset Form
document.querySelector("#reset").addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.style.display = 'none');
});

// Reset Form
document.querySelector("#reset").addEventListener('click', ()=>{
    showroomDropdown.style.display = 'none';
    fieldDropdown.style.display = 'none';
    fieldLocation.style.display = 'none';
    digitalPromotionDropdown.style.display = 'none';
})

