import { Dostave } from "./Dostave.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Kupovina } from "./Kupovina.js";
import { Zaposleni } from "./Zaposleni.js";

export class Cvecare{
    constructor(id, grad, ime, brojcveca, dostave){
        this.id = id;
        this.grad = grad;
        this.ime = ime;
        this.brojcveca = brojcveca;
        this.dostave = dostave;
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

    crtajCvecaru(host, vec){
            if(!host)
            throw new Exception("Ne postoji");

            this.kontejner = document.createElement("div");
            var kontejner2 = document.createElement("div");

            this.crtajFormu(kontejner2, vec);
            var dugmeCv = document.createElement("button");
            dugmeCv.innerHTML = this.ime+" ("+this.grad+")";
            this.kontejner.appendChild(dugmeCv);

            if(!vec){ host.appendChild(kontejner2);}
            host.appendChild(this.kontejner);

        }

    crtajFormu(host, vec){
            //forma za dostave
    if(vec == false){
    
var bigDiv = document.createElement("div");
bigDiv.className = "kontejner";

var forma = document.createElement("div");
forma.className = "formKlasa";
var input1 = document.createElement("input");
input1.type = "text";
var input2 = document.createElement("input");
input2.type = "text";
var input3 = document.createElement("input");
input3.type = "text";

var labela1 = document.createElement("label");
labela1.innerHTML = "Ime: ";
var labela2 = document.createElement("label");
labela2.innerHTML = "Grad: ";
var labela3 = document.createElement("label");
labela3.innerHTML = "Broj Cveca: ";

var dugmeJedan = document.createElement("button");
dugmeJedan.innerText = "Dodaj cvecaru!";

dugmeJedan.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajCvecaru/"+input1.value+"/"+input2.value+"/"+input3.value,
    { method: "POST",
    headers:{
        "Content-Type":"application/json",
    },
    body: JSON.stringify({
        ime:input1.value,
        grad:input2.value,
        brojCveca:input3.value
    })
}).then(s=>{
    console.log(s);
            if(s.ok){
                s.text().then(s=>{
                    alert(s);
                    cvecSelCrtaj();
var v = false;
var roditelj = host.parentNode;
roditelj.innerHTML = null;
fetch("https://localhost:5001/Cvecara/DobijCvecare/")
.then(p=>{
    p.json().then(cvecare=>{
        cvecare.forEach(cvecara => {
            console.log(cvecara);
            var p=new Cvecare(cvecara.id, cvecara.grad, cvecara.ime, cvecara.brojcveca);
            if(v == false) { p.crtajCvecaru(roditelj, false); v = true; }
            else {p.crtajCvecaru(roditelj, true); }
            
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
}

var dugmeDva = document.createElement("button");
dugmeDva.innerText = "Dobij cvecaru!";

function dobij(id){
    console.log(id);
    fetch("https://localhost:5001/Cvecara/DobijCvecaru/"+id,{ method: "GET"}).then(s=>{
        if(s.ok){
            console.log(s);
            s.json().then(p=>{
            p.forEach( pp=>{
                var cv = new Cvecare(pp.id, pp.grad, pp.ime, pp.brojCveca);
                console.log(cv);
                cv.crtaj(prazno);
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

dugmeDva.onclick = (ev) => dobij(cvecSel.options[cvecSel.selectedIndex].value);

var dugmeTri = document.createElement("button");
dugmeTri.innerText = "Izmeni cvecaru!";

dugmeTri.onclick = function(){
    dobij(cvecSel.options[cvecSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/PromeniCvecaru/"+cvecSel.options[cvecSel.selectedIndex].value+"/"+input1.value+"/"+input2.value+"/"+input3.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                dobij(cvecSel.options[cvecSel.selectedIndex].value);
                cvecSelCrtaj();


                var v = false;
var roditelj = host.parentNode;
roditelj.innerHTML = null;
fetch("https://localhost:5001/Cvecara/DobijCvecare/")
.then(p=>{
    p.json().then(cvecare=>{
        cvecare.forEach(cvecara => {
            console.log(cvecara);
            var p=new Cvecare(cvecara.id, cvecara.grad, cvecara.ime, cvecara.brojcveca);
            if(v == false) { p.crtajCvecaru(roditelj, false); v = true; }
            else {p.crtajCvecaru(roditelj, true); }
            
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
}

var dugmeCetiri = document.createElement("button");
dugmeCetiri.innerText = "Obrisi cvecaru!";

dugmeCetiri.onclick = function(){
    dobij(cvecSel.options[cvecSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/IzbrisiCvecaru/"+cvecSel.options[cvecSel.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                cvecSelCrtaj();


var v = false;
var roditelj = host.parentNode;
roditelj.innerHTML = null;
fetch("https://localhost:5001/Cvecara/DobijCvecare/")
.then(p=>{
    p.json().then(cvecare=>{
        cvecare.forEach(cvecara => {
            console.log(cvecara);
            var p=new Cvecare(cvecara.id, cvecara.grad, cvecara.ime, cvecara.brojcveca);
            if(v == false) { p.crtajCvecaru(roditelj, false); v = true; }
            else {p.crtajCvecaru(roditelj, true); }
            
        })
    })
})
            })}
            else{s.text().then(s=>{
                alert(s);})}
        }).catch(err=>{
            alert(err);
        });
}

var br1 = document.createElement("p");
var br2 = document.createElement("p");
var br3 = document.createElement("p");

forma.appendChild(labela1);
forma.appendChild(input1);
forma.appendChild(br1);
forma.appendChild(labela2);
forma.appendChild(input2);
forma.appendChild(br2);
forma.appendChild(labela3);
forma.appendChild(input3);
forma.appendChild(br3);
forma.appendChild(dugmeJedan);

var cvecSelDiv = document.createElement("p");
var cvecSel = cvecSelDiv.childNodes[0];

function cvecSelCrtaj(){
    if(!cvecSelDiv)
    throw new Error("Host je nedefinisan!");

    var provera = cvecSelDiv.innerHTML;

    if(provera != null){
        cvecSelDiv.innerHTML = null;
    }

var cvecSelFiktivni = document.createElement("select");
cvecSelFiktivni.className = "cvecSel";
fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Cvecare(pp.id, pp.grad, pp.ime, pp.brojCveca);
            var prom = document.createElement("option");
            prom.value = cv.id;
            prom.text = cv.ime;
            cvecSelFiktivni.appendChild(prom);
            console.log(prom);
        })
        })
    }});
    cvecSelDiv.appendChild(cvecSelFiktivni);
    console.log(cvecSelFiktivni);
    cvecSel = cvecSelFiktivni;
}

cvecSelCrtaj();
forma.appendChild(cvecSelDiv);

forma.appendChild(dugmeDva);
forma.appendChild(dugmeTri);
forma.appendChild(dugmeCetiri);

var prazno = document.createElement("p");
forma.appendChild(prazno);
host.appendChild(forma);

}

    }
    }

