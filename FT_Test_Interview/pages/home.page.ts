import {expect, Page} from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    async homePageLanding() {
        const baseUrl = process.env.BASE_URL || 'https://www.ft.com/';
        await this.page.goto(baseUrl);
        // If there's a consent iframe, handle it
        // const iframeElement = await this.page.$(
        //     'iframe[title="SP Consent Message"]',
        // );
        // if (iframeElement) {
        //     const frame = await iframeElement.contentFrame();
        //     if (frame) {
        //         await frame
        //             .getByRole('button', {name: 'Accept Cookies'})
        //             .click();
        //     }
        // }
        await expect(this.page).toHaveTitle(/Wikipedia/i);
    }

    async search() {
        await this.page.locator('#searchInput').fill('Financial Times');
    }

    async searcValidation() {
        const searchResultList = this.page.locator('.suggestion-title').nth(0);
        await expect(searchResultList).toContainText('Financial Times');
        await searchResultList.click();
    }

    async header() {
        await this.page.locator('#firstHeading').isVisible();
    }

    async darkMode() {
        await this.page.getByRole('radio', {name: 'Dark'}).click();
        await this.page.locator('.skin-theme-clientpref-night').isVisible();
    }

    async editor() {
        const editorName = await this.page
            .getByRole('cell', {name: 'Roula Khalaf'})
            .getByRole('link');
        await expect(editorName).toBeVisible();
        await expect(editorName).toHaveAttribute('href', '/wiki/Roula_Khalaf');
        await editorName.click();
    }
    async closePopup() {
        const popup = this.page.getByRole('button', {name: 'Close banner'});
        if (await popup.isVisible()) {
            await popup.click();
        } else {
            await expect(popup).toBeHidden();
        }
    }

    async cookies() {
        const cookiesPopup = await this.page
            .locator('iframe[title="SP Consent Message"]')
            .contentFrame()
            .getByRole('button', {name: 'Accept Cookies'});
        if (await cookiesPopup.isVisible()) {
            await cookiesPopup.click();
        } else {
            await expect(cookiesPopup).toBeHidden();
        }
    }

    async clickSignUp() {
        this.page.getByTestId('header-top').getByTestId('Sign In').click();
    }

    async register() {
        await this.page.getByTestId('register').click();
        const registrationPage = this.page.locator('.register-access');
        await expect(
            this.page.getByRole('heading', {
                name: "Register for free access to the FT's award-winning journalism.",
                exact: true,
            }),
        ).toBeVisible();
        await this.page.getByTestId('field-terms').setChecked(true);
        await this.page.getByTestId('signup-with-email').click();
    }
}
