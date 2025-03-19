import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly welcomeTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeTitle = page.locator('.gl-font-size-h1');
    }
}