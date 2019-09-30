export class Salesperson {
    public id : number;
    public name : string;
    public imagePath : string;

    constructor(id : number, name : string, imagePath : string) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
    }

    public static HattMann = new Salesperson(0, "HATT MANN", "./assets/HATTMANN.png");
    public static Orange = new Salesperson(1, "Orange", "./assets/Orange.png");
}
