import { Salesperson } from "./salesperson";

export class Global {
    private static _hatsPerClick : number = 1;
    public static get hatsPerClick() : number {
        let __hatsPerClick = this._hatsPerClick;
        if (this._salespersonNumber == 1)
            __hatsPerClick *= 1.2;
        return __hatsPerClick;
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

    private static flavourText : { text : string, condition : boolean }[] = [
        { text : "Go two The Hat Stoar!", condition : true },
        { text : "!pooS puoP knirD", condition : true },
        { text : "Woahst on Toast", condition : true },
        { text : "You feel the sudden urge to get more hats.", condition : true },
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
}
