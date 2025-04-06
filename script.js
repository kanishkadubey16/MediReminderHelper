let medicines = [];

function addMedicine() {
  const name = document.getElementById('med-name').value;
  const time = document.getElementById('med-time').value;

  if (name && time) {
    const med = {
      name,
      time,
      lastRemindedDate: null, 
    };
    medicines.push(med);
    renderList();
    document.getElementById('med-name').value = '';
    document.getElementById('med-time').value = '';
  } else {
    alert("Please enter medicine name and time.");
  }
}

function renderList() {
  const list = document.getElementById('med-list');
  list.innerHTML = '';
  medicines.forEach((med, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${med.name} - ${med.time}</span>
      <div>
        <button onclick="editMedicine(${index})">Edit</button>
        <button onclick="deleteMedicine(${index})">Delete</button>
      </div>`;
    list.appendChild(li);
  });
}

function deleteMedicine(index) {
  medicines.splice(index, 1);
  renderList();
}

function editMedicine(index) {
  const med = medicines[index];
  const newName = prompt("Edit medicine name:", med.name);
  const newTime = prompt("Edit medicine time:", med.time);
  if (newName && newTime) {
    medicines[index] = {
      name: newName,
      time: newTime,
      lastRemindedDate: null, 
    };
    renderList();
  }
}

function monitorHealth() {
  speak("Monitoring your health now.");
}

function simulateFall() {
  speak("Alert! A fall has been detected. Assistance required.");
}

function dailyVoiceReminder() {
  speak("Remember to take your medicines and stay healthy!");
}

function speak(message) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(message);
  synth.speak(utter);
}


setInterval(() => {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  const today = now.toISOString().split("T")[0];

  medicines.forEach((med) => {
    if (med.time === currentTime && med.lastRemindedDate !== today) {
      speak(`Time to take your medicine: ${med.name}`);
      med.lastRemindedDate = today;
    }
  });
}, 1000);

