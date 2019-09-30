export class Global {
    public static hatsPerClick : number = 1;
    public static numberOfHats : number = 0;

    private static flavourText : string[] = [
        "Go two The Hat Stoar!",
        "!pooS puoP knirD",
        "Woahst on Toast",
        "You feel the sudden urge to get more hats..."
    ];

    public static getFlavourText() : string {
        return this.flavourText[Math.trunc(Math.random() * this.flavourText.length)];
    }
}
