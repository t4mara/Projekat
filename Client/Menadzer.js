import { Cvecare } from "./Cvecare.js";
import { Dostave } from "./Dostave.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Zaposleni } from "./Zaposleni.js";

export class Menadzer{
    constructor(id, jmbg, ime, prezime, email, broj, cvecaraid, cvecara){
        this.id = id;
        this.jmbg = jmbg;
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.broj = broj;
        this.cvecaraid = cvecaraid;
        this.cvecara = cvecara;
    }
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
        e.innerHTML="JMBG";
        red.appendChild(e);

        let f= document.createElement("th");
        f.innerHTML="Ime";
        red.appendChild(f);

        let g= document.createElement("th");
        g.innerHTML="Prezime";
        red.appendChild(g);

        let h= document.createElement("th");
        h.innerHTML="Email";
        red.appendChild(h);

        let i= document.createElement("th");
        i.innerHTML="Broj";
        red.appendChild(i);

        let j= document.createElement("th");
        j.innerHTML="Cvecara";
        red.appendChild(j);

        this.Container = tabela;

        var red2 = document.createElement("tr");

        let el=document.createElement("td");
        el.innerHTML=this.jmbg;
        red2.appendChild(el);

        let el2=document.createElement("td");
        el2.innerHTML=this.ime;
        red2.appendChild(el2);

        let el3=document.createElement("td");
        el3.innerHTML=this.prezime;
        red2.appendChild(el3);

        let el4=document.createElement("td");
        el4.innerHTML=this.email;
        red2.appendChild(el4);

        let el5=document.createElement("td");
        el5.innerHTML=this.broj;
        red2.appendChild(el5);

        let el6=document.createElement("td");
        if(this.cvecara != null)
        el6.innerHTML=this.cvecara.Ime;
        else
        el6.innerHTML="Nema";
        red2.appendChild(el6);

        tabela.appendChild(red);
        tabela.appendChild(red2);
        host.appendChild(tabela);
        tabela.setAttribute("border", 2);
    }
}