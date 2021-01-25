import{Glass} from "./glass.js";

export class Order{
    constructor(){
        this.finall_price=0;
        this.Num_glass=0;
        this.order_time="";
        this.Glasses=[];        
    }

    setPrice(a){
        this.finall_price+=a;
    }

    createGlasses(a){
        let d=new Date();
        this.order_time=d.toUTCString();
        this.Num_glass=a;

        for(let i=0;i<this.Num_glass;i++){
            let newglass=new Glass(i+1,"",0,"");
            this.Glasses.push(newglass);
        }
    }

    updateGlass(a,b){
        this.Glasses[a]=b;
    }

    deleteGlass(a){
        for(let i=a-1;i<this.Num_glass-1;i++){
            this.Glasses[i]=this.Glasses[i+1];
        }
        this.Glasses.pop();
        this.Num_glass--;
    }

    glass(a){
        return this.Glasses[a];
    }

    glasses(){
        return this.Glasses;
    }

    get price(){
        return this.finall_price;
    }
}