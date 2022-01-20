import { Cvecare } from "./Cvecare.js";
import { Dostave } from "./Dostave.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Menadzer } from "./Menadzer.js";

export class Zaposleni{
    constructor(id, jmbg, ime, prezime, grad, cvecara){
        this.id = id;
        this.jmbg = jmbg;
        this.ime = ime;
        this.prezime = prezime;
        this.grad = grad;
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

        let e2= document.createElement("th");
        e2.innerHTML="Ime";
        red.appendChild(e2);

        let e3= document.createElement("th");
        e3.innerHTML="Prezime";
        red.appendChild(e3);

        let e4= document.createElement("th");
        e4.innerHTML="Grad";
        red.appendChild(e4);

        let e5= document.createElement("th");
        e5.innerHTML="Cvecara";
        red.appendChild(e5);

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
        el4.innerHTML=this.grad;
        red2.appendChild(el4);

        let el5=document.createElement("td");
        if(this.cvecara != null)
        el5.innerHTML=this.cvecara.Ime;
        else
        el5.innerHTML="Nema";
        red2.appendChild(el5);

        tabela.appendChild(red);
        tabela.appendChild(red2);
        host.appendChild(tabela);
        tabela.setAttribute("border", 2);
    }
}