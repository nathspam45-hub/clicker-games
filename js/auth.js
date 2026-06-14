// Auth helpers minimalistes
function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (e) { return null; }
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function loginGuest() {
  const guest = { id: 'guest-' + Date.now(), name: 'Invité', avatar: null, guest: true };
  setUser(guest);
  window.location.href = 'game.html';
}

function loginDiscord() {
  // Priorité: si AppConfig.oauthUrl est défini, ouvrir directement cette URL
  if (AppConfig && AppConfig.oauthUrl) {
    window.open(AppConfig.oauthUrl, '_blank', 'width=500,height=700');
    return;
  }

  // si un Client ID est configuré, construire l'URL OAuth et rediriger
  if (AppConfig && AppConfig.clientId) {
    const params = new URLSearchParams({
      client_id: AppConfig.clientId,
      redirect_uri: AppConfig.redirectURI,
      response_type: 'code',
      scope: 'identify'
    });
    const url = 'https://discord.com/oauth2/authorize?' + params.toString();
    window.open(url, '_blank', 'width=500,height=700');
    return;
  }

  // sinon, ouvrir la modal de config pour que l'utilisateur entre son Client ID / Redirect
  document.getElementById('config-modal').style.display = 'flex';
  // préremplir les champs si possible
  const cfgRaw = localStorage.getItem('app_config');
  if (cfgRaw) {
    try {
      const cfg = JSON.parse(cfgRaw);
      document.getElementById('client-id-input').value = cfg.clientId || '';
      document.getElementById('redirect-input').value = cfg.redirectURI || '';
    } catch (e) {}
  }
}
