import { Application, Container, Sprite, Text } from "pixi.js";
import { Global } from "./global";
import { Page } from "./page";
import { PageManager } from "./pageManager";

export class MapPage extends Page {
    public hatStoarImage : Sprite;

    public constructor(app : Application, backgroundColour : number, pageManager : PageManager) {
        super(backgroundColour, pageManager);

        const mapText = new Text("Map", Global.indicatorTextStyle);
        mapText.position.set(app.screen.width / 2 - mapText.width / 2,
            app.screen.height - mapText.height - 15);
    
        const middleDomeImage = Sprite.from("./assets/MiddleDome.png");
        middleDomeImage.scale.set(0.75, 0.75);
        middleDomeImage.position.set(160, 170);
        middleDomeImage.interactive = true;
        middleDomeImage.buttonMode = true;
        middleDomeImage.on("pointerdown", () => {
            pageManager.changePage(pageManager.middleDomePage);
        });
    
        this.hatStoarImage = Sprite.from("./assets/TheHatStoar.png")
        this.hatStoarImage.anchor.set(0.5, 0.5);
        this.hatStoarImage.scale.set(0.75, 0.75);
        this.hatStoarImage.position.set(app.screen.width / 2, app.screen.height / 2);
        this.hatStoarImage.interactive = true;
        this.hatStoarImage.buttonMode = true;
        this.hatStoarImage.on("pointerdown", () => {
            pageManager.changePage(pageManager.mainPage);
        });
        
        this.mainContainer = new Container();
        this.mainContainer.addChild(middleDomeImage);
        this.mainContainer.addChild(this.hatStoarImage);
        this.mainContainer.addChild(mapText);
    }
}
