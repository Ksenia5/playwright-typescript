import { expect, Locator, Page } from "@playwright/test";

export class CreateProjectPage  {
    readonly page: Page;
    readonly blankProject: Locator;
    readonly projectName: Locator;
    readonly createProjectBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.blankProject = page.locator("[href='#blank_project']");
        this.projectName = page.locator('//div[@id="blank-project-name"]//input[@id="project_name"]');
        this.createProjectBtn = page.locator('div[id="blank-project-pane"] input[name="commit"]')
    }

    async createEmptyProject() {
        await this.blankProject.click()
        await this.projectName.fill(`Test${Date.now()}`)
        await this.createProjectBtn.click()
    }
}