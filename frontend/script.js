const itemsContainer = document.getElementById('items-container');
const addItemForm = document.getElementById('add-item-form');
const searchBar = document.getElementById('search-bar');

const API_URL = 'http://localhost:5001';

let allItems = [];

// Function to fetch and display items
const getItems = async () => {
    try {
        const response = await fetch(`${API_URL}/items`);
        allItems = await response.json();
        displayItems(allItems);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};

// Function to display items
const displayItems = (items) => {
    itemsContainer.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;
        itemsContainer.appendChild(itemElement);
    });
};

// Function to add a new item
const addItem = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    try {
        const response = await fetch(`${API_URL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });
        if (response.ok) {
            getItems();
            addItemForm.reset();
        }
    } catch (error) {
        console.error('Error adding item:', error);
    }
};

// Function to filter items based on search query
const filterItems = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredItems = allItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery)
    );
    displayItems(filteredItems);
};

// Event listeners
document.addEventListener('DOMContentLoaded', getItems);
addItemForm.addEventListener('submit', addItem);
searchBar.addEventListener('keyup', filterItems);
