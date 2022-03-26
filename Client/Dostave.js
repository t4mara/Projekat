import { Cvecare } from "./Cvecare.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Kupovina } from "./Kupovina.js";
import { Zaposleni } from "./Zaposleni.js";

export class Dostave{
    constructor(id, brojcveca, dostavljac, cvecara){
        this.id = id;
        this.brojcveca = brojcveca;
        this.dostavljac = dostavljac;
        this.cvecara = cvecara;
    }

    crtajDostavu(host, vec){
        if(!host)
        throw new Exception("Ne postoji");

        this.kontejner = document.createElement("div");
        var kontejner2 = document.createElement("div");

        this.crtajFormu(kontejner2);
        var dugmeD = document.createElement("button");
        
        dugmeD.innerHTML = this.cvecara.ime+" / "+this.dostavljac.ime;
        this.kontejner.appendChild(dugmeD);

        if(!vec){ host.appendChild(kontejner2);}
        host.appendChild(this.kontejner);

    }
    
    crtajFormu(host){
                    
var forma4 = document.createElement("div");
forma4.className = "formKlasa";
var input9 = document.createElement("input");
input9.type = "text";
var labela10 = document.createElement("label");
labela10.innerHTML = "Broj Cveca: ";
forma4.appendChild(labela10);
forma4.appendChild(input9);
var br16 = document.createElement("p");
forma4.appendChild(br16);
var labela11 = document.createElement("label");
labela11.innerHTML = "Cvecara: ";
forma4.appendChild(labela11);


var cvecSelDiv3 = document.createElement("p");
forma4.appendChild(cvecSelDiv3);
var cvecSel3 = cvecSelDiv3.childNodes[0];


function cvecSelCrtaj3(){
    if(!cvecSelDiv3)
    throw new Error("Host je nedefinisan!");

    var provera = cvecSelDiv3.innerHTML;

    if(provera != null){
        cvecSelDiv3.innerHTML = null;
    }
var cvecSel3Fik = document.createElement("select");
fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
        if(s.ok){
            s.json().then(p=>{
                p.forEach( pp=>{
                var cv = new Cvecare(pp.id, pp.grad, pp.ime, pp.brojCveca);
                var opt5 = document.createElement("option");
                opt5.value = cv.id;
                opt5.text = cv.ime;
                cvecSel3Fik.appendChild(opt5);
 })
 })
}})
cvecSelDiv3.appendChild(cvecSel3Fik);
cvecSel3 = cvecSel3Fik;
}
cvecSelCrtaj3();


var labela12 = document.createElement("label");
labela12.innerHTML = "Dostavljac: ";
forma4.appendChild(labela12);

var dostavljaciSelDiv2 = document.createElement("p");
var dostavljaciSel2 = dostavljaciSelDiv2.childNodes[0];

function dostavljaciSel2Crtaj(){
    if(!dostavljaciSelDiv2)
    throw new Error("Host je nedefinisan!");

    var provera = dostavljaciSelDiv2.innerHTML;

    if(provera != null){
        dostavljaciSelDiv2.innerHTML = null;
    }
var dostavljaciSel2Fik = document.createElement("select");
fetch("https://localhost:5001/Cvecara/DobijDostavljace/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Dostavljaci(pp.id, pp.ime);
            var opt4 = document.createElement("option");
            opt4.value = cv.id;
            opt4.text = cv.ime;
            dostavljaciSel2Fik.appendChild(opt4);
        })
        })
    }})
dostavljaciSelDiv2.appendChild(dostavljaciSel2Fik);
dostavljaciSel2 = dostavljaciSel2Fik;
}
dostavljaciSel2Crtaj();


forma4.appendChild(dostavljaciSelDiv2);
var dugmeTrinaest = document.createElement("button");
dugmeTrinaest.innerHTML = "Dodaj dostavu!";

dugmeTrinaest.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajDostavu/"+cvecSel3.options[cvecSel3.selectedIndex].value+"/"+dostavljaciSel2.options[dostavljaciSel2.selectedIndex].value+"/"+input9.value,{
         method: "POST"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                dostavaSelCrtaj();


var v = false;
var roditelj = host.parentNode;
roditelj.innerHTML = null;
fetch("https://localhost:5001/Cvecara/DobijDostave/")
.then(p=>{
    p.json().then(dostave=>{
        dostave.forEach(dostava => {
            console.log(dostava);
            var p=new Dostave(dostava.id, dostava.brojCveca, dostava.dostavljaci, dostava.cvecare);
            if(v == false) { p.crtajDostavu(roditelj, false); v = true; }
            else {p.crtajDostavu(roditelj, true); }
            
        })
    })
})
            });
        }
        else{s.text().then(s=>{
            alert(s);})}
    }).catch(err=>{
            alert(err);
        });
        return;
}
forma4.appendChild(dugmeTrinaest);

var dostavaSelDiv = document.createElement("p");
var dostavaSel = dostavaSelDiv.childNodes[0];

function dostavaSelCrtaj(){
    if(!dostavaSelDiv)
    throw new Error("Host je nedefinisan!");

    var provera = dostavaSelDiv.innerHTML;

    if(provera != null){
        dostavaSelDiv.innerHTML = null;
    }

var dostavaSelFik = document.createElement("select");
fetch("https://localhost:5001/Cvecara/DobijDostave/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Dostave(pp.id, pp.brojCveca, pp.dostavljaci, pp.cvecare);
            var opt6 = document.createElement("option");
            opt6.value = cv.id;
            opt6.text = cv.brojcveca;
            dostavaSelFik.appendChild(opt6);
        })
        })
    }})
dostavaSelDiv.appendChild(dostavaSelFik);
dostavaSel = dostavaSelFik;
}
dostavaSelCrtaj();

forma4.appendChild(dostavaSelDiv);


var dugmeCetrnaest = document.createElement("button");
dugmeCetrnaest.innerHTML = "Dobij dostavu!";
forma4.appendChild(dugmeCetrnaest);

function dobijDost(id){
    fetch("https://localhost:5001/Cvecara/DobijDostavu/"+id,{ method: "GET"}).then(s=>{
        if(s.ok){
            console.log(s);
            s.json().then(p=>{
            p.forEach( pp=>{
                let cv = new Dostave(pp.id, pp.brojCveca, pp.dostavljaci, pp.cvecare);
                cv.crtaj(prazno4);
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
dugmeCetrnaest.onclick = (ev) => dobijDost(dostavaSel.options[dostavaSel.selectedIndex].value);

var dugmePetnaest = document.createElement("button");
dugmePetnaest.innerHTML = "Izmeni dostavu!";
forma4.appendChild(dugmePetnaest);

dugmePetnaest.onclick = function(){
dobijDost(dostavaSel.options[dostavaSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/PromeniDostavu/"+dostavaSel.options[dostavaSel.selectedIndex].value+"/"+cvecSel3.options[cvecSel3.selectedIndex].value+"/"+dostavljaciSel2.options[dostavljaciSel2.selectedIndex].value+"/"+input9.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                dobijDost(dostavaSel.options[dostavaSel.selectedIndex].value);
                alert(s);
                dostavaSelCrtaj();

                var v = false;
var roditelj = host.parentNode;
roditelj.innerHTML = null;
fetch("https://localhost:5001/Cvecara/DobijDostave/")
.then(p=>{
    p.json().then(dostave=>{
        dostave.forEach(dostava => {
            console.log(dostava);
            var p=new Dostave(dostava.id, dostava.brojCveca, dostava.dostavljaci, dostava.cvecare);
            if(v == false) { p.crtajDostavu(roditelj, false); v = true; }
            else {p.crtajDostavu(roditelj, true); }
            
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

var dugmeSesnaest = document.createElement("button");
dugmeSesnaest.innerHTML = "Obrisi dostavu!";

dugmeSesnaest.onclick = function(){
dobijDost(dostavaSel.options[dostavaSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/IzbrisiDostavu/"+dostavaSel.options[dostavaSel.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                dostavaSelCrtaj();

                var v = false;
var roditelj = host.parentNode;
roditelj.innerHTML = null;
fetch("https://localhost:5001/Cvecara/DobijDostave/")
.then(p=>{
    p.json().then(dostave=>{
        dostave.forEach(dostava => {
            console.log(dostava);
            var p=new Dostave(dostava.id, dostava.brojCveca, dostava.dostavljaci, dostava.cvecare);
            if(v == false) { p.crtajDostavu(roditelj, false); v = true; }
            else {p.crtajDostavu(roditelj, true); }
            
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
forma4.appendChild(dugmeSesnaest);
var prazno4 = document.createElement("p");
forma4.appendChild(prazno4);
host.appendChild(forma4);

    }

    crtaj(host, cvecara, dostavljac){
        if(!host)
        throw new Error("Host je nedefinisan!");

        var provera = host.innerHTML;

        if(provera != null){
            host.innerHTML = null;
        }

        var tabela = document.createElement("table");
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
        el.innerHTML=this.cvecara.ime;
        else
        el.innerHTML="Nema";
        red2.appendChild(el);

        el = document.createElement("td");
        if(this.dostavljac != null)
        el.innerHTML=this.dostavljac.ime;
        else
        el.innerHTML="Nema";
        red2.appendChild(el);

        tabela.appendChild(red);
        tabela.appendChild(red2);
        host.appendChild(tabela);
        tabela.setAttribute("border", 2);
    }

}