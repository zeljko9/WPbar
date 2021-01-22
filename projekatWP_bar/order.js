import{Glass} from "./glass.js";

export class Order{
    constructor(){
        this.Price=0;
        this.Num_glass=0;
        this.Glasses=[];        
    }

    setPrice(a){
        this.Price+=a;
    }

    createGlasses(a){
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
}