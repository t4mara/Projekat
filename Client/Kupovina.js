import { Cvecare } from "./Cvecare.js";
import { Dostave } from "./Dostave.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Zaposleni } from "./Zaposleni.js";

export class Kupovina{
    constructor(id, brojKupljenogCveca, imeKupca, datum, potrosenNovac, cvecare){
        this.id = id;
        this.brojKupljenogCveca = brojKupljenogCveca;
        this.imeKupca = imeKupca;
        this.datum = datum;
        this.potrosenNovac = potrosenNovac;
        this.cvecare = cvecare;
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
        e.innerHTML="Broj kupljenog cveca";
        red.appendChild(e);

        let f= document.createElement("th");
        f.innerHTML="Ime kupca";
        red.appendChild(f);

        let g= document.createElement("th");
        g.innerHTML="Datum kupovine";
        red.appendChild(g);

        let h= document.createElement("th");
        h.innerHTML="Potrosen novac";
        red.appendChild(h);

        let j= document.createElement("th");
        j.innerHTML="Cvecara";
        red.appendChild(j);

        var red2 = document.createElement("tr");

        let el=document.createElement("td");
        el.innerHTML=this.brojKupljenogCveca;
        red2.appendChild(el);

        let el2=document.createElement("td");
        el2.innerHTML=this.imeKupca;
        red2.appendChild(el2);

        let el3=document.createElement("td");
        el3.innerHTML=this.datum;
        red2.appendChild(el3);

        let el5=document.createElement("td");
        el5.innerHTML=this.potrosenNovac;
        red2.appendChild(el5);

        let el6=document.createElement("td");
        if(this.cvecare != null)
        el6.innerHTML=this.cvecare.ime;
        else
        el6.innerHTML="Nema";
        red2.appendChild(el6);

        tabela.appendChild(red);
        tabela.appendChild(red2);
        host.appendChild(tabela);
        tabela.setAttribute("border", 2);
    }
}