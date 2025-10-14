// pageobjects/onboarding.page.js
class OnboardingPage {
  // Tu XPath solicitado
  get skipBtnXpath() { return $('//android.widget.Button[@content-desc="Skip"]'); }
  // Fallback recomendado (accessibility id)
  get skipBtnA11y() { return $('~Skip'); }

  async waitForSkip(timeout = 10000) {
    try {
      await this.skipBtnA11y.waitForDisplayed({ timeout });
    } catch {
      await this.skipBtnXpath.waitForDisplayed({ timeout });
    }
  }

  async isSkipDisplayed() {
    const a11y = await this.skipBtnA11y.isDisplayed().catch(() => false);
    if (a11y) return true;
    const xp = await this.skipBtnXpath.isDisplayed().catch(() => false);
    return xp;
  }
}

export default new OnboardingPage();