const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

// Ruta del archivo resultado.txt
const resultadoFilePath = './resultado.txt';

// Función para esperar un elemento
async function waitForElement(driver, locator) {
  await driver.wait(until.elementLocated(locator));
  return driver.findElement(locator);
}

// Función principal
async function traducirPalabra() {
  // Inicializar el navegador
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Acceder a la página de Google Traductor
    await driver.get('https://translate.google.com/');

    // Esperar y hacer clic en el botón de cambio de idioma (identificador específico para el botón)
    const cambioIdiomaBtn = await waitForElement(driver, By.id('gt-sl-gms'));
    await cambioIdiomaBtn.click();

    // Esperar y seleccionar inglés como idioma de origen (identificador específico para el inglés)
    const idiomaInglesOption = await waitForElement(driver, By.css('#gt-sl-gms-menu .goog-menuitem:nth-child(1)'));
    await idiomaInglesOption.click();

    // Esperar y hacer clic en el botón de cambio de idioma de destino (identificador específico para el botón)
    const cambioIdiomaDestinoBtn = await waitForElement(driver, By.id('gt-tl-gms'));
    await cambioIdiomaDestinoBtn.click();

    // Esperar y seleccionar español como idioma de destino (identificador específico para el español)
    const idiomaEspanolOption = await waitForElement(driver, By.css('#gt-tl-gms-menu .goog-menuitem:nth-child(2)'));
    await idiomaEspanolOption.click();

    // Esperar y encontrar el campo de texto de entrada
    const inputField = await waitForElement(driver, By.id('source'));

    // Insertar la palabra "lobo" en el campo de texto
    await inputField.sendKeys('lobo');

    // Esperar y encontrar el elemento con la traducción
    const translationElement = await waitForElement(driver, By.css('.tlid-translation.translation'));

    // Obtener el texto de la traducción
    const translation = await translationElement.getText();

    // Escribir el resultado en el archivo resultado.txt
    fs.writeFileSync(resultadoFilePath, translation);
    console.log('La traducción se ha almacenado en resultado.txt');
  } catch (error) {
    console.error('Se produjo un error:', error);
  } finally {
    // Cerrar el navegador
    await driver.quit();
  }
}

// Ejecutar la función principal
traducirPalabra();
