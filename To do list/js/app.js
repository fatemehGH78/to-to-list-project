const itemTemplate = document.querySelector("#list-item-template");
const list = document.querySelector(".list-items > ul");

const items = [];

function storeItems() {
    localStorage.setItem('todo-list', JSON.stringify(items));
}

function loadItems() {
    let storeItems = localStorage.getItem('todo-list');
    if (!storeItems) {
        return [
            { title: 'Setup Repository', checked: false },
            { title: 'Design UI', checked: false },
            { title: 'Get Groceries', checked: false },
            { title: 'Automate', checked: false },
            { title: 'Wash Dishes', checked: false },
            { title: 'Setup Code', checked: false },
        ];
    }

    try {
        storeItems = JSON.parse(storeItems);
    }
    catch (e) {
        storeItems = []
    }

    return storeItems;
}

function displayItem(item) {
    items.push(item);

    const itemNode = itemTemplate.content.firstElementChild.cloneNode(true);

    const itemTitle = itemNode.querySelector('.list-item_title > *');
    itemTitle.innerText = item.title;

    if (item.checked) {
        itemNode.classList.add('checked');
    }

    itemNode.addEventListener('click', (e) => {
        item.checked = !item.checked;
        storeItems();
        if (item.checked) {
            itemNode.classList.add('checked');
        } else {
            itemNode.classList.remove('checked');
        }
    });
    
    list.appendChild(itemNode);
}

const addPanel = document.querySelector('.add-panel')
const addNavButton = document.querySelector('.navbar .add-button');
addNavButton.addEventListener('click', () => {
    addNavButton.classList.toggle('open');
    addPanel.classList.toggle('open')
})

const currentItems = loadItems();

currentItems.forEach((item) => {
    displayItem(item);
});