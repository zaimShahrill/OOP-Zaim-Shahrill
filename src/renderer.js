const { ipcRenderer } = require('electron');

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


// Function to display country details
function displayCountryDetails(country) {
    const countryDataDiv = document.getElementById('countryData');
    countryDataDiv.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Alternative Spellings:</strong> ${country.altSpellings.join(', ')}</p>
        <p><strong>Borders:</strong> ${country.borders.join(', ')}</p>
        <p><strong>Timezones:</strong> ${country.timezones.join(', ')}</p>
        <img src="${country.flags.png}" alt="Flag">
    `;
}


// Function to search for a country
async function searchCountry() {
    const countryInput = document.getElementById('countryInput').value.trim();
    if (!countryInput) {
        alert('Please enter a country name.');
        return;
    }

    const data = await fetchData();
    if (data) {
        const country = data.find(item => item.name.common.toLowerCase() === countryInput.toLowerCase());
        if (country) {
            displayCountryDetails(country);
            showMap(country);
        } else {
            alert('Country not found.');
        }
    }
}
