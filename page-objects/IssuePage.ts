import { Locator, Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class IssuePage {
    readonly page: Page;
    readonly issueDetailsPageBtn: Locator;
    readonly assigneeEdit: Locator;
    readonly assignee: Locator
    readonly issueNote: Locator;
    readonly commentButton: Locator;
    readonly closeIssueBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.issueDetailsPageBtn = page.locator('[class="js-prefetch-document"]')
        this.assigneeEdit = page.locator('[data-track-property="assignee"]')
        this.assignee = page.locator('[data-testid="expanded-assignee"]')
        this.issueNote = page.locator('#note-body')
        this.commentButton = page.locator('//span[normalize-space()="Comment"]')
        this.closeIssueBtn = page.locator('[data-qa-selector="close_issue_button"]')
    }

    async assignIssue(username: string) {
        await this.assigneeEdit.click()
        await this.page.getByText(username).click();
    }

    generateEstimate(): string {
        const mo = faker.number.int({ min: 0, max: 3 })
        const w = faker.number.int({ min: 0, max: 4 })
        const d = faker.number.int({ min: 0, max: 6 })
        const h = faker.number.int({ min: 0, max: 23 }) 
        const m = faker.number.int({ min: 0, max: 59 }) 
      
        return `${mo}mo ${w}w ${d}d ${h}h ${m}m`
    }
      
    async addEstimation() {
        const estimation = this.generateEstimate()
        await this.issueNote.fill(`/estimate ${estimation}`)
        await this.commentButton.click()
    }

    async trackTime() {
        const timeSpent = this.generateEstimate()
        await this.issueNote.fill(`/spend ${timeSpent}`)
        await this.commentButton.click()
    }
}