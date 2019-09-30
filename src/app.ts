import { Application, Container, Graphics, Sprite, Text } from "pixi.js";
import { Global } from "./global";

enum PageType {
    Main,
    Map
}

let app : Application;

let mainContainer : Container;
let hatSprite : Sprite;
let hatsIndicator : Text;
let hatsPerClickIndicator : Text;
let flavourTextContainer : Container;
let upgradeContainer : Container;
let upgradeInfoContainer : Container;

let mapContainer : Container;

const indicatorTextStyle = {
    fontFamily: "Corbel",
    fontSize: 32,
    fill: 0x000000
};

document.addEventListener("DOMContentLoaded", () => {
    // Set the title to the number of hats every 10 seconds
    setInterval(() => {
        document.title = `The Hat Stoar Clicker: ${Global.numberOfHats} hats`;
    }, 10000);

    // Create window
    app = new Application({
        antialias: true,
        backgroundColor: 0xFFFFFF,
        resizeTo: window
    });
    document.body.appendChild(app.view);    

    initialiseMainPage();
}, false);

function changePage(pageType : PageType) : void
{
    switch (pageType) {
        case PageType.Main:
            app.renderer.backgroundColor = 0xFFFFFF;
            app.stage.removeChild(mapContainer);
            app.stage.addChild(mainContainer);
            break;
        case PageType.Map:
            app.renderer.backgroundColor = 0x0ABF0A;
            app.stage.removeChild(mainContainer);
            app.stage.addChild(mapContainer);
            break;
    }
}

/**
* Draws a rectangle with the given arguments and returns it.
* @param x The X co-ord of the top-left of the rectangle.
* @param y The Y co-ord of the top-left of the rectangle.
* @param width The width of the rectangle.
* @param height The height of the rectangle.
* @param fillColor The color of the fill.
* @param lineWidth The width of the rectangle border line.
* @param lineColor The color of the rectangle border line.
* @param lineAlpha The alpha of the rectangle border line.
* @returns The Graphics object.
*/
function drawRectangle(x : number, y : number, width : number, height : number,
    fillColor : number, lineWidth? : number | undefined, lineColor? : number | undefined, 
    lineAlpha? : number | undefined) : Graphics {
    const rectangle = new Graphics();
    rectangle.lineStyle(lineWidth, lineColor, lineAlpha);
    rectangle.beginFill(fillColor);
    rectangle.drawRect(x, y, width, height);
    rectangle.endFill();
    return rectangle;
}

function initialiseMainPage() : void {
    // Create stat container & stat elements
    const statContainer = new Container();

    const statRectangle = drawRectangle(-5, -5, 350, 100, 0xAAAAAA, 10, 0x000000, 1);
    statContainer.addChild(statRectangle);

    hatsIndicator = new Text(`Hats: ${Global.numberOfHats}`, indicatorTextStyle);
    hatsIndicator.position.set(10, 10);
    statContainer.addChild(hatsIndicator);

    hatsPerClickIndicator = new Text(`Hats per click: ${Global.hatsPerClick}`, indicatorTextStyle);
    hatsPerClickIndicator.position.set(10, 50);
    statContainer.addChild(hatsPerClickIndicator);

    // Create upgrades
    upgradeContainer = new Container();
    upgradeContainer.position.set(window.innerWidth - 345, -5);

    const upgradeRectangle = drawRectangle(0, 0, 350, 100, 0xAAAAAA, 10, 0x000000, 1);
    upgradeContainer.addChild(upgradeRectangle);

    const upgradeText = new Text("Upgrades", indicatorTextStyle);
    upgradeText.position.set(15, 10);
    upgradeContainer.addChild(upgradeText);

    const upgradeButton = drawRectangle(20, 55, 25, 25, 0xAAAAAA, 5, 0x000000, 1);
    upgradeButton.interactive = true;
    upgradeButton.buttonMode = true;
    upgradeContainer.addChild(upgradeButton);

    upgradeInfoContainer = new Container();
    upgradeInfoContainer.position.set(window.innerWidth - 345, window.innerHeight - 95);

    const upgradeInfoRectangle = drawRectangle(0, 0, 350, 100, 0xAAAAAA, 10, 0x000000, 1);
    upgradeInfoContainer.addChild(upgradeInfoRectangle);

    const upgradeInfoText = new Text("", {
        fontFamily: "Corbel",
        fontSize: 18,
        fill: 0x000000
    });
    upgradeInfoText.position.set(10, 10);
    upgradeInfoContainer.addChild(upgradeInfoText);

    upgradeButton.on("pointerdown", () => {
        upgradeButton.tint = 0x888888;
        upgradeInfoText.text = "";
        if (Global.numberOfHats >= 50) {
            Global.hatsPerClick++;
            Global.numberOfHats -= 50;
            upgradeContainer.removeChild(upgradeButton);
            updateIndicators();
        }
    });
    upgradeButton.on("pointerout", () => {
        upgradeButton.tint = 0xFFFFFF;
        upgradeInfoText.text = "";
    });

    upgradeButton.on("pointerover", () => {
        upgradeButton.tint = 0xBBBBBB;
        upgradeInfoText.text = "Increases hats per click to 2.\nCost: 50 hats.";
    });

    upgradeButton.on("pointerup", () => {
        upgradeButton.tint = 0xFFFFFF;
    });

    upgradeContainer.addChild(upgradeButton);

    // Create flavour text
    flavourTextContainer = new Container();
    flavourTextContainer.position.set(app.screen.width / 2 - 350, app.screen.height - 65);

    const flavourTextRectangle = drawRectangle(0, 0, 700, 60, 0xAAAAAA, 10, 0x000000, 1);
    flavourTextRectangle.pivot.set(flavourTextRectangle.x, flavourTextRectangle.y);
    flavourTextContainer.addChild(flavourTextRectangle);

    const flavourText = new Text(Global.getFlavourText(), indicatorTextStyle);
    flavourText.position.set(10, 10);
    flavourText.interactive = true;
    setInterval(() => {
        flavourText.text = Global.getFlavourText();
    }, 15000);
    flavourText.on("pointerdown", () => {
        flavourText.text = Global.getFlavourText();
    });
    flavourTextContainer.addChild(flavourText);

    // Create clickable hat
    hatSprite = Sprite.from("./assets/Hat7638.png");
    hatSprite.anchor.set(0.5, 0.5);
    hatSprite.position.set(app.screen.width / 2 - hatSprite.width / 2, 
        app.screen.height / 2 - hatSprite.height - 2);
    hatSprite.height = window.innerHeight * 0.5;
    hatSprite.width = window.innerHeight * 0.26666666666;

    hatSprite.interactive = true;
    hatSprite.buttonMode = true;

    hatSprite.on("pointerdown", () => {
        hatSprite.tint = 0x888888;
        Global.numberOfHats += Global.hatsPerClick;
        updateIndicators();
    });

    hatSprite.on("pointerout", () => {
        hatSprite.tint = 0xFFFFFF;
    });

    hatSprite.on("pointerover", () => {
        hatSprite.tint = 0xBBBBBB;
    });

    hatSprite.on("pointerup", () => {
        hatSprite.tint = 0xFFFFFF;
    });

    // Add the map button
    const mapButtonContainer = new Container();
    mapButtonContainer.position.set(0, app.screen.height - 95);

    const mapButton = drawRectangle(0, 0, 150, 100, 0xAAAAAA, 10, 0x000000, 1);
    mapButton.interactive = true;
    mapButton.buttonMode = true;
    mapButton.on("pointerdown", () => {
        if (mapContainer == undefined)
            initialiseMapPage();
        changePage(PageType.Map);
    });

    const mapText = new Text("Map", indicatorTextStyle);
    mapText.position.set(40, 35);
    mapButton.addChild(mapText);

    mapButtonContainer.addChild(mapButton);

    mainContainer = new Container();
    mainContainer.addChild(flavourTextContainer);
    mainContainer.addChild(mapButtonContainer);
    mainContainer.addChild(statContainer);
    mainContainer.addChild(upgradeContainer);
    mainContainer.addChild(upgradeInfoContainer);
    mainContainer.addChild(hatSprite);
    app.stage.addChild(mainContainer);
}

function initialiseMapPage() : void {
    // Add the main button
    const mainButtonContainer = new Container();
    mainButtonContainer.position.set(0, app.screen.height - 95);

    const mainButton = drawRectangle(0, 0, 150, 100, 0x0ABF0A, 10, 0x000000, 1);
    mainButton.interactive = true;
    mainButton.buttonMode = true;
    mainButton.on("pointerdown", () => {
        changePage(PageType.Main);
    });
    mainButtonContainer.addChild(mainButton);

    const mainText = new Text("Main", indicatorTextStyle);
    mainText.position.set(40, 35);
    mainButton.addChild(mainText);

    const mapText = new Text("Coming soon...?", indicatorTextStyle);
    mapText.position.set(app.screen.width / 2 - mapText.width / 2,
        app.screen.height / 2 - mapText.height / 2);

    const hattMannImage = Sprite.from("./assets/HATTMANN.png");

    const orangeImage = Sprite.from("./assets/Orange.png");
    orangeImage.position.set(app.screen.width - orangeImage.texture.width, 
        app.screen.height - orangeImage.texture.height );

    mapContainer = new Container();
    mapContainer.addChild(mainButtonContainer);
    mapContainer.addChild(mapText);
    mapContainer.addChild(hattMannImage);
    mapContainer.addChild(orangeImage);
}

// Updates the indicators
function updateIndicators() : void {
    hatsIndicator.text = `Hats: ${String(Global.numberOfHats)}`;
    hatsPerClickIndicator.text = `Hats per click: ${Global.hatsPerClick}`;
}

// Change locations of containers when the window is resized
window.onresize = () => {
    hatSprite.height = window.innerHeight * 0.5;
    hatSprite.width = window.innerHeight * 0.26666666666;
    hatSprite.position.set(window.innerWidth / 2 - hatSprite.width / 2, 
        window.innerHeight / 2 - hatSprite.height / 2);
    flavourTextContainer.position.set(window.innerWidth / 2 - 350, window.innerHeight - 65);
    upgradeContainer.position.set(window.innerWidth - 345, -5);
    upgradeInfoContainer.position.set(window.innerWidth - 345, window.innerHeight - 95);
};
