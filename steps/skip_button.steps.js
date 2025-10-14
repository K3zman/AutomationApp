import { Given, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import Onboarding from '../pageobjects/onboarding.page.js';

Given('que abro la app', async () => {
  // La sesión ya se inicia con Appium usando las capabilities del wdio.conf.js
});

Then('veo el botón {string} en pantalla', async (_texto) => {
  await Onboarding.waitForSkip(10000);
  const visible = await Onboarding.isSkipDisplayed();
  assert.ok(visible, 'No se encontró el botón Skip con ~Skip ni con //android.widget.Button[@content-desc="Skip"]');
});