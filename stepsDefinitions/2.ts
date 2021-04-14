import { browser, by, element, ElementFinder, ExpectedConditions } from "protractor";
import { BrowserHacks } from "../../support/browserHacks";

const defaultTimeout = browser.params.defaultTimeout;

export = function exampleSteps() {

    //Default cucumber timeout
    this.setDefaultTimeout(600 * 1000);

    //Loading browser hacks
    let browserHacks = new BrowserHacks;

    //Hooks
    this.Before(async () => {
        //ACTIONS BEFORE EXECUTING EACH TEST, I.E. SOME PRE-REQS FOR TEST OR SETUP
    });

    this.After(async () => {
        //ACTIONS AFTER EXECUTING EACH TEST, I.E. CLEANUP
        await browserHacks.ClearBrowserData();
    });

    //Step Definitions

    //Given expression, can only be used with Given in .feature file
    this.Given(/^I am on Baraholka page$/, async () => {
        browser.navigate().to("https://baraholka.onliner.by/");
    });

    this.Then(/^I search by Lopata request$/, async () => {
        let searching:ElementFinder = await element(by.css("i-p searchExample"));
        
        await browser.wait(ExpectedConditions.visibilityOf(searching), defaultTimeout, "Search Field wasn't loaded or has incorrect locator");
        await searching.sendKeys("лопата");
        await browser.sleep(3000);
    });

    this.Then(/^The Ads table appears$/, async () => {
        
        let listTable:ElementFinder = await element(by.css("ba-tbl-list__table"));
        await browser.wait(ExpectedConditions.visibilityOf(listTable), defaultTimeout, "The list table loaded or has incorrect locator");
    });


}

