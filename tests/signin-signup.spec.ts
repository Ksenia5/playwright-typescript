import { test, expect } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { homePageLink } from '../support/helpers'
import { HomePage } from '../page-objects/HomePage'
import { SignUpPage } from '../page-objects/SignUpPage'

test.describe('SignIn Flow', () => {
    let loginPage: LoginPage
    let homePage: HomePage
    
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        await homePageLink(page)
    })

    test('Negative scenario with invalid creds', async ({page}) => {        
        await loginPage.signIn('invalid name', 'random password')
        await expect(loginPage.errorMessage).toContainText('Invalid login or password.')
    })

    test('Positive scenario for login', async ({page}) => {
        await loginPage.signIn('oksana_test1', 'Pwd4test!')
        await expect(homePage.welcomeTitleAfterLogin).toBeVisible()
    })
})

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
        const randomLastName = `Test_${Date.now()}`;
        const randomUserName = `user_${Date.now()}`;
        await signUpPage.signUp('Auto', randomLastName, randomUserName, 'auto_tests@gmail.com', 'Pwd4test!')
        await expect(homePage.welcomeTitleAfterSignUp).toBeVisible()
    })
})