import { Graphics } from "pixi.js";
import { Salesperson } from "./salesperson";

export class Global {
    private static _hatsPerClick : number = 1;
    public static get hatsPerClick() : number {
        return this._salespersonNumber == 1 ? this._hatsPerClick * 1.2 : this._hatsPerClick;
    }
    public static set hatsPerClick(value : number) {
        this._hatsPerClick = value;
    }

    public static numberOfHats : number = 0;

    public static ownedSalespeople : number[] = [0];

    private static _salespersonNumber : number = 0;
    public static get activeSalesperson() : Salesperson {
        return Salesperson.AllSalespeople[this._salespersonNumber];
    }
    public static set activeSalesperson(value : Salesperson) {
        const foundSalesperson = Salesperson.AllSalespeople.find(s => s.id == value.id);
        this._salespersonNumber = foundSalesperson == undefined ? 0 : foundSalesperson.id;
    }

    public static indicatorTextStyle = {
        fontFamily: "Corbel",
        fontSize: 32,
        fill: 0x000000
    };

    private static flavourText : { text : string, condition : boolean }[] = [
        { text : "Go two The Hat Stoar!", condition : true },
        { text : "!pooS puoP knirD", condition : true },
        { text : "Woahst on Toast", condition : true },
        { text : "You feel the sudden urge to get more hats.", condition : true },
        { text : "Your inventory of hats is getting quite large.", condition : Global.numberOfHats > 500 },
        { text : "HATT MANN is raring to go!", condition : Global.ownedSalespeople.includes(1) },
        { text : "#feiLsIegnarO", condition : Global.ownedSalespeople.includes(2) }
    ];

    public static getFlavourText() : string {
        let flavourTextInfo = { text: "", condition: false };
        let satisfied = false;
        do {
            flavourTextInfo = this.flavourText[Math.trunc(Math.random() * this.flavourText.length)];
            if (flavourTextInfo.condition) {
                satisfied = true;
                return flavourTextInfo.text;
            }
        } while (!satisfied);
        return "";
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
    public static drawRectangle(x : number, y : number, width : number, height : number,
        fillColor : number, lineWidth? : number | undefined, lineColor? : number | undefined, 
        lineAlpha? : number | undefined) : Graphics {
        const rectangle = new Graphics();
        rectangle.lineStyle(lineWidth, lineColor, lineAlpha);
        rectangle.beginFill(fillColor);
        rectangle.drawRect(x, y, width, height);
        rectangle.endFill();
        return rectangle;
    }
}
