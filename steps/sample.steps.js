import { Given, When, Then } from '@cucumber/cucumber';

Given('que abro la app', async () => {
  // WDIO arranca la sesión con Appium usando las capabilities del wdio.conf.js
});

When('espero un momento', async () => {
  await driver.pause(1000);
});

Then('la app está lista', async () => {
  // Aquí podrías validar algo real (actividad actual, un elemento, etc.)
  // Ejemplo simple:
  const pageSrc = await driver.getPageSource();
  if (!pageSrc || pageSrc.length === 0) {
    throw new Error('No se obtuvo el DOM/jerarquía de la pantalla');
  }
});