import { Global } from "./global";

export class Upgrade {
    public id : number;
    public price : number;
    public func : Function;

    public constructor(id : number, price : number, func : Function) {
        this.id = id;
        this.price = price;
        this.func = func;
    }

    public static upgrades = [
        new Upgrade(0, 50, ()=>{Global.hatsPerClick++;})
    ];
}
