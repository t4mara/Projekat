import { Dostave } from "./Dostave.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Menadzer } from "./Menadzer.js";
import { Zaposleni } from "./Zaposleni.js";

export class Cvecare{
    constructor(id, grad, ime, brojcveca){
        this.id = id;
        this.grad = grad;
        this.ime = ime;
        this.brojcveca = brojcveca;
        this.Container = null;
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
        e.innerHTML="Ime";
        red.appendChild(e);

        
        e= document.createElement("th");
        e.innerHTML="Grad";
        red.appendChild(e);

        e= document.createElement("th");
        e.innerHTML="Broj Cveca";
        red.appendChild(e);

        this.Container = tabela;

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

ucitajCvecaru(ID){
    fetch("https://localhost:5001/Cvecara/DobijCvecaru/"+ID,{ method: "GET"}).then(s=>{
        if(s.ok){
            var teloTabele = this.obrisiPrethodniSadrzaj();
            s.json().then(data=>{
            data.forEach(s=>{
                let cv = new Cvecare(s.ID, s.Grad, s.Ime, s.BrojCveca);
                cv.crtaj(document.body);
            })
        })}
    })
}

dodajCvecaru(ime, grad, brojCveca){
    fetch("https://localhost:5001/Cvecara/DodajCvecaru/"+ime+"/"+grad+"/",brojCveca,{ method: "PUT"}).then(s=>{
        if(s.ok){
            var teloTabele = this.obrisiPrethodniSadrzaj();
            s.json().then(data=>{
            data.forEach(s=>{
                let cv = new Cvecare(s.ID, s.Grad, s.Ime, s.BrojCveca);
                cv.crtaj(document.body);
            })
        })}
    })
}

obrisiPrethodniSadrzaj(){
    var teloTabele = document.querySelector(".tabelaPodaci");
    var roditelj = teloTabele.parentNode;
    roditelj.removeChild(teloTabele);

    teloTabele = document.createElement("tbody");
    teloTabele.className = "tabelaPodaci";
    roditelj.appendChild(teloTabele);
    return teloTabele;
}

ime(){ return this.ime; }
}