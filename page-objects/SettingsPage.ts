import { expect, Locator, Page } from "@playwright/test";

export class SettingsPage {
    readonly page: Page;
    readonly advancedSection: Locator;
    readonly deleteProjectBtn: Locator;
    readonly confirmMessage: Locator;
    readonly confirmInputField: Locator;
    readonly confirmButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.advancedSection = page.locator('#js-project-advanced-settings .js-settings-toggle:has-text("Advanced")')
        this.deleteProjectBtn = page.locator('text="Delete project"')
        this.confirmMessage = page.locator('.gl-white-space-pre-wrap')
        this.confirmInputField = page.locator('#confirm_name_input')
        this.confirmButton = page.locator('text="Yes, delete project"')
    }

    async deleteProject() {
        // if (await this.advancedSection.isVisible()) {
        //     await this.advancedSection.scrollIntoViewIfNeeded();
        //     await this.advancedSection.click({ force: true });
        // }
        await this.advancedSection.scrollIntoViewIfNeeded();
        // await this.page.mouse.move(0, 0);
        await this.advancedSection.click({ force: true });
        // await this.advancedSection.focus();
        // await this.page.keyboard.press('Enter');
        await this.deleteProjectBtn.scrollIntoViewIfNeeded();
        await this.deleteProjectBtn.click()
        const confirmText = await this.confirmMessage.textContent()
        await this.confirmInputField.fill(confirmText ?? '')
        // if (!confirmText) throw new Error('Confirmation text is null!');
        await this.confirmButton.click()
    }

    // async deleteProject() {
    //     // Prevent auto-scrolling by sticking to controlled actions only
    //     const expandBtn = this.advancedSection;
    //     await this.advancedSection.scrollIntoViewIfNeeded();
    
    //     // Manually expand using JS to prevent unwanted page movement
    //     await this.page.evaluate(() => {
    //         const el = document.querySelector('section[id="js-project-advanced-settings"] div[class="settings-header"] button[type="button"]');
    //         if (el) (el as HTMLElement).click();
    //     });
    
    //     // Wait for the section to actually expand (based on some content becoming visible)
    //     await this.page.waitForSelector('#js-project-advanced-settings:not(.collapsed)', {
    //         timeout: 3000
    //     });
    
    //     // Avoid scrolling: directly click using JS again or bounding box
    //     const deleteBtnBox = await this.deleteProjectBtn.boundingBox();
    //     if (deleteBtnBox) {
    //         await this.page.mouse.click(
    //             deleteBtnBox.x + deleteBtnBox.width / 2,
    //             deleteBtnBox.y + deleteBtnBox.height / 2
    //         );
    //     } else {
    //         await this.deleteProjectBtn.click({ force: true });
    //     }
    //     await this.confirmMessage.scrollIntoViewIfNeeded();
    //     const confirmText = await this.confirmMessage.textContent();
    //     if (!confirmText) throw new Error('Confirmation message not found.');
    //     await this.confirmInputField.fill(confirmText);
    //     await this.confirmButton.click();
    // }
    
    // async deleteProject() {
    //     if (await this.advancedSection.isVisible()) {
    //         const box = await this.advancedSection.boundingBox();
    //         if (box) {
    //             await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    //         } else {
    //             await this.advancedSection.click({ force: true });
    //         }
    //         await this.page.waitForSelector('#js-project-advanced-settings .settings-content', {
    //             state: 'visible',
    //             timeout: 3000
    //         });
    //     }
    //     await this.deleteProjectBtn.click()
    //     const confirmText = await this.confirmMessage.textContent()
    //     await this.confirmInputField.fill(confirmText ?? '')
    //     // if (!confirmText) throw new Error('Confirmation text is null!');
    //     await this.confirmButton.click()
    // }
    
}
