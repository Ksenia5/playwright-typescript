import { test, expect } from '@playwright/test'
import { User } from '../../support/Models/User'

test('Create user for signup', async ({ request }) => {
    const newUser = User.newUser();
    const response = await request.post('https://gitlab.testautomate.me/api/v4/users', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.API_KEY}`,
        },
        data: {
            name: newUser.firstname,
            lastname: newUser.lastname,
            username: newUser.username,
            email: newUser.useremail,
            password: newUser.userpassword,
            skip_confirmation: true
        }
    });
    expect(response.status()).toBe(201);
    expect((await response.json()).username).toBe(newUser.username);

    const getUser = await request.get(`https://gitlab.testautomate.me/api/v4/users/${(await response.json()).id}`, {
        headers: {
            'Authorization': `Bearer ${process.env.API_KEY}`,
        }
    });
    expect(getUser.status()).toBe(200);
});

