import { Application } from "pixi.js";
import { Global } from "./global";
import { MainPage } from "./mainPage";
import { MapPage } from "./mapPage";
import { MiddleDomePage } from "./middleDomePage";
import { PageManager } from "./pageManager";
import { PersistentContainer } from "./persistentContainer";

let app : Application;

let pageManager : PageManager;

document.addEventListener("DOMContentLoaded", () => {
    // Set the title to the number of hats every 10 seconds
    setInterval(() => {
        document.title = `The Hat Stoar Clicker: ${Math.floor(Global.numberOfHats)} hats`;
    }, 10000);

    // Create window
    app = new Application({
        antialias: true,
        backgroundColor: 0xFFFFFF,
        resizeTo: window
    });
    document.body.appendChild(app.view);  
    
    pageManager = new PageManager(app);

    pageManager.mainPage = new MainPage(app, 0xFFFFFF, pageManager);
    pageManager.mapPage = new MapPage(app, 0x0ABF0A, pageManager);
    pageManager.middleDomePage = new MiddleDomePage(0x0080FF, pageManager);
    pageManager.persistentContainer = new PersistentContainer(app, pageManager);

    pageManager.changePage(pageManager.mainPage);
}, false);

// Change locations of containers when the window is resized
window.onresize = () => {
    pageManager.mainPage.hatSprite.height = window.innerHeight * 0.5;
    pageManager.mainPage.hatSprite.width = window.innerHeight * 0.32;
    pageManager.mainPage.hatSprite.position.set(window.innerWidth / 2, window.innerHeight / 2);
    pageManager.mainPage.flavourTextContainer.position.set(window.innerWidth / 2 - 350, window.innerHeight - 65);
    pageManager.mainPage.upgradeContainer.position.set(window.innerWidth - 345, -5);
    pageManager.mainPage.upgradeInfoContainer.position.set(window.innerWidth - 345, window.innerHeight - 95);

    pageManager.persistentContainer.mapButtonContainer.position.set(-5, window.innerHeight - 95);

    pageManager.mapPage.hatStoarImage.position.set(app.screen.width / 2, app.screen.height / 2);
};
