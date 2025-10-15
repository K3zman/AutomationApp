export const config = {
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',
  framework: 'cucumber',
  services: ['appium'],

  specs: ['./features/**/*.feature'],
  cucumberOpts: {
    require: ['./steps/**/*.steps.js'],   // tus step definitions
    timeout: 60000
  },

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:udid': 'emulator-5554',
    'appium:app': 'C:/Users/Kezman/Documents/QA_tester/Automation/apps/android/MatchPaw-0.23.9.apk',
    'appium:autoGrantPermissions': true,
    'appium:noReset': true,
    'appium:newCommandTimeout': 120
  }]
}
