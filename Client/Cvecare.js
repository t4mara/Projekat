import { Dostave } from "./Dostave.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Kupovina } from "./Kupovina.js";
import { Zaposleni } from "./Zaposleni.js";

export class Cvecare{
    constructor(id, grad, ime, brojcveca){
        this.id = id;
        this.grad = grad;
        this.ime = ime;
        this.brojcveca = brojcveca;
    }
    crtaj(host){
        if(!host)
        throw new Error("Host je nedefinisan!");

        var provera = host.innerHTML;

        if(provera != null){
            host.innerHTML = null;
        }

        var tabela = document.createElement("table");
        var red = document.createElement("tr");

        let e= document.createElement("th");
        e.innerHTML="Ime";
        red.appendChild(e);

        
        e= document.createElement("th");
        e.innerHTML="Grad";
        red.appendChild(e);

        e= document.createElement("th");
        e.innerHTML="Broj Cveca";
        red.appendChild(e);

        var red2 = document.createElement("tr");

        let el=document.createElement("td");
        el.innerHTML=this.ime;
        red2.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.grad;
        red2.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.brojcveca;
        red2.appendChild(el);

        tabela.appendChild(red);
        tabela.appendChild(red2);
        host.appendChild(tabela);
        tabela.setAttribute("border", 2);
    }
}
