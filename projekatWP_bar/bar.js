import {Waiter} from "./waiter.js"

export class Bar{
    constructor(){
        this.waiters_names="";
        this.num=0;
        this.Waiters=[];
        this.container=null;
    }

    drawForm(host){
        this.container=document.createElement("div");
        this.container.classList.add("maincontainer");
        host.appendChild(this.container);

        let div=document.createElement("div");
        div.classList.add("configurator");
        div.style.backgroundImage="url('./img/coffe.jpg')";
        this.container.appendChild(div);

        let pom=document.createElement("h3");
        pom.innerHTML="Caffe Casual";
        pom.style.color="white";
        div.appendChild(pom);
        
        pom=document.createElement("label");
        pom.innerHTML="Unesite broj konobara/ica";
        pom.style.color="white";
        div.appendChild(pom);

        pom=document.createElement("input");
        pom.type="number";
        pom.min="0";
        pom.max="10";
        pom.name="waiter_num";
        div.appendChild(pom);

        pom=document.createElement("label");
        pom.innerHTML="Unesite imena konobara/ica";
        pom.style.color="white";
        div.appendChild(pom);

        pom=document.createElement("input");
        pom.type="text";
        pom.name="names";
        div.appendChild(pom);

        pom=document.createElement("button");
        pom.innerHTML="Unesite konobare";
        pom.onclick=(ev)=>{
            this.drawBars(document.getElementsByName("waiter_num")[0].value);
        }
        div.appendChild(pom);

        pom=document.createElement("button");
        pom.innerHTML="Nova smena";
        pom.onclick=(ev)=>{
            this.deleteBars();
        }
        div.appendChild(pom);
    }

    drawBars(a){
        if(this.waiters_names!=""){
            alert("Smena!");
            return
        }
        this.waiters_names=document.getElementsByName("names")[0].value;
        if(!/^[a-zA-Z ]+$/.test(this.waiters_names)){
            alert("Unesite ispravna imena!");
            return;
        }
        this.num=a;
        let pnames=this.waiters_names.split(' ');
        if(pnames.length!=this.num){
            alert("Unesite tacan broj imena!");
            return;
        }
        for(let i=0;i<a;i++){
            this.Waiters.push(new Waiter(pnames[i]));
            this.Waiters[i].drawWaiter(this.container);
        }
        
        fetch("https://localhost:5001/Bar/PostBar",{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(this,
                ['waiters_names','num','Waiters','name','orders','arrive_time'])
        })
    }

    deleteBars(){
        if(this.waiters_names==""){
            alert("Prvo unesite konobare za postojecu smenu!");
            return;
        }
        let nms=this.waiters_names.split(' ');
        for(let i=0;i<this.num;i++){
            let pom=document.getElementsByClassName(nms[i])[0];
            this.container.removeChild(pom);
        }
        this.waiters_names="";
        this.num=0;
        this.Waiters=[];
    }

    replacer(key,value)
    {
        if (key=="drinkPriceColor") return undefined;
        else if (key=="container") return undefined;
        else if (key=="curre") return undefined;
        else return value;
    }
}