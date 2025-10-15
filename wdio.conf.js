// wdio.conf.js (CommonJS, macOS)
const fs   = require('fs');
const path = require('path');

// Almacén local de extensiones Appium (evita líos de drivers entre máquinas)
process.env.APPIUM_HOME = process.env.APPIUM_HOME || path.resolve(__dirname, '.appium_home');

// Servidor Appium
const HOST      = '127.0.0.1';
const PORT      = parseInt(process.env.APPIUM_PORT || '4723', 10);
const BASE_PATH = process.env.APPIUM_BASE_PATH || '/';

// Dispositivo
const UDID        = process.env.UDID || 'emulator-5554';
const DEVICE_NAME = process.env.DEVICE_NAME || UDID;

// APK relativo (puedes sobreescribir con APP=apps/android/otro.apk)
const APK_PATH = process.env.APP
  ? path.resolve(__dirname, process.env.APP)
  : path.resolve(__dirname, 'apps/android/MatchPaw-0.23.9.apk');

if (!fs.existsSync(APK_PATH)) {
  console.warn(`[WDIO] ⚠️ APK no encontrado en: ${APK_PATH}`);
}

const capabilities = [{
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': DEVICE_NAME,
  'appium:udid': UDID,
  'appium:app': APK_PATH,
  'appium:autoGrantPermissions': true,
  'appium:noReset': true,
  'appium:newCommandTimeout': 120
}];

exports.config = {
  hostname: HOST,
  port: PORT,
  path: BASE_PATH,

  runner: 'local',
  maxInstances: 1,
  logLevel: process.env.WDIO_LOG_LEVEL || 'info',

  framework: 'cucumber',
  specs: ['./features/**/*.feature'],
  cucumberOpts: {
    require: ['./steps/**/*.steps.js'],
    timeout: 60000
  },

  reporters: [
    'spec',
    ['allure', { outputDir: 'allure-results', disableWebdriverScreenshotsReporting: false }]
  ],

  afterStep: async function (_step, _scenario, { error }) {
    if (error) await browser.takeScreenshot();
  },

  // Appium Service (usa el Appium local del proyecto)
  services: [[
    'appium',
    { logPath: path.resolve(__dirname, 'logs'), args: { basePath: BASE_PATH, port: PORT } }
  ]],

  capabilities,

  // (Opcional) reintentos de specs inestables
  specFileRetries: parseInt(process.env.SPEC_RETRIES || '0', 10),
  specFileRetriesDeferred: true,
  specFileRetriesDelay: 0
};
