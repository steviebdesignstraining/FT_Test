import {test} from '@playwright/test';

import {HomePage} from '../pages/home.page';

test.describe.serial('Main Page', () => {
    test.beforeEach(async ({page, context}) => {
        await context.clearCookies();
        const homePage = new HomePage(page);
        await homePage.homePageLanding();
    });

    test('Seach for Financial Times via Wikepedia', async ({page}) => {
        const homePageInstance = new HomePage(page);
        await homePageInstance.search();
        await homePageInstance.searcValidation();
        await homePageInstance.header();
    });

    test('Change theme to dark mode', async ({page}) => {
        const homePageInstance = new HomePage(page);
        await homePageInstance.search();
        await homePageInstance.searcValidation();
        await homePageInstance.header();
        await homePageInstance.darkMode();
    });

    test('Locate editor name and validate name is hyperlinked', async ({
        page,
    }) => {
        const homePageInstance = new HomePage(page);
        await homePageInstance.search();
        await homePageInstance.searcValidation();
        await homePageInstance.header();
        await homePageInstance.editor();
    });
});
