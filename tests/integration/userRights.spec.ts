import { test, expect } from "@playwright/test"
import { LoginPage } from '../../page-objects/LoginPage'
import { homePageLink } from '../../support/helpers'
import { HomePage } from '../../page-objects/HomePage'
import { SignUpPage } from '../../page-objects/SignUpPage'
import { User } from '../../support/Models/User'
import { CreateProjectPage } from "../../page-objects/CreateProjectPage"
import { ProjectPage } from "../../page-objects/ProjectPage"
import { MembersPage } from "../../page-objects/MembersPage"
import { CreateIssuePage } from "../../page-objects/CreateIssuePage"
import { IssuePage } from "../../page-objects/IssuePage"
import { SettingsPage } from "../../page-objects/SettingsPage"
import * as fs from 'fs-extra';


test('Integration test for Gitlab user rights', async ({page, request}) => {
    let loginPage = new LoginPage(page)
    let signUpPage = new SignUpPage(page)
    let homePage = new HomePage(page)
    let createProjectPage = new CreateProjectPage(page)
    let projectPage = new ProjectPage(page)
    let membersPage = new MembersPage(page)
    let createIssuePage = new CreateIssuePage(page)
    let issuePage = new IssuePage(page)
    let settingsPage = new SettingsPage(page)
    const baseUrl = 'https://gitlab.testautomate.me/api/v4/'
    let projectId: string  
    const adminUser = User.newUser()
    const developerUser = User.newUser()
    await homePageLink(page) 

    await test.step('1: Register admin user via Gitlab UI', async () => {
        await loginPage.registerNowButton.click()
        adminUser.user_role = 'Systems Administrator';
        await fs.writeJson('resources/.auth/adminUserCreds.json', adminUser, { spaces: 2 });
        await signUpPage.signUp(adminUser.firstname, adminUser.lastname, adminUser.username, adminUser.useremail, adminUser.userpassword)
        await signUpPage.selectDropdownOptions(adminUser.user_role,adminUser.usage_reason)
        await expect(homePage.welcomeTitle).toBeVisible() 
    });

    await test.step('2: Create a project on UI', async () => {
        await homePage.createProject.click()
        await createProjectPage.createEmptyProject()
        await expect(projectPage.successMessage).toBeVisible()
        projectId = await projectPage.getProjectId()
    });
    
    await test.step('3: Check that project created on API level', async () => {       
        const projectResponse = await request.get(`${baseUrl}/projects/${projectId}`, {
            headers: {
                'Authorization': 'Bearer FKzy_BpV5wAybKf7Z9JX',
            }
        });
        expect(projectResponse.status()).toBe(200);
    });

    await test.step('4: Register developer user via Gitlab API', async () => {
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
    });

    await test.step('5: Add developer user as a member of the project and check developer user in the project member list', async () => {
        await projectPage.projectInformationNav.hover()
        await projectPage.members.click()
        await membersPage.inviteMembersBtn.click()
        await membersPage.inviteProjectMember(developerUser.username)
        await membersPage.checkMemberAdded()
    });

    // await test.step('Check developer user in the project member list', async () => {
    //     const projectResponse = await request.get(`${baseUrl}/projects/${projectId}/members/`, {
    //         headers: {
    //             'Authorization': 'Bearer FKzy_BpV5wAybKf7Z9JX',
    //         }
    //     });
    //     // expect((await projectResponse.json()).find(member => member.username === developerUser.username).username).toBe(developerUser.username);
    //     expect((await projectResponse.json()).some(member => member.username === developerUser.username)).toBe(true);
    // });

    await test.step('6: Create an issue and assign developer user to created issue', async () => {
        await projectPage.newIssueNavigation()
        await createIssuePage.createIssue()
        await issuePage.assignIssue(developerUser.username)
        await expect(issuePage.assignee).toContainText(`${developerUser.firstname}`);
    });
    
    await test.step('7: Logout', async () => {
        await projectPage.logout()
        await expect(page).toHaveURL('https://gitlab.testautomate.me/users/sign_in')
    });
    
    await test.step('8: Login as developer user', async () => {
        await loginPage.signIn(developerUser.username, developerUser.userpassword)
        await expect(projectPage.userDropdown).toBeVisible()
    });
    
    await test.step('9: Track time for the assigned issue', async () => {
        await projectPage.issueNav.click()
        await issuePage.issueDetailsPageBtn.click()
        await issuePage.addEstimation()
        await issuePage.trackTime()
    });
    
    await test.step('10: Close the issue', async () => {
        await issuePage.closeIssueBtn.click()
    });
    
    await test.step('11: Logout', async () => {
        await projectPage.logout()
        await expect(page).toHaveURL('https://gitlab.testautomate.me/users/sign_in')
    });
    
    await test.step('12: Login as admin user', async () => {
        await loginPage.signIn(adminUser.username, adminUser.userpassword)
        await expect(projectPage.userDropdown).toBeVisible()
    });

    await test.step('13: Close the project', async () => {
        await projectPage.projectDetailsPageBtn.click()
        await projectPage.settingNav.click()
        await settingsPage.deleteProject()
        await expect(projectPage.successMessage).toContainText(`Project '${adminUser.firstname} ${adminUser.lastname} / ${createProjectPage.projectName}' is in the process of being deleted.`)
    });
})