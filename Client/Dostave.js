import { Cvecare } from "./Cvecare.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Menadzer } from "./Menadzer.js";
import { Zaposleni } from "./Zaposleni.js";

export class Dostave{
    constructor(id, brojcveca, dostavljac, cvecara){
        this.id = id;
        this.brojcveca = brojcveca;
        this.Container = null;
        this.dostavljac = dostavljac;
        this.cvecara = cvecara;
    }

    crtaj(host, cvecara, dostavljac){
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
        e.innerHTML="BrojCveca";
        red.appendChild(e);

        
        e= document.createElement("th");
        e.innerHTML="Cvecara";
        red.appendChild(e);

        e= document.createElement("th");
        e.innerHTML="Dostavljac";
        red.appendChild(e);

        this.Container = tabela;

        var red2 = document.createElement("tr");

        let el=document.createElement("td");
        el.innerHTML=this.brojcveca;
        red2.appendChild(el);

        el = document.createElement("td");
        if(this.cvecara != null)
        el.innerHTML=this.cvecara.Ime;
        else
        el.innerHTML="Nema";
        red2.appendChild(el);

        el = document.createElement("td");
        if(this.dostavljac != null)
        el.innerHTML=this.dostavljac.Ime;
        else
        el.innerHTML="Nema";
        red2.appendChild(el);

        tabela.appendChild(red);
        tabela.appendChild(red2);
        host.appendChild(tabela);
        tabela.setAttribute("border", 2);
    }

}