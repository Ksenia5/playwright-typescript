import { Locator, Page } from "@playwright/test";

export class SettingsPage {
    readonly page: Page;
    readonly advancedSection: Locator;
    readonly deleteProjectBtn: Locator;
    readonly confirmMessage: Locator;
    readonly confirmInputField: Locator;
    readonly confirmButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.advancedSection = page.locator('#js-project-advanced-settings .js-settings-toggle:has-text("Expand")')
        this.deleteProjectBtn = page.locator('text="Delete project"')
        this.confirmMessage = page.locator('.gl-white-space-pre-wrap')
        this.confirmInputField = page.locator('#confirm_name_input')
        this.confirmButton = page.locator('text="Yes, delete project"')
    }

    async deleteProject() {
        await this.advancedSection.scrollIntoViewIfNeeded();
        await this.advancedSection.click();
        await this.page.reload()
        await this.advancedSection.click();
        await this.deleteProjectBtn.scrollIntoViewIfNeeded();
        await this.deleteProjectBtn.dispatchEvent('click')
        const confirmText = await this.confirmMessage.textContent()
        await this.confirmInputField.fill(confirmText ?? '')
        // if (!confirmText) throw new Error('Confirmation text is null!');
        await this.confirmButton.click()
    }    
}
