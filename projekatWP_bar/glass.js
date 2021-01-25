export class Glass{
    constructor(a,b,c,d){
        this.Position=a;
        this.DrinkName=b;
        this.Price=c;
        this.Color=d;
    }

    updateGlass(a,b,c){
        this.DrinkName+=", "+a;
        this.Price+=b;
        this.Color=c;
    }
    newGl(a,b,c){
        this.DrinkName=a;
        this.Price=b;
        this.Color=c;
    }
    get color() {
        return this.Color;
    }
    get name(){
        return this.DrinkName;
    }
    get price(){
        return this.Price;
    }
    get position(){
        return this.Position;
    }
}