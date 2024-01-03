let notesStore = [];

function render() {
    const notesParentNode = document.querySelector('#list');

    if (notesStore.length <= 0) {
        notesParentNode.innerHTML = 'Нет элементов!';

        return;
    }

    const notesElements = notesStore.map(({ id, value }) => generateListItem(id, value));

    notesParentNode.innerHTML = '';
    notesParentNode.append(...notesElements);

    const inputElement = document.querySelector('#title');

    inputElement.value = '';
}

function generateListItem(id, value) {
    const listItemElement = document.createElement('li');
    listItemElement.className = 'list-group-item d-flex justify-content-between align-items-center';
    listItemElement.setAttribute('data-id', id);

    const title = document.createElement('span');
    title.textContent = value;

    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-small btn-danger';
    removeButton.textContent = '×';
    removeButton.addEventListener('click', (event) => {
        const targetId = event.target.closest('li').getAttribute('data-id');
        const targetIndex = notesStore.findIndex((el) => el.id === targetId);

        notesStore.splice(targetIndex, 1);

        render();
    });

    const buttonsContainer = document.createElement('div');

    buttonsContainer.appendChild(removeButton);

    listItemElement.appendChild(title);
    listItemElement.appendChild(buttonsContainer);

    return listItemElement;
}

function addNoteActionHandler() {
    const inputElement = document.querySelector('#title');

    if (inputElement.value.length === 0) return;

    notesStore.push({
        id: crypto.randomUUID(),
        value: inputElement.value,
        completed: false,
    });

    render();
}

document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.querySelector('#title');
    const createButton = document.querySelector('#create');

    createButton.addEventListener('click', addNoteActionHandler);
    inputElement.focus();
    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') addNoteActionHandler();
    });

    render();
});
