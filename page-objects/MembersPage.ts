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
        this.inviteMembersBtn = page.locator('[data-test-id="invite-members-button"]')
        this.gitlabMemberInput = page.locator('[data-qa-selector="members_token_select_input"]')
        this.roleInputField = page.locator('div[data-qa-selector="access_level_dropdown"]')
        this.inviteButton = page.locator('.js-modal-action-primary.btn-confirm.btn-md.gl-button')
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