// Définition de la fonction checkToken qui vérifie si un token Discord est valide
function checkToken() {
  // Récupération de la valeur du champ input contenant le token
  const token = document.getElementById("tokenInput").value;

  // Envoi d'une requête à l'API de Discord pour récupérer les informations de l'utilisateur associé au token
  fetch("https://discord.com/api/v9/users/@me", {
    headers: {
      authorization: token, // Ajout du token dans les headers de la requête
    },
  })
    .then((response) => {
      // Si la requête retourne un code de statut 200 OK, cela signifie que le token est valide
      if (response.status === 200) {
        response.json().then((userData) => {
          // Récupération des informations de l'utilisateur dans la réponse JSON
          const avatarUrl = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
          const username = userData.username;
          const discriminator = userData.discriminator;

          // Affichage des informations de l'utilisateur dans la page HTML
          document.getElementById("result").innerHTML = `
            <div class="profile">
              <div class="avatar-wrapper">
                <img class="avatar" src="${avatarUrl}" alt="User Avatar">
              </div>
              <div class="user-info">
                <div class="username">${username}<span class="discriminator">#${discriminator}</span></div>
              </div>
            </div>
          `;
        });
      } else {
        // Si la requête retourne un autre code de statut, cela signifie que le token est invalide
        document.getElementById("result").innerHTML =
          '<span style="color: red;">Invalid token.</span>';
      }
    })
    .catch(() => {
      // Si la requête échoue pour une autre raison, affichage d'un message d'erreur
      document.getElementById("result").innerHTML =
        '<span style="color: red;">Error checking token. Please try again later.</span>';
    });
}

// Ajout d'un événement sur le formulaire pour intercepter sa soumission
document.getElementById("token-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Empêche le formulaire de se soumettre normalement
  checkToken(); // Appel de la fonction checkToken pour vérifier le token saisi
  document.getElementById("result").classList.remove("hidden"); // Affichage de la section contenant le résultat
});