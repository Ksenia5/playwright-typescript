import { Locator, Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class CreateIssuePage {
    readonly page: Page;
    readonly issueTitle: Locator;
    readonly issueDescription: Locator;
    readonly assigneeEdit: Locator;
    readonly createIssueBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.issueTitle = page.locator('#issue_title')
        this.issueDescription = page.locator('#issue_description');
        this.assigneeEdit = page.locator('[data-track-property="assignee"]')
        this.createIssueBtn = page.locator('[value="Create issue"]')
    }

    async createIssue() {
        await this.issueTitle.fill(faker.hacker.phrase())
        await this.issueDescription.fill(faker.lorem.paragraphs(2))
        await this.createIssueBtn.click();
    }
}