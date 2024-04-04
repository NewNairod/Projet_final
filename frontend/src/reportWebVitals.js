// Définit la fonction reportWebVitals qui prend en paramètre une fonction onPerfEntry
const reportWebVitals = onPerfEntry => {
  // Vérifie si onPerfEntry est défini et est une fonction
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Charge dynamiquement le module web-vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Appelle chaque fonction de mesure de performance avec onPerfEntry comme callback
      getCLS(onPerfEntry); // Cumulative Layout Shift (Décalage de la disposition cumulatif)
      getFID(onPerfEntry); // First Input Delay (Délai de la première interaction)
      getFCP(onPerfEntry); // First Contentful Paint (Première peinture du contenu)
      getLCP(onPerfEntry); // Largest Contentful Paint (Plus grande peinture de contenu)
      getTTFB(onPerfEntry); // Time to First Byte (Temps jusqu'au premier octet)
    });
  }
};

// Exporte la fonction reportWebVitals
export default reportWebVitals;