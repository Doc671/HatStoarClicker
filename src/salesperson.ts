export class Salesperson {
    public id : number;
    public name : string;
    public cost : number;
    public imagePath : string;

    constructor(id : number, name : string, cost : number, imagePath : string) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.imagePath = imagePath;
    }

    public static AllSalespeople = [
        new Salesperson(0, "None", 0, ""),
        new Salesperson(1, "HATT MANN", 50, "./assets/HATTMANN.png"),
        new Salesperson(2, "Orange", 350, "./assets/Orange.png")
    ]
}
