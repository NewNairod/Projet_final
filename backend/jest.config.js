const config = {
    // Indique à Jest de collecter la couverture de code des fichiers .js et .jsx dans le dossier src
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
  
    // Définit le répertoire où Jest doit stocker les rapports de couverture de code
    coverageDirectory: 'coverage',
  
    // Définit l'environnement de test à utiliser, ici JSDOM qui simule un DOM pour les tests
    testEnvironment: 'jsdom',
  
    // Chemin vers un script qui s'exécute après l'environnement de test est configuré mais avant les tests sont exécutés
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
    // Règles de transformation pour dire à Jest comment traiter les importations lors des tests
    "transform": {
      "^.+\\.js$": "babel-jest"
    },
  
    // Configuration de mappage des noms de modules pour les importations qui ne sont pas du JS
    moduleNameMapper: {
      // Fait correspondre les types de fichiers statiques à des stubs pour les simuler lors des tests
      '\\.(css|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
  
    // Liste des motifs à ignorer lors de la transformation
    transformIgnorePatterns: [
      // Ignore tous les modules dans node_modules sauf axios
      "/node_modules/(?!axios).+\\.js$",
      // Ignore les fichiers CSS modules qui ne doivent pas être transformés
      '^.+\\.module\\.(css|sass|scss)$',
    ],
  };
  export default config;