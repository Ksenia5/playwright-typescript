import { test, expect, request } from "@playwright/test"
import { LoginPage } from '../../page-objects/LoginPage'
import { homePageLink } from '../../support/helpers'
import { HomePage } from '../../page-objects/HomePage'
import { SignUpPage } from '../../page-objects/SignUpPage'
import { User } from '../../support/Models/User'
import { CreateProjectPage } from "../../page-objects/CreateProjectPage"
import { ProjectPage } from "../../page-objects/ProjectPage"
import * as fs from 'fs-extra';

test.describe('Integration test for Gitlab user rights', () => {
    let loginPage: LoginPage
    let signUpPage: SignUpPage
    let homePage: HomePage
    let createProjectPage: CreateProjectPage
    let projectPage: ProjectPage
    const baseUrl = 'https://gitlab.testautomate.me/api/v4/'

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        signUpPage = new SignUpPage(page)
        homePage = new HomePage(page)
        createProjectPage = new CreateProjectPage(page)
        projectPage = new ProjectPage(page)
        await homePageLink(page)
    })

    test.only('Project creation and modification using admin and developer users', async ({page, request}) => {

        // 1: Register 'admin' user via Gitlab 'UI'
        await loginPage.registerNowButton.click()
        const adminUser = User.newUser();
        adminUser.user_role = 'Systems Administrator';
        await fs.writeJson('resources/.auth/adminUserCreds.json', adminUser, { spaces: 2 });
        await signUpPage.signUp(adminUser.firstname, adminUser.lastname, adminUser.username, adminUser.useremail, adminUser.userpassword)
        await signUpPage.selectDropdownOptions(adminUser.user_role,adminUser.usage_reason)
        await expect(homePage.welcomeTitle).toBeVisible()

        // 2: Create a project on 'UI'
        await homePage.createProject.click()
        await createProjectPage.createEmptyProject()
        await expect(projectPage.successMessage).toBeVisible()
        const projectId = await projectPage.getProjectId()

        // 3: Check that project created on 'API' level
        const projectResponse = await request.get(`${baseUrl}/projects/${projectId}`, {
            headers: {
                'Authorization': 'Bearer FKzy_BpV5wAybKf7Z9JX',
            }
        });
        expect(projectResponse.status()).toBe(200);

        // 4: Register 'developer' user via Gitlab 'API'
        const developerUser = User.newUser();
        developerUser.user_role = 'Software Developer';
        const response = await request.post(`${baseUrl}/users`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer FKzy_BpV5wAybKf7Z9JX',
            },
            data: {
                name: developerUser.firstname,
                lastname: developerUser.lastname,
                username: developerUser.username,
                email: developerUser.useremail,
                password: developerUser.userpassword,
                skip_confirmation: true
            }
        });
        expect(response.status()).toBe(201);
        expect((await response.json()).username).toBe(developerUser.username);
        await fs.writeJson('resources/.auth/developerUserCreds.json', developerUser, { spaces: 2 });
        // 5: Add 'developer' user as a member of the project and check 'developer' user in the project member list
        
        // 6: Create an issue and assign 'developer' user to created issue

        // 7: Logout

        // 8: Login as 'developer' user

        // 9: Track time for the assigned issue

        // 10: Close the issue

        // 11: Logout

        // 12: Login as 'admin' user

        // 13: Close the project

    })
})