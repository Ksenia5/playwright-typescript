import { Locator, Page } from "@playwright/test";

export class CreateProjectPage  {
    readonly page: Page;
    readonly blankProject: Locator;
    readonly projectNameInput: Locator;
    readonly createProjectBtn: Locator;
    projectName = `Test${Date.now()}`

    constructor(page: Page) {
        this.page = page;
        this.blankProject = page.locator("[href='#blank_project']");
        this.projectNameInput = page.locator('//div[@id="blank-project-name"]//input[@id="project_name"]');
        this.createProjectBtn = page.locator('div[id="blank-project-pane"] input[name="commit"]')
    }

    async createEmptyProject() {
        await this.blankProject.click()
        await this.projectNameInput.fill(this.projectName)
        await this.createProjectBtn.click()
    }
}