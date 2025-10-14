@smoke
Feature: Validar botón Skip al abrir la app

  Scenario: La app muestra el botón Skip en el onboarding
    Given que abro la app
    Then veo el botón "Skip" en pantalla