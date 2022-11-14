let backendHost;

const hostname = window && window.location && window.location.hostname;

backendHost = `http://${hostname}:8080`;

export const API_BASE_URL = `${backendHost}`;
