export class Glass{
    constructor(a,b,c,d){
        this.Position=a;
        this.Name=b;
        this.Price=c;
        this.Polor=d;
    }

    updateGlass(a,b,c){
        this.Name+=", "+a;
        this.Price+=b;
        this.Color=c;
    }
    newGl(a,b,c){
        this.Name=a;
        this.Price=b;
        this.Color=c;
    }
    get color() {
        return this.Color;
    }
    get name(){
        return this.Name;
    }
    get price(){
        return this.Price;
    }
    get position(){
        return this.Position;
    }
}