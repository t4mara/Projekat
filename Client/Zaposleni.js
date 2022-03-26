import { Cvecare } from "./Cvecare.js";
import { Dostave } from "./Dostave.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Kupovina } from "./Kupovina.js";

export class Zaposleni{
    constructor(id, jmbg, ime, prezime, grad, cvecara){
        this.id = id;
        this.jmbg = jmbg;
        this.ime = ime;
        this.prezime = prezime;
        this.grad = grad;
        this.cvecara = cvecara;
        this.kontejner = null;
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
        el5.innerHTML=this.cvecara.ime;
        else
        el5.innerHTML="Nema";
        red2.appendChild(el5);

        tabela.appendChild(red);
        tabela.appendChild(red2);
        host.appendChild(tabela);
        tabela.setAttribute("border", 2);
    }

    crtajFormu(host){
        
var forma3 = document.createElement("div");
forma3.className = "formKlasa";

var labela5 = document.createElement("label");
labela5.innerHTML = "JMBG: ";
var input5 = document.createElement("input");
input5.type = "text";
var labela6 = document.createElement("label");
labela6.innerHTML = "Grad: ";
var input6 = document.createElement("input");
input6.type = "text";
var labela7 = document.createElement("label");
labela7.innerHTML = "Ime: ";
var input7 = document.createElement("input");
input7.type = "text";
var labela8 = document.createElement("label");
labela8.innerHTML = "Prezime: ";
var input8 = document.createElement("input");
input8.type = "text";
var labela9 = document.createElement("label");
labela9.innerHTML = "Cvecara: "

forma3.appendChild(labela5);
forma3.appendChild(input5);
var br9 = document.createElement("p");
forma3.appendChild(br9);
forma3.appendChild(labela6);
forma3.appendChild(input6);
var br10 = document.createElement("p");
forma3.appendChild(br10);
forma3.appendChild(labela7);
forma3.appendChild(input7);
var br11 = document.createElement("p");
forma3.appendChild(br11);
forma3.appendChild(labela8);
forma3.appendChild(input8);
var br12 = document.createElement("p");
forma3.appendChild(br12);
forma3.appendChild(labela9);

var cvecSelDiv2 = document.createElement("p");
var cvecSel2 = cvecSelDiv2.childNodes[0];

function cvecSelCrtaj2(){
    if(!cvecSelDiv2)
    throw new Error("Host je nedefinisan!");

    var provera = cvecSelDiv2.innerHTML;

    if(provera != null){
        cvecSelDiv2.innerHTML = null;
    }
var cvecSel2Fik = document.createElement("select");
cvecSelDiv2.appendChild(cvecSel2Fik);

fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Cvecare(pp.id, pp.grad, pp.ime, pp.brojCveca);
            var opt2 = document.createElement("option");
            opt2.value = cv.id;
            opt2.text = cv.ime;
            cvecSel2Fik.appendChild(opt2);
        })
        })
    }})
cvecSel2 = cvecSel2Fik;
}
cvecSelCrtaj2();
forma3.appendChild(cvecSelDiv2);

var dugmeDevet = document.createElement("button");
dugmeDevet.innerHTML = "Dodaj zaposlenog!";
dugmeDevet.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajZaposlenog/"+cvecSel2.options[cvecSel2.selectedIndex].value+"/"+input5.value+"/"+input7.value+"/"+input8.value+"/"+input6.value,{
        method: "POST"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                zapSelCrtaj();

                var v = false;
                var roditelj = host.parentNode;
                roditelj.innerHTML = null;
                fetch("https://localhost:5001/Cvecara/DobijZaposlene/")
                .then(p=>{
                    p.json().then(dostave=>{
                        dostave.forEach(dostava => {
                            console.log(dostava);
                            var p=new Zaposleni(dostava.id, dostava.jmbg, dostava.ime, dostava.prezime, dostava.grad, dostava.cvecara);
                            if(v == false) { p.crtajZaposlenog(roditelj, false); v = true; }
                            else {p.crtajZaposlenog(roditelj, true); }
                            
                        })
                    })
                })
            })
        }
        else{s.text().then(s=>{
            alert(s);})}
    }).catch(err=>{
            alert(err);
        });
        return;
}
forma3.appendChild(dugmeDevet);
var zapSelDiv = document.createElement("p");
forma3.appendChild(zapSelDiv);
var zapSel = zapSelDiv.childNodes[0];

function zapSelCrtaj(){
    if(!zapSelDiv)
    throw new Error("Host je nedefinisan!");

    var provera = zapSelDiv.innerHTML;

    if(provera != null){
        zapSelDiv.innerHTML = null;
    }

var zapSelTemp = document.createElement("select");
zapSelDiv.appendChild(zapSelTemp);
fetch("https://localhost:5001/Cvecara/DobijZaposlene/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Zaposleni(pp.id, pp.jmbg, pp.ime, pp.prezime, pp.grad, pp.cvecara);
            var opt3 = document.createElement("option");
            opt3.value = cv.id;
            opt3.text = cv.jmbg;
            zapSelTemp.appendChild(opt3);
        })
        })
    }})
zapSel = zapSelTemp;
}
zapSelCrtaj();

var dugmeDeset = document.createElement("button");
dugmeDeset.innerHTML = "Dobij zaposlenog!";
forma3.appendChild(dugmeDeset);

function dobijZap(id){
    fetch("https://localhost:5001/Cvecara/DobijZaposlenog/"+id,{ method: "GET"}).then(s=>{
        if(s.ok){
            s.json().then(p=>{
            p.forEach( pp=>{
                let cv = new Zaposleni(pp.id, pp.jmbg, pp.ime, pp.prezime, pp.grad, pp.cvecare);
                cv.crtaj(prazno3);
                console.log(cv);
            })})
        }
        else{s.text().then(s=>{
            alert(s);})}
    }).catch(err=>{
            alert(err);
        });
        return;
}
dugmeDeset.onclick = (ev) => dobijZap(zapSel.options[zapSel.selectedIndex].value);

var dugmeJedanaest = document.createElement("button");
dugmeJedanaest.innerHTML = "Izmeni zaposlenog!";
forma3.appendChild(dugmeJedanaest);

dugmeJedanaest.onclick = function(){
dobijZap(zapSel.options[zapSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/PromeniZaposlenog/"+zapSel.options[zapSel.selectedIndex].value+"/"+cvecSel2.options[cvecSel2.selectedIndex].value+"/"+input5.value+"/"+input7.value+"/"+input8.value+"/"+input6.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                dobijZap(zapSel.options[zapSel.selectedIndex].value);
                alert(s);
                zapSelCrtaj();

                var v = false;
                var roditelj = host.parentNode;
                roditelj.innerHTML = null;
                fetch("https://localhost:5001/Cvecara/DobijZaposlene/")
                .then(p=>{
                    p.json().then(dostave=>{
                        dostave.forEach(dostava => {
                            console.log(dostava);
                            var p=new Zaposleni(dostava.id, dostava.jmbg, dostava.ime, dostava.prezime, dostava.grad, dostava.cvecara);
                            if(v == false) { p.crtajZaposlenog(roditelj, false); v = true; }
                            else {p.crtajZaposlenog(roditelj, true); }
                            
                        })
                    })
                })
            })
        }
        else{s.text().then(s=>{
            alert(s);})}
    }).catch(err=>{
            alert(err);
        });
        return;
}

var dugmeDvanaest = document.createElement("button");
dugmeDvanaest.innerHTML = "Obrisi zaposlenog!";
forma3.appendChild(dugmeDvanaest);

dugmeDvanaest.onclick = function(){
dobijZap(zapSel.options[zapSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/IzbrisiZaposlenog/"+zapSel.options[zapSel.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                zapSelCrtaj();

                var v = false;
                var roditelj = host.parentNode;
                roditelj.innerHTML = null;
                fetch("https://localhost:5001/Cvecara/DobijZaposlene/")
                .then(p=>{
                    p.json().then(dostave=>{
                        dostave.forEach(dostava => {
                            console.log(dostava);
                            var p=new Zaposleni(dostava.id, dostava.jmbg, dostava.ime, dostava.prezime, dostava.grad, dostava.cvecara);
                            if(v == false) { p.crtajZaposlenog(roditelj, false); v = true; }
                            else {p.crtajZaposlenog(roditelj, true); }
                            
                        })
                    })
                })
            })
        }
        else{s.text().then(s=>{
            alert(s);})}
    }).catch(err=>{
            alert(err);
        });
        return;
}

var prazno3 = document.createElement("p");
forma3.appendChild(prazno3);
host.appendChild(forma3);


    }


crtajZaposlenog(host, vec){
    if(!host)
    throw new Exception("Ne postoji");

    this.kontejner = document.createElement("div");
    var kontejner2 = document.createElement("div");

    this.crtajFormu(kontejner2, vec);
    var dugmeD = document.createElement("button");
    dugmeD.innerHTML = this.ime+" "+this.prezime;
    this.kontejner.appendChild(dugmeD);

    if(!vec){ host.appendChild(kontejner2);}
    host.appendChild(this.kontejner);

}

}