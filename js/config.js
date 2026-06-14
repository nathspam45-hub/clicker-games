// Configuration simple pour l'exemple
// Note: `redirectURI` par défaut utilise l'origine actuelle + '/game.html'.
// Quand vous hébergerez sur GitHub Pages, assurez-vous d'ajouter
// https://<votre-utilisateur>.github.io/clicker-games/game.html comme Redirect URI
// dans le portail Discord et/ou définissez `AppConfig.oauthUrl` avec l'URL OAuth complète.
const AppConfig = {
  clientId: null, // mettre ton Discord Client ID ici pour activer OAuth
  // Par défaut on utilise l'origine courante — pratique pour GitHub Pages
  redirectURI: (typeof window !== 'undefined' && window.location && window.location.origin)
    ? window.location.origin + '/game.html'
    : 'http://localhost/game.html',
  // Si vous voulez forcer une URL OAuth complète, définissez-la ici (ex: l'URL fournie)
  oauthUrl: 'https://nathspam45-hub.github.io/clicker-games/game.html'
};

// Si l'utilisateur a fourni une URL OAuth complète (ou pas), construire
// une URL par défaut basée sur l'URL que vous avez fournie et
// remplacer dynamiquement le `redirect_uri` par l'origine courante.
if (!AppConfig.oauthUrl) {
  try {
    const redirect = encodeURIComponent(AppConfig.redirectURI);
    AppConfig.oauthUrl = `https://discord.com/oauth2/authorize?client_id=1391068973986222162&permissions=8192&response_type=code&redirect_uri=${redirect}&integration_type=0&scope=bot+guilds.channels.read`;
  } catch (e) {
    AppConfig.oauthUrl = null;
  }
}

function saveConfig() {
  const id = document.getElementById('client-id-input').value.trim();
  const redirect = document.getElementById('redirect-input').value.trim();
  AppConfig.clientId = id || null;
  AppConfig.redirectURI = redirect || AppConfig.redirectURI;
  localStorage.setItem('app_config', JSON.stringify(AppConfig));
  alert('Configuration sauvegardée.');
}

function loadConfig() {
  try {
    const raw = localStorage.getItem('app_config');
    if (!raw) return;
    const obj = JSON.parse(raw);
    AppConfig.clientId = obj.clientId || AppConfig.clientId;
    AppConfig.redirectURI = obj.redirectURI || AppConfig.redirectURI;
  } catch (e) {
    console.warn('Config load failed', e);
  }
}

loadConfig();
