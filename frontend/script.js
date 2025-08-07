const itemsContainer = document.getElementById('items-container');
const addItemForm = document.getElementById('add-item-form');

const API_URL = 'http://localhost:5001';

// Function to fetch and display items
const getItems = async () => {
    const response = await fetch(`${API_URL}/items`);
    const items = await response.json();
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
};

// Event listeners
document.addEventListener('DOMContentLoaded', getItems);
addItemForm.addEventListener('submit', addItem);
