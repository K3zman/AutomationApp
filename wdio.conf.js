export const config = {
  runner: 'local',
  specs: ['./features/**/*.feature'],
  framework: 'cucumber',                           // usar Cucumber en WDIO
  reporters: [
    'spec',
    ['allure', { outputDir: 'allure-results', disableWebdriverScreenshotsReporting: false }]
  ],
  port: 4723,                                      // puerto por defecto de Appium
  services: [['appium', { logPath: './logs' }]],   // levanta Appium automáticamente
  maxInstances: 1,

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',          // o el nombre de tu dispositivo real
    // ---> Elige UNA de estas dos opciones:
    // Opción A: probar un APK local
    'appium:app': 'C:/Users/Kezman/Documents/QA_tester/Automation/apps/android/MatchPaw-0.23.9.apk',
    // Opción B (alternativa): abrir una app instalada
    // 'appium:appPackage': 'com.android.settings',
    // 'appium:appActivity': '.Settings',
    'appium:autoGrantPermissions': true
  }],

  cucumberOpts: {
    timeout: 60000,
    require: ['./steps/**/*.steps.js'],           // tus step definitions
    // puedes filtrar por tags con: --cucumberOpts.tags="@smoke"
  },

  // Captura un pantallazo si un paso falla -> se adjunta en Allure
  afterStep: async function (step, scenario, { error }) {
    if (error) await browser.takeScreenshot();
  }
}