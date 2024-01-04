let notesStore = [];
let selectedListItemIdentifier = undefined;

function render() {
    const notesParentNode = document.querySelector('#list');

    if (notesStore.length <= 0) {
        notesParentNode.innerHTML = 'Нет элементов!';

        return;
    }

    const notesElements = notesStore.map((element) => generateListItem(element));

    notesParentNode.innerHTML = '';
    notesParentNode.append(...notesElements);

    const inputElement = document.querySelector('#title');

    inputElement.value = '';
}

function generateListItem({ id, value, completed }) {
    const isSelectedItem = id === selectedListItemIdentifier;

    /**
     * List item
     */
    const listItemElement = document.createElement('li');
    listItemElement.className = `list-group-item d-flex justify-content-between align-items-center${
        isSelectedItem ? ' focusListsStyle' : ''
    }`;
    listItemElement.setAttribute('data-id', id);
    listItemElement.addEventListener('click', () => {
        if (id === selectedListItemIdentifier) {
            selectedListItemIdentifier = undefined;

            listItemElement.classList.remove('focusListsStyle');
        } else {
            selectedListItemIdentifier = id;

            const notesParentNode = document.querySelector('#list');

            notesParentNode.childNodes.forEach((node) => node.classList.remove('focusListsStyle'));

            listItemElement.classList.add('focusListsStyle');
        }
    });

    /**
     * Title
     */
    const title = document.createElement('span');
    title.classList.toggle('text-decoration-line-through', completed);
    title.textContent = value;

    /**
     * Toggle button
     */
    const toggleButton = document.createElement('button');
    toggleButton.className = 'btn btn-small btn-success myNewBtn';
    toggleButton.setAttribute('data-toggle', completed);
    toggleButton.textContent = '✓';
    toggleButton.classList.toggle('btn-warning', completed);
    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation();

        const targetId = event.target.closest('li').getAttribute('data-id');

        notesStore = notesStore.map((el) => {
            if (el.id === targetId) {
                return { ...el, completed: !el.completed };
            }

            return el;
        });

        render();
    });

    /**
     * Remove button
     */
    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-small btn-danger';
    removeButton.textContent = '×';
    removeButton.addEventListener('click', (event) => {
        const targetId = event.target.closest('li').getAttribute('data-id');
        const targetIndex = notesStore.findIndex((el) => el.id === targetId);

        notesStore.splice(targetIndex, 1);

        render();
    });

    /**
     * Mount
     */
    const buttonsContainer = document.createElement('div');

    buttonsContainer.appendChild(toggleButton);
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
