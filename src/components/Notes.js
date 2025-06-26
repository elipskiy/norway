class Notes {
  constructor(notes, storage) {
    this.notes = notes;
    this.storage = storage;
    this.container = document.getElementById('notes-container');
  }

  render() {
    const container = this.container;
    container.innerHTML = '';
    this.notes.forEach((note, index) => {
      const div = document.createElement('div');
      div.className = 'note-bubble p-4';
      div.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <span class="font-medium text-primary">${note.author}</span>
        <span class="text-muted text-sm">${new Date(note.timestamp).toLocaleDateString()}</span>
      </div>
      <p class="text-primary">${note.text}</p>
      <button onclick="notesComponent.deleteNote(${index})" class="mt-2 text-red-600 hover:text-red-800 text-sm">Удалить</button>`;
      container.appendChild(div);
    });
  }

  addNote() {
    const input = document.getElementById('note-input');
    const text = input.value.trim();
    if (text) {
      this.notes.unshift({ text, author: 'Участник', timestamp: new Date() });
      input.value = '';
      this.render();
      this.storage.saveNotes(this.notes);
    }
  }

  addLocationNote(day, location) {
    const noteText = prompt(`Добавить заметку к "${location}":`);
    if (noteText && noteText.trim()) {
      this.notes.unshift({ text: `📍 ${location} (День ${day}): ${noteText.trim()}`, author: 'Участник', timestamp: new Date() });
      this.render();
      this.storage.saveNotes(this.notes);
      modalComponent.close();
    }
  }

  deleteNote(index) {
    if (confirm('Удалить эту заметку?')) {
      this.notes.splice(index, 1);
      this.render();
      this.storage.saveNotes(this.notes);
    }
  }
}

if (typeof module !== 'undefined') { module.exports = { Notes }; }
