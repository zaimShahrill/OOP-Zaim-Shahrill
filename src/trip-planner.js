// Mock trip data (replace this with your actual data handling logic)
let trip = [];

// Function to add a country to the trip
function addCountry() {
    const addCountryForm = document.getElementById('addCountryForm');
    const countryName = addCountryForm.elements['countryName'].value.trim();
    if (countryName === '') {
        displayFeedback('addCountryFeedback', 'Please enter a country name.', 'error');
        return;
    }
    if (trip.includes(countryName)) {
        displayFeedback('addCountryFeedback', 'This country is already in your trip.', 'error');
        return;
    }
    trip.push(countryName);
    updateTrip();
    addCountryForm.reset();
}

// Function to remove a country from the trip
function removeCountry(countryName) {
    const index = trip.indexOf(countryName);
    if (index !== -1) {
        trip.splice(index, 1);
        updateTrip();
    } else {
        alert('Country not found in your trip.');
    }
}

// Function to edit a country in the trip
function editCountry() {
    const editCountryForm = document.getElementById('editCountryForm');
    const oldCountryName = editCountryForm.elements['oldCountryName'].value.trim();
    const newCountryName = editCountryForm.elements['newCountryName'].value.trim();
    if (oldCountryName === '' || newCountryName === '') {
        displayFeedback('editCountryFeedback', 'Please enter both old and new country names.', 'error');
        return;
    }
    const index = trip.indexOf(oldCountryName);
    if (index !== -1) {
        trip[index] = newCountryName;
        updateTrip();
        displayFeedback('editCountryFeedback', 'Country edited successfully.', 'success');
    } else {
        displayFeedback('editCountryFeedback', 'Country not found in your trip.', 'error');
    }
    editCountryForm.reset();
}

// Function to update the trip list display
function updateTrip() {
    updateTripList();
    updateChecklist();
}

// Function to update the trip list display
function updateTripList() {
    const tripListDiv = document.getElementById('tripList');
    tripListDiv.innerHTML = '';
    trip.forEach(country => {
        const countryItem = document.createElement('div');
        countryItem.textContent = country;
        tripListDiv.appendChild(countryItem);
    });
}

// Function to update the trip checklist
function updateChecklist() {
    const checklistItems = document.getElementById('checklistItems');
    checklistItems.innerHTML = ''; // Clear previous items
    trip.forEach(country => {
        const listItem = document.createElement('li');
        listItem.textContent = country;

        const removeButton = createButton('Remove', () => removeCountryFromChecklist(country));


        listItem.appendChild(removeButton);

        checklistItems.appendChild(listItem);
    });
}

// Function to create a button
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = onClick;
    return button;
}

// Function to remove a country from the trip checklist
function removeCountryFromChecklist(country) {
    removeCountry(country);
    updateTrip();
}

// Function to edit a country in the trip checklist
function editCountryFromChecklist(country) {
    const newCountryName = prompt(`Enter new name for ${country}:`);
    if (newCountryName && newCountryName.trim() !== '') {
        editCountry(country, newCountryName.trim());
    }
}

// Function to display feedback message
function displayFeedback(elementId, message, type) {
    const feedbackElement = document.getElementById(elementId);
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback ${type}`;
}

// Initial update of trip list and checklist
updateTrip();
