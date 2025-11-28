// Sheet URL (Publish "Configuration" Sheet As CSV File)
const sourceUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQdXUdGL6DN4CwP3mMVmUQv6M9ZCOshTjxIYKGynpPhnzTi8ZoV8_YEu-vEI72nS9Yf6ZnyaYOi48V8/pub?gid=326358480&single=true&output=csv';

// Store CSV data globally
let csvData = null;

// Fetch and cache CSV data (stale-while-revalidate)
async function fetchCsvData() {
    const cacheKey = "csvCache";

    // 1️⃣ Load from localStorage first
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        csvData = JSON.parse(cachedData);
        populateAllDropdowns(); // populate dropdowns instantly from cache
    }

    // 2️⃣ Fetch fresh CSV in background
    try {
        const response = await fetch(sourceUrl);
        const data = await response.text();
        const freshData = data.split('\n').map(row => row.split(','));

        // Update global variable and localStorage
        csvData = freshData;
        localStorage.setItem(cacheKey, JSON.stringify(freshData));

        // Optional: update dropdowns after fresh fetch
        // populateAllDropdowns();
    } catch (error) {
        console.error('Error fetching CSV:', error);
    }
}

// Populate all dropdowns
function populateAllDropdowns() {
    if (!csvData) return;

    // Capture By
    const captureByOptions = [...new Set(csvData.slice(1).map(row => row[6].trim()).filter(Boolean))];
    populateDropdown('captureByDropDown', captureByOptions);

    // Allocated To
    const allocatedToOptions = [...new Set(csvData.slice(1).map(row => row[6].trim()).filter(Boolean))];
    populateDropdown('allocatedToDropDown', allocatedToOptions);

    // Model Name
    const modelOptions = [...new Set(csvData.slice(1).map(row => row[1].trim()).filter(Boolean))];
    populateDropdown('modelName', modelOptions);

    // Model Color
    const modelColorOptions = [...new Set(csvData.slice(1).map(row => row[2].trim()).filter(Boolean))];
    populateDropdown('modelColor', modelColorOptions);

    // Occupation
    const occupationOptions = [...new Set(csvData.slice(1).map(row => row[7].trim()).filter(Boolean))];
    populateDropdown('Occupation', occupationOptions);
}

// Generic dropdown populate helper
function populateDropdown(dropdownId, options) {
    const selectElement = document.getElementById(dropdownId);
    if (!selectElement) return;
    // Stop re-rendering if already populated
    if (selectElement.options.length > 1) return;
    selectElement.innerHTML = '<option value="">Select Option</option>';
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}

// Enquiry Source Event Handling
const showroomDropdown = document.getElementById('showroomDropdown');
const fieldDropdown = document.getElementById('fieldDropdown');
const fieldLocation = document.getElementById('fieldLocation');
const digitalPromotionDropdown = document.getElementById('digitalPromotionDropdown');

document.querySelectorAll('input[name="Enquiry Source"]').forEach((radio) => {
    radio.addEventListener('change', async (event) => {
       if (!csvData) await fetchCsvData(); // ensure fresh CSV data is available
        switch (event.target.id) {
            case 'Showroom':
                handleEnquirySource(3, showroomDropdown, 'Showroom Enquiry Type');
                fieldDropdown.style.display = "none";
                fieldLocation.style.display = "none";
                digitalPromotionDropdown.style.display = "none";
                break;
            case 'Field':
                handleEnquirySource(4, fieldDropdown, 'Field Promotion Activity Type');
                fieldLocation.style.display = "block";
                showroomDropdown.style.display = "none";
                digitalPromotionDropdown.style.display = "none";
                break;
            case 'DigitalPromotion':
                handleEnquirySource(5, digitalPromotionDropdown, 'Digital Promotion Enquiry Source');
                showroomDropdown.style.display = "none";
                fieldLocation.style.display = "none";
                fieldDropdown.style.display = "none";
                break;
        }
    });
});

function handleEnquirySource(columnIndex, dropdownElement, nameAttribute) {
    document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.style.display = 'none');
    dropdownElement.innerHTML = '<option value="">Select Source</option>';
    const options = [...new Set(csvData.slice(1).map(row => row[columnIndex].trim()).filter(Boolean))];
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        dropdownElement.appendChild(optionElement);
    });
    dropdownElement.style.display = 'block';
    dropdownElement.setAttribute('name', nameAttribute);
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

// Exchange Option (Show / Hide)
document.querySelectorAll('input[name="Exchange"]').forEach(radio => {
    radio.addEventListener("change", () => {
        document.getElementById("exchangeSection").style.display = radio.value === "Yes" ? "flex" : "none";
    });
});

// Reset Form
document.querySelector("#reset").addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.style.display = 'none');
    showroomDropdown.style.display = 'none';
    fieldDropdown.style.display = 'none';
    fieldLocation.style.display = 'none';
    digitalPromotionDropdown.style.display = 'none';
});

// Extract URL parameters
const urlParams = new URLSearchParams(window.location.search);
document.getElementById("name").value = urlParams.get("name") || "";
document.getElementById("email").value = urlParams.get("email") || "";
document.getElementById("address").value = urlParams.get("address") || "";
document.getElementById("zip").value = urlParams.get("pincode") || "";
document.getElementById("phone").value = urlParams.get("phone") || "";
document.getElementById("exModel").value = urlParams.get("exModel") || "";
document.getElementById("exMake").value = urlParams.get("exMake") || "";
document.getElementById("exRegNo").value = urlParams.get("exRegNo") || "";
document.getElementById("exYearPurchase").value = urlParams.get("exYearPurchase") || "";
document.getElementById("exKmRun").value = urlParams.get("exKmRun") || "";
document.getElementById("exExpected").value = urlParams.get("exExpected") || "";

// Select "Yes" or "No" for the Exchange radio button
const exchangeValue = urlParams.get("exchange");
if (exchangeValue === "Yes") {
  document.getElementById("exchangeYes").checked = true;
  document.getElementById("exchangeSection").style.display = "flex";
} else if (exchangeValue === "No") {
  document.getElementById("exchangeNo").checked = true;
  document.getElementById("exchangeSection").style.display = "none";
}

// Initial fetch to populate dropdowns from cache or CSV
fetchCsvData();
