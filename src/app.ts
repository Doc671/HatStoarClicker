import { Application, Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { Global } from "./global";
import { Salesperson } from "./salesperson";

enum PageType {
    Main,
    Map,
    MiddleDome
}

let app : Application;

let mainContainer : Container;
let hatSprite : Sprite;
let hatsIndicator : Text;
let hatsPerClickIndicator : Text;
let activeSalespersonIndicator : Text;
let flavourTextContainer : Container;
let mapButtonContainer : Container;
let upgradeContainer : Container;
let upgradeInfoContainer : Container;

let mapContainer : Container;
let hatStoarImage : Sprite;

let middleDomeContainer : Container;
let salespersonSprite : Sprite;

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
            
            if (middleDomeContainer != undefined) {
                app.stage.removeChild(middleDomeContainer);
            }

            app.stage.addChild(mainContainer);
            break;
        case PageType.Map:
            app.renderer.backgroundColor = 0x0ABF0A;
            app.stage.removeChild(mainContainer);

            if (middleDomeContainer != undefined)
                app.stage.removeChild(middleDomeContainer);
                
            app.stage.addChild(mapContainer);
            break;
        case PageType.MiddleDome:
            app.renderer.backgroundColor = 0x0080FF;
            app.stage.removeChild(mainContainer);
            app.stage.removeChild(mapContainer);
            app.stage.addChild(middleDomeContainer);
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

    const statRectangle = drawRectangle(-5, -5, 400, 150, 0xAAAAAA, 10, 0x000000, 1);
    statContainer.addChild(statRectangle);

    hatsIndicator = new Text(`Hats: ${Math.round(Global.numberOfHats)}`, indicatorTextStyle);
    hatsIndicator.position.set(10, 10);
    statContainer.addChild(hatsIndicator);

    hatsPerClickIndicator = new Text(`Hats per click: ${Math.round(Global.hatsPerClick)}`, indicatorTextStyle);
    hatsPerClickIndicator.position.set(10, 50);
    statContainer.addChild(hatsPerClickIndicator);

    activeSalespersonIndicator = new Text(`Salesperson: ${Global.activeSalesperson.name}`, indicatorTextStyle);
    activeSalespersonIndicator.position.set(10, 90);
    statContainer.addChild(activeSalespersonIndicator);

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
    hatSprite.height = window.innerHeight * 0.5;
    hatSprite.width = window.innerHeight * 0.32;
    hatSprite.position.set(app.screen.width / 2, app.screen.height / 2);

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
    mapButtonContainer = new Container();
    mapButtonContainer.position.set(-5, app.screen.height - 95);

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

    // These containers show in all pages
    app.stage.addChild(mapButtonContainer);
    app.stage.addChild(statContainer);

    mainContainer = new Container();
    // These containers are part of the main page only
    mainContainer.addChild(flavourTextContainer);
    mainContainer.addChild(upgradeContainer);
    mainContainer.addChild(upgradeInfoContainer);
    mainContainer.addChild(hatSprite);
    app.stage.addChild(mainContainer);
}

function initialiseMapPage() : void {
    const mapText = new Text("Map", indicatorTextStyle);
    mapText.position.set(app.screen.width / 2 - mapText.width / 2,
        app.screen.height - mapText.height - 15);

    const middleDomeImage = Sprite.from("./assets/MiddleDome.png");
    middleDomeImage.scale.set(0.75, 0.75);
    middleDomeImage.position.set(160, 170);
    middleDomeImage.interactive = true;
    middleDomeImage.buttonMode = true;
    middleDomeImage.on("pointerdown", () => {
        if (middleDomeContainer == undefined)
            initialiseMiddleDomePage();
        changePage(PageType.MiddleDome);
    });

    hatStoarImage = Sprite.from("./assets/TheHatStoar.png")
    hatStoarImage.anchor.set(0.5, 0.5);
    hatStoarImage.scale.set(0.75, 0.75);
    hatStoarImage.position.set(app.screen.width / 2, app.screen.height / 2);
    hatStoarImage.interactive = true;
    hatStoarImage.buttonMode = true;
    hatStoarImage.on("pointerdown", () => {
        changePage(PageType.Main);
    });
    
    mapContainer = new Container();
    mapContainer.addChild(middleDomeImage);
    mapContainer.addChild(hatStoarImage);
    mapContainer.addChild(mapText);
}

function initialiseMiddleDomePage() : void {
    middleDomeContainer = new Container();

    salespersonSprite = new Sprite();
    salespersonSprite.anchor.set(1, 0);
    salespersonSprite.position.set(window.innerWidth, 0);
    middleDomeContainer.addChild(salespersonSprite);

    let position = 160;
    Salesperson.AllSalespeople.slice(1, Salesperson.AllSalespeople.length).forEach(salesperson => {
        const currentText = new Text(`${salesperson.name}: ${salesperson.cost} hats`, indicatorTextStyle);
        currentText.position.set(10, position);
        const currentRectangle = drawRectangle(0, position, currentText.width + 20, currentText.height + 5, 0x7FC9FF);
        if (!Global.ownedSalespeople.includes(salesperson.id)) {
            currentRectangle.interactive = true;
            currentRectangle.buttonMode = true;
            currentRectangle.on("pointerover", () => {
                salespersonSprite.texture = Texture.from(salesperson.imagePath);
            })
            currentRectangle.on("pointerdown", () => {
                salespersonSprite.texture = Texture.from(salesperson.imagePath);
                if (Global.numberOfHats >= salesperson.cost) {
                    currentRectangle.interactive = false;
                    currentRectangle.buttonMode = false;
                    Global.numberOfHats -= salesperson.cost;
                    Global.ownedSalespeople.push(salesperson.id);
                    Global.activeSalesperson = salesperson;
                    currentText.text += " (bought)";
                    currentRectangle.width = currentText.width + 20;
                    updateIndicators();
                }
            });
        }
        position += 40;
        middleDomeContainer.addChild(currentRectangle);
        middleDomeContainer.addChild(currentText);
    });
}

// Updates the indicators
function updateIndicators() : void {
    hatsIndicator.text = `Hats: ${Math.round(Global.numberOfHats)}`;
    hatsPerClickIndicator.text = `Hats per click: ${Math.round(Global.hatsPerClick)}`;
    activeSalespersonIndicator.text = `Salesperson: ${Global.activeSalesperson.name}`;
}

// Change locations of containers when the window is resized
window.onresize = () => {
    hatSprite.height = window.innerHeight * 0.5;
    hatSprite.width = window.innerHeight * 0.32;
    hatSprite.position.set(window.innerWidth / 2, window.innerHeight / 2);
    flavourTextContainer.position.set(window.innerWidth / 2 - 350, window.innerHeight - 65);
    mapButtonContainer.position.set(-5, window.innerHeight - 95);
    upgradeContainer.position.set(window.innerWidth - 345, -5);
    upgradeInfoContainer.position.set(window.innerWidth - 345, window.innerHeight - 95);
    hatStoarImage.position.set(app.screen.width / 2, app.screen.height / 2);
};
