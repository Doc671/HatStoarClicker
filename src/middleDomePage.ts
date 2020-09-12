import { Container, Sprite, Text, Texture } from "pixi.js";
import { Global } from "./global";
import { Page } from "./page";
import { PageManager } from "./pageManager";
import { Salesperson } from "./salesperson";

export class MiddleDomePage extends Page {
    private salespersonSprite : Sprite;
    

    public constructor(backgroundColour : number, pageManager : PageManager) {
        super(backgroundColour, pageManager);

        this.mainContainer = new Container();

        this.salespersonSprite = new Sprite();
        this.salespersonSprite.anchor.set(1, 0);
        this.salespersonSprite.position.set(window.innerWidth, 0);
        this.mainContainer.addChild(this.salespersonSprite);
    
        let position = 160;
        Salesperson.AllSalespeople.slice(1, Salesperson.AllSalespeople.length).forEach(salesperson => {
            const currentText = new Text(`${salesperson.name}: ${salesperson.cost} hats`, Global.indicatorTextStyle);
            currentText.position.set(10, position);
            const currentRectangle = Global.drawRectangle(0, position, currentText.width + 20, currentText.height + 5, 0x7FC9FF);
            if (!Global.ownedSalespeople.includes(salesperson.id)) {
                currentRectangle.interactive = true;
                currentRectangle.buttonMode = true;
                currentRectangle.on("pointerover", () => {
                    this.salespersonSprite.texture = Texture.from(salesperson.imagePath);
                });
                currentRectangle.on("pointerdown", () => {
                    this.salespersonSprite.texture = Texture.from(salesperson.imagePath);
                    if (Global.numberOfHats >= salesperson.cost) {
                        currentRectangle.interactive = false;
                        currentRectangle.buttonMode = false;
                        Global.numberOfHats -= salesperson.cost;
                        Global.ownedSalespeople.push(salesperson.id);
                        Global.activeSalesperson = salesperson;
                        currentText.text += " (bought)";
                        currentRectangle.width = currentText.width + 20;
                        pageManager.persistentContainer.updateIndicators();
                    }
                });
            }
            position += 40;
            this.mainContainer.addChild(currentRectangle);
            this.mainContainer.addChild(currentText);
        });
    }
}