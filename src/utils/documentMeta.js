export const updateDocumentMeta = () => {
  document.title = 'Gazelle Masters - Chess Excellence';

  // Update favicon
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = '/favicon-gm.ico'; // Make sure to add this favicon to your public folder
  }
};