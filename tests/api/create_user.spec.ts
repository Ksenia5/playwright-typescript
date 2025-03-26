import { test, expect } from '@playwright/test'
import { User } from '../../support/Models/User'

test('Create user for signup', async ({ request }) => {
    const newUser = User.newUser();
    const createUser = await request.post('https://gitlab.testautomate.me/api/v4/users', {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer FKzy_BpV5wAybKf7Z9JX',
        },
        data: {
            "name": newUser.firstname,
            "lastname": newUser.lastname,
            "username": newUser.username,
            "email": newUser.useremail,
            "password": newUser.userpassword,
            "skip_confirmation": true
        }
    });
    expect(createUser.status()).toBe(201);
    const responseBody = await createUser.json();
    expect(responseBody.username).toBe(newUser.username);

    const getUser = await request.get(`https://gitlab.testautomate.me/api/v4/users/${responseBody.id}`, {
        headers: {
            'Authorization': 'Bearer FKzy_BpV5wAybKf7Z9JX',
        }
    });
    expect(getUser.status()).toBe(200);
});

