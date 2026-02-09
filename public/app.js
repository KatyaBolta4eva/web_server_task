document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    } else if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id;
        const noteElement = document.getElementById(`note-${id}`);
        const titleElement = noteElement.querySelector('.note-title');
        const currentTitle = titleElement.textContent;


        const newTitle = prompt('Enter new note title:', currentTitle);

        if (newTitle === null) return;

        if (newTitle.trim() === '') {
            alert('Note title cannot be empty!');
            return;
        }

        updateTitle(id, newTitle)
            .then(() => {
                titleElement.textContent = newTitle.trim();
            })
            .catch(error => {
                console.error('Error updating note:', error);
                alert('Error updating note. Please try again.');
                titleElement.textContent = currentTitle;
            });

    }
})

async function updateTitle(id, newTitle) {
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: newTitle.trim()
        })
    })
}

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}