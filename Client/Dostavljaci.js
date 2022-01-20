import { Cvecare } from "./Cvecare.js";
import { Dostave } from "./Dostave.js";
import { Menadzer } from "./Menadzer.js";
import { Zaposleni } from "./Zaposleni.js";
export class Dostavljaci{
    constructor(id, ime){
        this.id = id;
        this.ime = ime;
    }
    ime(){ return this.ime; }
    crtaj(host){
        if(!host)
        throw new Error("Host je nedefinisan!");

        var provera = host.innerHTML;

        if(provera != null){
            host.innerHTML = null;
        }

        var tabela = document.createElement("table");
        tabela.id = "tabeladobijcvece";
        var red = document.createElement("tr");

        let e= document.createElement("th");
        e.innerHTML="Ime";
        red.appendChild(e);

        this.Container = tabela;

        var red2 = document.createElement("tr");

        let el=document.createElement("td");
        el.innerHTML=this.ime;
        red2.appendChild(el);

        tabela.appendChild(red);
        tabela.appendChild(red2);
        host.appendChild(tabela);
        tabela.setAttribute("border", 2);
    }
}