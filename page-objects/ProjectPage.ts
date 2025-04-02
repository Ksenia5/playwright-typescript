import { expect, Locator, Page } from "@playwright/test";

export class ProjectPage  {
    readonly page: Page;
    readonly successMessage: Locator;
    readonly projectIdText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successMessage = page.locator('.flash-notice.mb-2')
        this.projectIdText = page.locator('.gl-display-inline-block.gl-vertical-align-middle');
    }

    async getProjectId() {
        // const projectIdText = await this.projectIdText.textContent()
        return (await this.projectIdText.textContent())?.replace('Project ID: ', '').trim();
    }
}