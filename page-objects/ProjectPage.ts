import { Locator, Page } from "@playwright/test";

export class ProjectPage {
    readonly page: Page;
    readonly successMessage: Locator;
    readonly projectIdText: Locator;

    readonly projectDetailsPageBtn: Locator;
    readonly projectInformationNav: Locator;
    readonly members: Locator;
    readonly newActivityButton: Locator;
    readonly issueNav: Locator;
    readonly settingNav: Locator;

    readonly createNewIssueBtn: Locator;
    readonly userDropdown: Locator;
    readonly signOutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successMessage = page.locator('.flash-notice.mb-2')
        this.projectIdText = page.locator('.gl-display-inline-block.gl-vertical-align-middle');

        this.projectDetailsPageBtn = page.locator('.text-plain.js-prefetch-document')
        this.projectInformationNav = page.locator('[aria-label="Project information"]')
        this.members = page.locator('[aria-label="Members"]')
        this.newActivityButton = page.locator('#js-onboarding-new-project-link')
        this.issueNav = page.locator('[aria-label="Issues"]')
        this.createNewIssueBtn = page.locator('[data-track-action="click_link_new_issue"]')
        this.userDropdown = page.locator('.header-user-dropdown-toggle')
        this.signOutBtn = page.locator('.sign-out-link')
        this.settingNav = page.locator('[data-qa-menu-item="Settings"]')
    }

    async getProjectId() {
        return (await this.projectIdText.textContent())?.replace('Project ID: ', '').trim() ?? '';
    }

    async newIssueNavigation() {
        await this.newActivityButton.click()
        await this.createNewIssueBtn.click()
    }

    async logout() {
        await this.userDropdown.click()
        await this.signOutBtn.click()
    }
}