import { Glass } from "./glass.js";
import { Order } from "./order.js";

export class Bar
{
    constructor(){
        this.container=null;
        this.glasses=0;
        this.orders=1;
        this.drinkPriceColor=[
            ['cola',150,'#240802'],
            ['juice',120,'#ffcc00'],
            ['fanta',150,'#f5a207'], 
            ['sprite', 150,'#e3ffec'], 
            ['whiskey',220,'#d98200'], 
            ['coffe', 120,'#5c3400'], 
            ['votka', 200,'#ededed'], 
            ['gin',200,'#ededed'], 
            ['wine', 300,'#540001'], 
            ['burbon', 250,'#966565']];
        this.finalPrice=0;
        this.currentOrders=[];
        this.currentDrinks=[];
    }

    drawBar(host){
        if(!host)
            throw new Error("Greska!");

        this.container=document.createElement("div");
        this.container.classList.add("container");
        host.appendChild(this.container);

        this.drawForm(this.container);        
    }

    drawForm(host){
        const contForm=document.createElement("div");
        contForm.className="contForm";
        host.appendChild(contForm);

        const glassForm=document.createElement("div");
        glassForm.setAttribute("id","glassForm");   
        host.appendChild(glassForm);

        const contForm1=document.createElement("div");
        contForm1.className="contForm1";
        contForm.appendChild(contForm1);

        let something=document.createElement("h3");
        something.innerHTML="Konfigurator pica";
        contForm1.appendChild(something);

        something=document.createElement("label");
        something.innerHTML="Unesite broj casa";
        contForm1.appendChild(something);

        something=document.createElement("input");
        something.className="br_casa";
        contForm1.appendChild(something);

        something=document.createElement("button");
        something.innerHTML="Unesi";
        contForm1.appendChild(something);
        something.onclick=(ev)=>{//ovde se crtaju case
            this.drawGlasses(glassForm,contForm1.querySelector(".br_casa").value);
        }

        something=document.createElement("button");
        something.innerHTML="Obrisi sve";
        contForm1.appendChild(something);
        something.onclick=(ev)=>{//ovde se crtaju case
            this.deleteAll();
        }

        const contForm2=document.createElement("div");
        contForm2.className="contForm2";
        contForm.appendChild(contForm2);

        something=document.createElement("label");
        something.innerHTML="Odaberi casu";
        contForm2.appendChild(something);

        something=document.createElement("input");
        something.className="casa_br";
        contForm2.appendChild(something);

        something=document.createElement("label");
        something.innerHTML=" Odaberi pice:   ";
        contForm2.appendChild(something);

        something=document.createElement("select");
        something.setAttribute("id","select_type");
        
        let opcija;
        for(let i=0;i<9;i++){
            opcija=document.createElement("option");
            opcija.innerHTML=this.drinkPriceColor[i][0];
            opcija.value=i;
            something.appendChild(opcija);
        }
        contForm2.appendChild(something);

        something=document.createElement("button");
        something.innerHTML="Dodaj";
        something.onclick=(ev)=>{//ovde se unose napici u case
            let a=contForm2.querySelector("#select_type").value;
            let b=contForm2.querySelector(".casa_br").value;
            this.inputDrink(a,b);
        }
        contForm2.appendChild(something);

        something=document.createElement("button");
        something.innerHTML="Brisi";
        contForm2.appendChild(something);
        something.onclick=(ev)=>{ 
            this.deleteSpec(contForm2.querySelector(".casa_br").value);
        }
        something=document.createElement("br");
        contForm2.appendChild(something);

        something=document.createElement("label");
        something.setAttribute("id","ukupna_cena");
        something.innerHTML="Ukupna cena svih pica je: "+this.finalPrice;
        contForm2.appendChild(something);

        something=document.createElement("br");
        contForm2.appendChild(something);

        something=document.createElement("button");
        something.innerHTML="Nova porudzbina";
        contForm2.appendChild(something);
        something.onclick=(ev)=>{
            this.newOrder();
        }
    }

    drawGlasses(host,num)
    {
        if(num>5)
        {
            alert("Ne mozes poneti vise od 5 casa, prosipaces ih!");
            return;
        }
        else if(this.glasses!=0)
        {
            alert("Prvo isporucite trenutnu narudzbinu i paravite novu!");
            return;
        }

        this.glasses=num;
        let order=new Order();
        order.createGlasses(num);
        this.currentOrders.push(order);

        let tbl=document.createElement("table");
        tbl.setAttribute("id","table");
        host.appendChild(tbl);
        let tr1=document.createElement("tr");
        tr1.setAttribute("id","row1");
        tbl.appendChild(tr1);
        let tr2=document.createElement("tr");
        tr2.setAttribute("id","row2");
        tbl.appendChild(tr2);


        for(let i=0;i<num;i++){
            let newGlass=new Glass(i+1,"",0,"");
            this.currentDrinks.push(newGlass);

            let td1=document.createElement("td");
            let td2=document.createElement("td");
            td2.setAttribute("id","th"+i);
            let cnv=document.createElement("canvas");
            cnv.setAttribute("id","canvas"+i);
            td1.appendChild(cnv);
            tr1.appendChild(td1);
            tr2.appendChild(td2);

            let pom=tbl.querySelector("#canvas"+i);
            let ctx=pom.getContext("2d");
            
            ctx.moveTo(10,10);
            ctx.lineTo(20,60);
            ctx.lineTo(50,60);
            ctx.lineTo(60,10);
            
            ctx.strokeStyle="#000000";
            ctx.stroke();
            
            ctx.lineTo(10,10);
            
            ctx.strokeStyle="#ffffff";
            ctx.stroke();            
        }
    }

    newOrder()
    {
        if(this.glasses<=0){
            return;
        }
        this.currentDrinks.forEach(element => {
            if(element.price==0){
                alert("Prvo popunite sve case, ili obrisite odgovarajuce.");
                return;
            }
        });

        let jsondata=JSON.stringify(this.currentOrders[this.orders-1]);
        alert(jsondata);

        fetch("https://localhost:5001/Bar/PostOrder",{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:jsondata
        });
        
        this.currentDrinks=null;
        let order=new Order();
        this.currentOrders.push(order);
        this.orders++;
        this.deleteAll();

        let pom=document.getElementById("ukupna_cena");
        pom.innerHTML="Ukupna cena svih pica je: 0";
    }
   
    deleteSpec(a)
    {
        if(this.glasses<=0){
            return;
        }
        else if(a>this.glasses){
            alert("Ta casa ne postoji!");
            return;
        }
        
        let specPrice=this.currentDrinks[a-1].price;
        this.currentOrders[this.orders-1].deleteGlass(a);
        this.currentDrinks=this.currentOrders[this.orders-1].glasses().map((x)=>x);
        this.glasses--;
        this.finalPrice-=specPrice;

        let row=document.getElementById("row1");
        row.deleteCell(a-1);

        row=document.getElementById("row2");
        row.deleteCell(a-1);

        for(let i=a-1;i<this.glasses;i++){
            document.getElementById("canvas"+(i+1)).id="canvas"+i;
            document.getElementById("th"+(i+1)).id="th"+i;
        }

        let pom=document.getElementById("ukupna_cena");
        pom.innerHTML="Ukupna cena svih pica je: "+this.finalPrice;
    }

    deleteAll()
    {
        if(this.glasses<=0){
            return;
        }
        this.currentOrders.pop();
        this.currentDrinks=[];
        this.glasses=0;

        let tbl=document.getElementById("table");
        
        document.getElementById("glassForm").removeChild(tbl);

        let pom=document.getElementById("ukupna_cena");
        pom.innerHTML="Ukupna cena svih pica je: 0";
    }
    inputDrink(a,b)
    {
        if(this.glasses<=0){
            alert("Prvo unesite case!");
            return;
        }

        let th2=document.getElementById("th"+(b-1));
        
        let gl=document.getElementById("canvas"+(b-1));
  
        let dr=this.drinkPriceColor[a];

        let cnx=gl.getContext("2d");
        let p=cnx.getImageData(32,42,1,1).data;
        var hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6); 

        if(hex=="#000000"){
            this.currentDrinks[b-1].newGl(dr[0],dr[1],dr[2]);
            th2.innerHTML=dr[0]+"<br/>cena pica je: "+dr[1]+"<br/>";
            this.finalPrice+=dr[1];
        }
        else{
            let mixedColor=this.colorMixer(this.hexToRgb(dr[2]),this.hexToRgb(this.currentDrinks[b-1].color),0.5);
            this.currentDrinks[b-1].updateGlass(dr[0],dr[1],this.rgbToHex(mixedColor[0],mixedColor[1],mixedColor[2]));
            th2.innerHTML=this.currentDrinks[b-1].name+"<br/>cena pica je: "+this.currentDrinks[b-1].price+"<br/>";
            this.finalPrice+=dr[1];
        }

        this.currentOrders[this.orders-1].updateGlass(b-1,this.currentDrinks[b-1]);

        cnx.fillStyle=this.currentDrinks[b-1].color;
        cnx.fill();

        let pom=document.getElementById("ukupna_cena");
        pom.innerHTML="Ukupna cena svih pica je: "+this.finalPrice;

        this.currentOrders[this.orders-1].setPrice(dr[1]);
    }

    hexToRgb(hex) 
    {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }

    colorChannelMixer(colorChannelA, colorChannelB, amountToMix)
    {
        var channelA = colorChannelA*amountToMix;
        var channelB = colorChannelB*(1-amountToMix);
        return parseInt(channelA+channelB);
    }
    
    colorMixer(rgbA, rgbB, amountToMix)
    {
        var r = this.colorChannelMixer(rgbA.r,rgbB.r,amountToMix);
        var g = this.colorChannelMixer(rgbA.g,rgbB.g,amountToMix);
        var b = this.colorChannelMixer(rgbA.b,rgbB.b,amountToMix);
        let rgb=[];
        rgb.push(r);
        rgb.push(g);
        rgb.push(b);
        return rgb;
    }

    rgbToHex(r, g, b) 
    {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    indexOf2dArray(array2d, itemtofind) 
    {
        let index;
        for(let i=0;i<array2d.length;i++){
            if(array2d[i][0]==itemtofind){
                index=i;
            }
        }
        return index;
    }
}