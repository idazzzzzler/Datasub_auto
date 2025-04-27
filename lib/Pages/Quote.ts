import { expect, Locator, Page } from "@playwright/test";

/**
 * Класс с описанием страницы раздела Quote
 */
export class QuotePage {
    readonly page: Page
    // Локаторы шапки страницы
    readonly headerNumber: Locator
    readonly headerEmail: Locator
    readonly headerTwitter: Locator
    readonly headerFacebook: Locator
    readonly headerLinkedin: Locator
    readonly headerInstagram: Locator
    readonly headerYoutube: Locator
    // Локаторы навигационного бара
    readonly navLogo: Locator
    readonly navHome: Locator
    readonly navAbout: Locator
    readonly navQuote: Locator
    readonly navContact: Locator
    readonly hHome: Locator
    readonly hQuote: Locator
    // Раздел формы
    readonly formName: Locator
    readonly formEmail: Locator
    readonly formService: Locator
    readonly formMessage: Locator
    readonly formSubmitBtn: Locator
    // Раздел с локаторами в футере страницы
    //...

    constructor(page: Page) {
        this.page = page,
        this.headerNumber = page.locator('small a[type="tel"]'),
        this.headerEmail = page.locator('small a[type="email"]'),
        this.headerTwitter = page.locator('.rounded-circle .fa-twitter'),
        this.headerFacebook = page.locator('.rounded-circle .fa-facebook-f'),
        this.headerLinkedin = page.locator('.rounded-circle .fa-linkedin-in'),
        this.headerInstagram = page.locator('.rounded-circle .fa-instagram'),
        this.headerYoutube = page.locator('.rounded-circle .fa-youtube'),
        this.navLogo = page.locator('.navbar h1', {hasText: 'Startup'}),
        this.navHome = page.locator('.navbar', {hasText:'Home'}),
        this.navAbout = page.locator('.navbar', {hasText: 'About'}),
        this.navQuote = page.locator('.navbar', {hasText: 'Quote'}),
        this.navContact = page.locator('.navbar', {hasText: 'Contact'}),
        this.hHome = page.locator('.bg-header', {hasText: 'Home'}),
        this.hQuote = page.locator('.bg-header', {hasText: 'Free Quote'}),
        this.formName = this.page.locator('#quoteForm #q_name'),
        this.formEmail = page.locator('#quoteForm #q_email'),
        this.formService = page.locator('#quoteForm #q_service'),
        this.formMessage = page.locator('#quoteForm #q_message'),
        this.formSubmitBtn = page.getByRole('button', {name: 'Request A Quote'})
    }

    /**
     * Функция для перехода на страницу Quote
     */
    async goToQuotePage(): Promise<void> {
        await this.page.goto('https://qatest.datasub.com/quote.html');
    }

    /**
     * Функция для заполнения поля `Name`
     * @param name - string
     */
    async fillName(name: string): Promise<void> {
        await this.formName.fill(name);
        await expect(this.formName).toHaveValue(name);
    }

    /**
     * Функция для заполнения поля `Email`
     * @param email - string
     */
    async fillEmail(email: string): Promise<void> {
        await this.formEmail.fill(email);
        await expect(this.formEmail).toHaveValue(email);
    }

    /**
     * Функция для заполнения поля `Servive`
     * @param option - string
     */
    async selectServiveOption(option: 'Select A Service' | 'Service 1' | 'Service 2' | 'Service 3'): Promise<void> {
        await this.formService.selectOption(option);
        expect(await this.formService.locator('option:checked').innerText()).toBe(option)
    }

    /**
     * Функция для заполнения поля `Message`
     * @param message - string 
     */
    async fillMessage(message: string): Promise<void> {
        await this.formMessage.fill(message);
        await expect(this.formMessage).toHaveValue(message);
    }
}