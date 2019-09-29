import { Application, Container, Graphics, Sprite, Text, Rectangle } from "pixi.js";
import { Global } from "./global";

let hatSprite : Sprite;
let hatsIndicator : Text;
let hatsPerClickIndicator : Text;
let flavourTextContainer : Container;
let upgradeContainer : Container;
let upgradeInfoContainer : Container;

document.addEventListener("DOMContentLoaded", () => {
    // Set the title to the number of hats every 10 seconds
    setInterval(() => {
        document.title = `The Hat Stoar Clicker: ${Global.numberOfHats} hats`;
    }, 10000);

    // Create window
    const app = new Application({
        antialias: true,
        backgroundColor: 0xFFFFFF,
        resizeTo: window
    });
    document.body.appendChild(app.view);

    // Create stat container & stat elements
    const statContainer = new Container();
    app.stage.addChild(statContainer);

    const statRectangle = new Graphics();
    statRectangle.lineStyle(10, 0x000000, 1);
    statRectangle.beginFill(0xAAAAAA);
    statRectangle.drawRect(-5, -5, 350, 100);
    statRectangle.endFill();
    statContainer.addChild(statRectangle);
    
    const indicatorTextStyle = {
        fontFamily: "Corbel",
        fontSize: 32,
        fill: 0x000000
    };

    hatsIndicator = new Text(`Hats: ${Global.numberOfHats}`, indicatorTextStyle);
    hatsIndicator.position.set(10, 10);
    statContainer.addChild(hatsIndicator);

    hatsPerClickIndicator = new Text(`Hats per click: ${Global.hatsPerClick}`, indicatorTextStyle);
    hatsPerClickIndicator.position.set(10, 50);
    statContainer.addChild(hatsPerClickIndicator);

    // Create upgrades
    upgradeContainer = new Container();
    upgradeContainer.position.set(window.innerWidth - 345, -5);
    app.stage.addChild(upgradeContainer);
    
    const upgradeRectangle = new Graphics();
    upgradeRectangle.lineStyle(10, 0x000000, 1);
    upgradeRectangle.beginFill(0xAAAAAA);
    upgradeRectangle.drawRect(0, 0, 350, 100);
    upgradeRectangle.endFill();
    upgradeContainer.addChild(upgradeRectangle);

    const upgradeText = new Text("Upgrades", indicatorTextStyle);
    upgradeText.position.set(15, 10);
    upgradeContainer.addChild(upgradeText);

    const upgradeButton = new Graphics();
    upgradeButton.lineStyle(5, 0x000000, 1);
    upgradeButton.beginFill(0xAAAAAA);
    upgradeButton.drawRect(20, 55, 25, 25);
    upgradeButton.endFill();
    upgradeButton.interactive = true;
    upgradeButton.buttonMode = true;

    upgradeInfoContainer = new Container();
    upgradeInfoContainer.position.set(window.innerWidth - 345, window.innerHeight - 95);
    app.stage.addChild(upgradeInfoContainer);

    const upgradeInfoRectangle = new Graphics();
    upgradeInfoRectangle.lineStyle(10, 0x000000, 1);
    upgradeInfoRectangle.beginFill(0xAAAAAA);
    upgradeInfoRectangle.drawRect(0, 0, 350, 100);
    upgradeInfoRectangle.endFill();
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
    app.stage.addChild(flavourTextContainer);

    const flavourTextRectangle = new Graphics();
    flavourTextRectangle.lineStyle(10, 0x000000, 1);
    flavourTextRectangle.beginFill(0xAAAAAA);
    flavourTextRectangle.drawRect(0, 0, 700, 60);
    flavourTextRectangle.endFill();
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
    app.stage.addChild(hatSprite);

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
}, false);

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

// Updates the indicators
function updateIndicators() {
    hatsIndicator.text = `Hats: ${String(Global.numberOfHats)}`;
    hatsPerClickIndicator.text = `Hats per click: ${Global.hatsPerClick}`;
}