import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly welcomeTitleAfterLogin: Locator;
    readonly welcomeTitleAfterSignUp: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeTitleAfterLogin = page.locator('.gl-font-size-h1');
        this.welcomeTitleAfterSignUp = page.locator('h2.gl-text-center');
    }
}