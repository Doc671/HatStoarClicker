import { Application, Container } from "pixi.js";
import { PageManager } from "./pageManager";

export abstract class Page {
    public backgroundColour : number;
    public mainContainer! : Container;

    protected pageManager : PageManager;

    public constructor(backgroundColour: number, pageManager : PageManager) {
        this.backgroundColour = backgroundColour;
        this.pageManager = pageManager;
    }
}
