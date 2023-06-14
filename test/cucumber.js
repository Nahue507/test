import cucumber, { setWorldConstructor, defineSupportCode } from 'cucumber';

setWorldConstructor(function() {
  // Configuración adicional si es necesario
});

defineSupportCode(function({ Given, When, Then }) {
  // Importar los pasos definidos en traductor.steps.js
  require('./traductor.steps.js');

  // Otros pasos si es necesario
});

export default cucumber;
  