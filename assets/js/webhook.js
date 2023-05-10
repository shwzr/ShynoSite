const form = document.getElementById('discord-form');
const previewContent = document.getElementById('preview-content');
const response = document.getElementById('response');

form.addEventListener('input', updatePreview);
form.addEventListener('submit', sendMessage);

function updatePreview(event) {
  const message = document.getElementById('message').value;
  previewContent.innerText = message || 'Pas de message à prévisualiser.';
}

function sendMessage(event) {
  event.preventDefault();

  const url = document.getElementById('webhook-url').value;
  const message = document.getElementById('message').value;

  const payload = {
    content: message
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      showResponse('success', 'Message envoyé !');
    } else {
      showResponse('error', 'Une erreur est survenue.');
    }
  })
  .catch(error => showResponse('error', error.message));

  updatePreview();
}

function showResponse(type, message) {
  response.className = type;
  response.innerText = message;
  response.classList.remove('hidden');
}

function hideResponse() {
  response.classList.add('hidden');
  response.innerText = '';
}
