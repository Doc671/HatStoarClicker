import { Application, Container, Sprite, Text } from "pixi.js";
import { Global } from "./global";
import { Page } from "./page";
import { PageManager } from "./pageManager";

export class MainPage extends Page {
    public hatSprite : Sprite;
    public flavourTextContainer : Container;
    public upgradeContainer : Container;
    public upgradeInfoContainer : Container;

    public constructor(app : Application, backgroundColour: number, pageManager : PageManager) {
        super(backgroundColour, pageManager);

        // Create upgrades
        this.upgradeContainer = new Container();
        this.upgradeContainer.position.set(window.innerWidth - 345, -5);

        const upgradeRectangle = Global.drawRectangle(0, 0, 350, 100, 0xAAAAAA, 10, 0x000000, 1);
        this.upgradeContainer.addChild(upgradeRectangle);

        const upgradeText = new Text("Upgrades", Global.indicatorTextStyle);
        upgradeText.position.set(15, 10);
        this.upgradeContainer.addChild(upgradeText);
        
        this.upgradeInfoContainer = new Container();
        this.upgradeInfoContainer.position.set(window.innerWidth - 345, window.innerHeight - 95);

        if (Global.ownedUpgradeIds.includes(0)) {
            const upgradeButton = Global.drawRectangle(20, 55, 25, 25, 0xAAAAAA, 5, 0x000000, 1);
            upgradeButton.interactive = true;
            upgradeButton.buttonMode = true;
            this.upgradeContainer.addChild(upgradeButton);

            const upgradeInfoRectangle = Global.drawRectangle(0, 0, 350, 100, 0xAAAAAA, 10, 0x000000, 1);
            this.upgradeInfoContainer.addChild(upgradeInfoRectangle);

            const upgradeInfoText = new Text("", {
                fontFamily: "Corbel",
                fontSize: 18,
                fill: 0x000000
            });
            upgradeInfoText.position.set(10, 10);
            this.upgradeInfoContainer.addChild(upgradeInfoText);

            upgradeButton.on("pointerdown", () => {
                upgradeButton.tint = 0x888888;
                upgradeInfoText.text = "";
                if (Global.numberOfHats >= 50) {
                    Global.upgrade(0);
                    this.upgradeContainer.removeChild(upgradeButton);
                    this.pageManager.persistentContainer.updateIndicators();
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

            this.upgradeContainer.addChild(upgradeButton);
        }

        // Create flavour text
        this.flavourTextContainer = new Container();
        this.flavourTextContainer.position.set(app.screen.width / 2 - 350, app.screen.height - 65);

        const flavourTextRectangle = Global.drawRectangle(0, 0, 700, 70, 0xAAAAAA, 10, 0x000000, 1);
        flavourTextRectangle.pivot.set(flavourTextRectangle.x, flavourTextRectangle.y);
        this.flavourTextContainer.addChild(flavourTextRectangle);

        const flavourText = new Text(Global.getFlavourText(), Global.indicatorTextStyle);
        flavourText.position.set(10, 10);
        flavourText.interactive = true;
        setInterval(() => {
            flavourText.text = Global.getFlavourText();
        }, 15000);
        flavourTextRectangle.on("pointerdown", () => {
            flavourText.text = Global.getFlavourText();
        });
        this.flavourTextContainer.addChild(flavourText);

        // Create clickable hat
        this.hatSprite = Sprite.from("./assets/Hat7638.png");
        this.hatSprite.anchor.set(0.5, 0.5);
        this.hatSprite.height = window.innerHeight * 0.5;
        this.hatSprite.width = window.innerHeight * 0.32;
        this.hatSprite.position.set(app.screen.width / 2, app.screen.height / 2);

        this.hatSprite.interactive = true;
        this.hatSprite.buttonMode = true;

        this.hatSprite.on("pointerdown", () => {
            this.hatSprite.tint = 0x888888;
            Global.numberOfHats += Global.hatsPerClick;
            this.pageManager.persistentContainer.updateIndicators();
        });

        this.hatSprite.on("pointerout", () => {
            this.hatSprite.tint = 0xFFFFFF;
        });

        this.hatSprite.on("pointerover", () => {
            this.hatSprite.tint = 0xBBBBBB;
        });

        this.hatSprite.on("pointerup", () => {
            this.hatSprite.tint = 0xFFFFFF;
        });

        this.mainContainer = new Container();
        // These containers are part of the main page only
        this.mainContainer.addChild(this.flavourTextContainer);
        this.mainContainer.addChild(this.upgradeContainer);
        this.mainContainer.addChild(this.upgradeInfoContainer);
        this.mainContainer.addChild(this.hatSprite);
    }
}
