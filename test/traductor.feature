Feature: Traducción en Google Traductor

  Scenario: Traducir la palabra "lobo"
    Given que estoy en la página de Google Traductor
    When ingreso la palabra "lobo" en el campo de texto
    And hago clic en el botón de traducción
    Then se muestra la traducción en la pantalla
    And se almacena la traducción en el archivo "resultado.txt"
