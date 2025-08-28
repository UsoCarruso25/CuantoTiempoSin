let habits = JSON.parse(localStorage.getItem('habits')) || [];

function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

function renderHabits() {
  const list = document.getElementById('habitList');
  list.innerHTML = '';

  habits.forEach((habit, index) => {
    const div = document.createElement('div');
    div.className = 'habit';

    const timerDiv = document.createElement('div');
    timerDiv.className = 'timer';
    timerDiv.id = `timer-${index}`;

    div.innerHTML = `
      <div>
        <strong>${habit.name}</strong>
      </div>
      <button class="reset" onclick="resetHabit(${index})">Reiniciar</button>
    `;

    div.querySelector('div').appendChild(timerDiv);
    list.appendChild(div);
  });

  updateTimers();
}

function updateTimers() {
  habits.forEach((habit, index) => {
    const now = Date.now();
    const elapsed = now - habit.timestamp;

    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsed / 1000) % 60);

    const timerElement = document.getElementById(`timer-${index}`);
    if (timerElement) {
      timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    if (timerElement) {
  timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  // Animación "actualizado" rápida
  timerElement.classList.add('updated');
  setTimeout(() => {
    timerElement.classList.remove('updated');
  }, 500);
}

  });
}

function resetHabit(index) {
  habits[index].timestamp = Date.now();
  saveHabits();
  renderHabits();
}

document.getElementById('addForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('habitName').value.trim();
  if (name) {
    habits.push({ name, timestamp: Date.now() });
    saveHabits();
    renderHabits();
    document.getElementById('habitName').value = '';
  }
});

renderHabits();
setInterval(updateTimers, 1000);

// === FUNCIONALIDAD DE NOTAS POR FECHA ===

const datePicker = document.getElementById('datePicker');
const dailyNote = document.getElementById('dailyNote');
const saveNoteBtn = document.getElementById('saveNoteBtn');

datePicker.addEventListener('change', () => {
  const selectedDate = datePicker.value;
  const savedNotes = JSON.parse(localStorage.getItem('dailyNotes')) || {};
  dailyNote.value = savedNotes[selectedDate] || '';
});

saveNoteBtn.addEventListener('click', () => {
  const selectedDate = datePicker.value;
  const noteText = dailyNote.value.trim();

  if (!selectedDate) {
    alert('Selecciona una fecha antes de guardar.');
    return;
  }

  const savedNotes = JSON.parse(localStorage.getItem('dailyNotes')) || {};
  savedNotes[selectedDate] = noteText;
  localStorage.setItem('dailyNotes', JSON.stringify(savedNotes));

  alert('✅ Nota guardada correctamente.');
});
