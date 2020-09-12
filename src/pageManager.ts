import { Application } from "pixi.js";
import { MainPage } from "./mainPage";
import { MapPage } from "./mapPage";
import { MiddleDomePage } from "./middleDomePage";
import { Page } from "./page";
import { PersistentContainer } from "./persistentContainer";

export class PageManager {
    private app : Application;
    private currentPage? : Page;

    public mainPage! : MainPage;
    public mapPage! : MapPage;
    public middleDomePage! : MiddleDomePage;
    public persistentContainer! : PersistentContainer;

    public constructor(app : Application) {
        this.app = app;
    }

    public changePage(page : Page) {
        if (this.currentPage != undefined)
            this.app.stage.removeChild(this.currentPage.mainContainer);
            
        this.app.stage.addChild(page.mainContainer);
        this.app.renderer.backgroundColor = page.backgroundColour;
        this.currentPage = page;
    }
}
