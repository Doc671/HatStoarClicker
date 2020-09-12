import { Application, Container, Text } from "pixi.js";
import { Global } from "./global";
import { PageManager } from "./pageManager";

export class PersistentContainer {
    public hatsIndicator : Text;
    public hatsPerClickIndicator : Text;
    public activeSalespersonIndicator : Text;

    public mapButtonContainer : Container;

    public constructor(app : Application, pageManager : PageManager) {
        // Create stat container & stat elements
        const statContainer = new Container();

        const statRectangle = Global.drawRectangle(-5, -5, 400, 150, 0xAAAAAA, 10, 0x000000, 1);
        statContainer.addChild(statRectangle);

        this.hatsIndicator = new Text(`Hats: ${Math.floor(Global.numberOfHats)}`, Global.indicatorTextStyle);
        this.hatsIndicator.position.set(10, 10);
        statContainer.addChild(this.hatsIndicator);

        this.hatsPerClickIndicator = new Text(`Hats per click: ${Math.floor(Global.hatsPerClick)}`, Global.indicatorTextStyle);
        this.hatsPerClickIndicator.position.set(10, 50);
        statContainer.addChild(this.hatsPerClickIndicator);

        this.activeSalespersonIndicator = new Text(`Salesperson: ${Global.activeSalesperson.name}`, Global.indicatorTextStyle);
        this.activeSalespersonIndicator.position.set(10, 90);
        statContainer.addChild(this.activeSalespersonIndicator);

        // Add the map button
        this.mapButtonContainer = new Container();
        this.mapButtonContainer.position.set(-5, app.screen.height - 95);

        const mapButton = Global.drawRectangle(0, 0, 150, 100, 0xAAAAAA, 10, 0x000000, 1);
        mapButton.interactive = true;
        mapButton.buttonMode = true;
        mapButton.on("pointerdown", () => {
            pageManager.changePage(pageManager.mapPage);
        });

        const mapText = new Text("Map", Global.indicatorTextStyle);
        mapText.position.set(40, 35);
        mapButton.addChild(mapText);

        this.mapButtonContainer.addChild(mapButton);

        // These containers show in all pages
        app.stage.addChild(this.mapButtonContainer);
        app.stage.addChild(statContainer);
    }

    // Updates the top left indicators
    public updateIndicators() : void {
        this.hatsIndicator.text = `Hats: ${Math.floor(Global.numberOfHats)}`;
        this.hatsPerClickIndicator.text = `Hats per click: ${Math.floor(Global.hatsPerClick)}`;
        this.activeSalespersonIndicator.text = `Salesperson: ${Global.activeSalesperson.name}`;
    }
}