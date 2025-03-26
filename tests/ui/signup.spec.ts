import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { homePageLink } from '../../support/helpers'
import { HomePage } from '../../page-objects/HomePage'
import { SignUpPage } from '../../page-objects/SignUpPage'
import { User } from '../../support/Models/User'
import * as fs from 'fs-extra';

test.describe('SignUp Flow', () => {
    let loginPage: LoginPage
    let signUpPage: SignUpPage
    let homePage: HomePage
    
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        signUpPage = new SignUpPage(page)
        homePage = new HomePage(page)
        await homePageLink(page)
        await loginPage.registerNowButton.click()
    })

    test('Positive scenario for signup', async ({page}) => {
        const randomUser = User.newUser();
        await fs.writeJson('resources/.auth/userCreds.json', randomUser, { spaces: 2 });
        await signUpPage.signUp(randomUser.firstname, randomUser.lastname, randomUser.username, randomUser.useremail, randomUser.userpassword)
        await signUpPage.selectDropdownOptions(randomUser.user_role,randomUser.usage_reason)
        await expect(homePage.welcomeTitle).toBeVisible()
    })
})