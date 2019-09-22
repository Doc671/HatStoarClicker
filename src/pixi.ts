// Initialises the pixi.js rendering process

import { Application, Container, Graphics, Sprite, Text } from "pixi.js";
import { Global } from "./global";
import * as fs from "fs";
import * as path from "path";

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
    align: "center",
    fontFamily: "Corbel",
    fontSize: 32,
    fill: 0x000000
};

const hatsIndicator = new Text(`Hats: ${Global.numberOfHats}`, indicatorTextStyle);
hatsIndicator.position.set(10, 10);
statContainer.addChild(hatsIndicator);

const hatsPerClickIndicator = new Text(`Hats per click: ${Global.hatsPerClick}`, indicatorTextStyle);
hatsPerClickIndicator.position.set(10, 50);
statContainer.addChild(hatsPerClickIndicator);

// Create flavour text
const flavourTextContainer = new Container();
flavourTextContainer.position.set(app.screen.width / 2 - 350, app.screen.height - 65);
app.stage.addChild(flavourTextContainer);

const flavourTextRectangle = new Graphics();
flavourTextRectangle.lineStyle(10, 0x000000, 1);
flavourTextRectangle.beginFill(0xAAAAAA);
flavourTextRectangle.drawRect(0, 0, 700, 60);
flavourTextRectangle.endFill();
flavourTextRectangle.pivot.set(flavourTextRectangle.x, flavourTextRectangle.y);
flavourTextContainer.addChild(flavourTextRectangle);

const flavourText = new Text("Go two The Hat Stoar!", indicatorTextStyle);
flavourText.position.set(10, 10);
setInterval(() => {
    const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, "flavour-text.json")).toString());
    const dataLength = rawData.text.length;
    flavourText.text = rawData.text[Math.trunc(Math.random() * dataLength)];
}, 15000);
flavourTextContainer.addChild(flavourText);

// Create clickable hat
const hatSprite = Sprite.from("./images/HATT MANN.png");
hatSprite.anchor.set(0.5, 0.5);
hatSprite.position.set(app.screen.width / 2 - hatSprite.width / 2, app.screen.height / 2 - hatSprite.height - 2);
hatSprite.height = window.innerHeight * 0.5;
hatSprite.width = window.innerHeight * 0.26666666666;
app.stage.addChild(hatSprite);

hatSprite.interactive = true;
hatSprite.buttonMode = true;
hatSprite.on("pointerdown", () => {
    Global.numberOfHats += Global.hatsPerClick;
    hatsIndicator.text = `Hats: ${String(Global.numberOfHats)}`;
});
