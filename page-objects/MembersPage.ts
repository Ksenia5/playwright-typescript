import { expect, Locator, Page } from "@playwright/test";

export class MembersPage {
    readonly page: Page;
    readonly inviteMembersBtn: Locator;
    readonly gitlabMemberInput: Locator;
    readonly roleInputField: Locator;
    readonly inviteButton: Locator;
    readonly newMemberRole: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inviteMembersBtn = page.locator('.btn.btn-confirm.btn-md.gl-button.gl-mt-3.gl-sm-w-auto.gl-w-full.gl-sm-ml-3')
        this.gitlabMemberInput = page.locator('.gl-token-selector-input.gl-bg-none.gl-font-regular.gl-font-base.gl-line-height-normal.gl-px-1.gl-h-auto.gl-text-gray-900.gl-border-none.gl-outline-none.gl-flex-grow-1')
        this.roleInputField = page.locator('div[data-qa-selector="access_level_dropdown"]')
        this.inviteButton = page.locator('.btn.js-modal-action-primary.btn-confirm.btn-md.gl-button')
        this.newMemberRole = page.locator('span.gl-new-dropdown-button-text:has-text("Developer")')
    }

    async inviteProjectMember(username: string) {
        await this.gitlabMemberInput.fill(username)
        // await this.page.keyboard.press('Enter')
        // await this.page.locator('text=' + username).click()
        await this.page.getByText(username).click()
        await this.roleInputField.click()
        await this.page.getByText('Developer').click();
        await this.inviteButton.click()
    }

    async checkMemberAdded() {
        await this.page.reload().then(() => this.page.reload());
        await expect(this.newMemberRole).toBeVisible()
    }
}