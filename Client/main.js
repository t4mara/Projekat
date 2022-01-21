import { Cvecare } from "./Cvecare.js";
import { Dostave } from "./Dostave.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Menadzer } from "./Menadzer.js";
import { Zaposleni } from "./Zaposleni.js";


var selekcijaCetvrta = document.getElementById("dosdos");
var ssdss = document.createElement("select");
var oopptt = document.createElement("option");

fetch("https://localhost:5001/Cvecara/DobijDostavljace/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Dostavljaci(pp.ID, pp.Ime);
            oopptt = document.createElement("option");
            oopptt.value = cv.id;
            oopptt.text = cv.ime;
            ssdss.appendChild(oopptt);
        })
        })
    }})

selekcijaCetvrta.appendChild(ssdss);


var selectJedan = document.getElementById("cvecaruSel");
var prom2 = document.createElement("select");
var prom = document.createElement("option");
fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Cvecare(pp.ID, pp.Grad, pp.Ime, pp.BrojCveca);
            prom = document.createElement("option");
            prom.value = cv.id;
            prom.text = cv.ime;
            prom2.appendChild(prom);
        })
        })
    }})
selectJedan.appendChild(prom2);


var prvaSelekcija = document.getElementById("zcvecara");
var drugaSelekcija = document.getElementById("mcvecara");
var trecaSelekcija = document.getElementById("doscvec");
var pompom = document.createElement("select");
var pompom2 = document.createElement("select");
var pompom3 = document.createElement("select");

fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Cvecare(pp.ID, pp.Grad, pp.Ime, pp.BrojCveca);
            let asss = document.createElement("option");
            asss.value = cv.id;
            asss.text = cv.ime;
            pompom3.appendChild(asss);
        })
        })
    }})

fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
        if(s.ok){
            s.json().then(p=>{
                p.forEach( pp=>{
                var cv = new Cvecare(pp.ID, pp.Grad, pp.Ime, pp.BrojCveca);
                let askjdskdf = document.createElement("option");
                askjdskdf.value = cv.id;
                askjdskdf.text = cv.ime;
                pompom.appendChild(askjdskdf);
 })
 })
}})

fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
            if(s.ok){
                s.json().then(p=>{
                    p.forEach( pp=>{
                    var cv = new Cvecare(pp.ID, pp.Grad, pp.Ime, pp.BrojCveca);
                    let askj = document.createElement("option");
                    askj.value = cv.id;
                    askj.text = cv.ime;
                    pompom2.appendChild(askj);
})
})
}})
prvaSelekcija.appendChild(pompom);
drugaSelekcija.appendChild(pompom2);
trecaSelekcija.appendChild(pompom3);

var selectDva = document.getElementById("dostavljacSel");
var prom3 = document.createElement("select");
var prom4 = document.createElement("option");
fetch("https://localhost:5001/Cvecara/DobijDostavljace/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Dostavljaci(pp.ID, pp.Ime);
            prom4 = document.createElement("option");
            prom4.value = cv.id;
            prom4.text = cv.ime;
            prom3.appendChild(prom4);
        })
        })
    }})

selectDva.appendChild(prom3);

var selectTri= document.getElementById("dostavaSel");
var prom6 = document.createElement("select");
var prom5 = document.createElement("option");
fetch("https://localhost:5001/Cvecara/DobijDostave/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Dostave(pp.ID, pp.BrojCveca, pp.Dostavljaci, pp.Cvecare);
            prom5 = document.createElement("option");
            prom5.value = cv.id;
            prom5.text = cv.brojcveca;
            prom6.appendChild(prom5);
        })
        })
    }})

selectTri.appendChild(prom6);

var selectCetiri= document.getElementById("menadzerSel");
var prom8 = document.createElement("select");
var prom7 = document.createElement("option");
fetch("https://localhost:5001/Cvecara/DobijMenadzere/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Menadzer(pp.ID, pp.JMBG, pp.Ime, pp.Prezime, pp.Email, pp.Broj, pp.CvecaraID);
            prom7 = document.createElement("option");
            prom7.value = cv.id;
            prom7.text = cv.jmbg;
            prom8.appendChild(prom7);
        })
        })
    }})

selectCetiri.appendChild(prom8);

var selectPet= document.getElementById("zaposleniSel");
var prom10 = document.createElement("select");
var prom9 = document.createElement("option");
fetch("https://localhost:5001/Cvecara/DobijZaposlene/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Zaposleni(pp.ID, pp.JMBG, pp.Ime, pp.Prezime, pp.Grad, pp.Cvecara);
            prom9 = document.createElement("option");
            prom9.value = cv.id;
            prom9.text = cv.jmbg;
            prom10.appendChild(prom9);
        })
        })
    }})

selectPet.appendChild(prom10);

/* KRAJ SELECTOVA, POCETAK CVECARA */

var btn = document.getElementById("dodajCvecaru");
var jedan = document.getElementById("cname");
var dva = document.getElementById("cgrad");
var tri = document.getElementById("cbroj");

var mesto2 = document.getElementById("cvecaruDodaj");
/* 1 */
btn.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajCvecaru/"+jedan.value+"/"+dva.value+"/"+tri.value,{ method: "POST"}).then(s=>{
        if(s.ok){
            s.json().then(data=>{
                let cv = new Cvecare(data.ID, data.Grad, data.Ime, data.BrojCveca);
                cv.crtaj(mesto2);
            })
        }})
}
var btn2 = document.getElementById("navediCvecaru");
var mesto = document.getElementById("cvecaruStampaj");

/* 2 */
function dobij(){
    fetch("https://localhost:5001/Cvecara/DobijCvecaru/"+prom2.options[prom2.selectedIndex].value,{ method: "GET"}).then(s=>{
        if(s.ok){
            /*var teloTabele = this.obrisiPrethodniSadrzaj();*/
            s.json().then(s=>{
                let cv = new Cvecare(s.ID, s.Grad, s.Ime, s.BrojCveca);
                console.log(cv);
                cv.crtaj(mesto);
            })
        }})
}

btn2.onclick = (ev) => dobij();

/* 3 */
var btn3 = document.getElementById("obrisiCvecaru");
btn3.onclick = function(){
    dobij();
    fetch("https://localhost:5001/Cvecara/IzbrisiCvecaru/"+prom2.options[prom2.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            /*var teloTabele = this.obrisiPrethodniSadrzaj();*/
            s.json().then(s=>{
                let cv = new Cvecare(s.ID, s.Grad, s.Ime, s.BrojCveca);
            })
        }})
}

/* 4 */
var btn4 = document.getElementById("izmeniCvecaru");
btn4.onclick = function(){
    fetch("https://localhost:5001/Cvecara/PromeniCvecaru/"+prom2.options[prom2.selectedIndex].value+"/"+jedan.value+"/"+dva.value+"/"+tri.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Cvecare(s.ID, jedan.value, dva.value, tri.value);
            })
        }})
        dobij();
}

/* KRAJ CVECARA, POCETAK DOSTAVLJACA */


var btn5 = document.getElementById("dodajDostavljaca");
var cetiri = document.getElementById("imedost");

var mestoDva = document.getElementById("dostavljacaDodaj");
/* 1 */
btn5.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajDostavljaca/"+cetiri.value,{ method: "POST"}).then(s=>{
        if(s.ok){
            s.json().then(data=>{
                let cv = new Dostavljaci(data.ID, data.Ime);
            })
        }})
}

function dobijDostlj(){
    fetch("https://localhost:5001/Cvecara/DobijDostavljaca/"+prom3.options[prom3.selectedIndex].value,{ method: "GET"}).then(s=>{
        if(s.ok){
            /*var teloTabele = this.obrisiPrethodniSadrzaj();*/
            s.json().then(s=>{
                let cv = new Dostavljaci(s.ID, s.Ime);
                cv.crtaj(mestoDva);
            })
        }})
}
var btn6 = document.getElementById("navediDostavljaca");
btn6.onclick = (ev) => dobijDostlj();

var btn7 = document.getElementById("obrisiDostavljaca");
btn7.onclick = function(){
    dobijDostlj();
    fetch("https://localhost:5001/Cvecara/IzbrisiDostavljaca/"+prom3.options[prom3.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Dostavljaci(s.ID, s.Ime);
            })
        }})
}

var btn8 = document.getElementById("izmeniDostavljaca");
btn8.onclick = function(){
    fetch("https://localhost:5001/Cvecara/PromeniDostavljaca/"+prom3.options[prom3.selectedIndex].value+"/"+cetiri.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Dostavljaci(s.ID, s.Ime);
            })
        }})
        dobijDostlj();
}

/* KRAJ DOSTAVLJACA POCETAK ZAPOSLENIH */

var btn9 = document.getElementById("dodajZaposlenog");

var pet = document.getElementById("jmbgz");
var sest = document.getElementById("zgrad");
var sedam = document.getElementById("zime");
var osam = document.getElementById("zprezime");

var mestoTri = document.getElementById("zaposlenogDodaj");
/* 1 */

btn9.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajZaposlenog/"+pompom.options[pompom.selectedIndex].value+"/"+pet.value+"/"+sedam.value+"/"+osam.value+"/"+sest.value,{ method: "POST"}).then(s=>{
        if(s.ok){
            s.json().then(data=>{
                let cv = new Zaposleni(data.ID, data.JMBG, data.Ime, data.Prezime, data.Grad, data.Cvecare);
            })
        }})
}

function dobijZap(){
    fetch("https://localhost:5001/Cvecara/DobijZaposlenog/"+prom10.options[prom10.selectedIndex].value,{ method: "GET"}).then(s=>{
        if(s.ok){
            /*var teloTabele = this.obrisiPrethodniSadrzaj();*/
            s.json().then(s=>{
                let cv = new Zaposleni(s.ID, s.JMBG, s.Ime, s.Prezime, s.Grad, s.Cvecare);
                cv.crtaj(mestoTri);
            })
        }})
}
var btn10 = document.getElementById("navediZaposlenog");
btn10.onclick = (ev) => dobijZap();

var btn11 = document.getElementById("obrisiZaposlenog");
btn11.onclick = function(){
    dobijZap();
    fetch("https://localhost:5001/Cvecara/IzbrisiZaposlenog/"+prom10.options[prom10.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Zaposleni(s.ID, s.JMBG, s.Ime, s.Prezime, s.Grad, s.Cvecare);
            })
        }})
}

var btn12 = document.getElementById("izmeniZaposlenog");
btn12.onclick = function(){
    fetch("https://localhost:5001/Cvecara/PromeniZaposlenog/"+prom10.options[prom10.selectedIndex].value+"/"+pompom.options[pompom.selectedIndex].value+"/"+pet.value+"/"+sedam.value+"/"+osam.value+"/"+sest.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Zaposleni(s.ID, s.JMBG, s.Ime, s.Prezime, s.Grad, s.Cvecare);
                cv.crtaj(mestoTri);
            })
        }})
}

/* KRAJ ZAPOSLENIH POCETAK MENADZERA */

var btn13 = document.getElementById("dodajMenadzera");

var devet = document.getElementById("jmbgm");
var deset = document.getElementById("mime");
var jedanaest = document.getElementById("mprezime");
var dvanaest = document.getElementById("mmejl");
var trinaest = document.getElementById("mgrad");
var mestoPet = document.getElementById("menadzeraDodaj");


/* 1 */
btn13.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajMenadzera/"+devet.value+"/"+deset.value+"/"+jedanaest.value+"/"+dvanaest.value+"/"+trinaest.value+"/"+pompom2.options[pompom2.selectedIndex].value,{ method: "POST"}).then(s=>{
        if(s.ok){
            s.json().then(data=>{
                let cv = new Menadzer(data.ID, data.JMBG, data.Ime, data.Prezime, data.Email, data.Broj, data.CvecaraID, data.Cvecare);
            })
        }})
}

function dobijMen(){
    fetch("https://localhost:5001/Cvecara/DobijMenadzera/"+prom8.options[prom8.selectedIndex].value,{ method: "GET"}).then(s=>{
        if(s.ok){
            /*var teloTabele = this.obrisiPrethodniSadrzaj();*/
            s.json().then(s=>{
                let cv = new Menadzer(s.ID, s.JMBG, s.Ime, s.Prezime, s.Email, s.Broj, s.CvecaraID, s.Cvecare);
                cv.crtaj(mestoPet);
            })
        }})
}
var btn14 = document.getElementById("navediMenadzera");
btn14.onclick = (ev) => dobijMen();

var btn15 = document.getElementById("obrisiMenadzera");
btn15.onclick = function(){
    dobijMen();
    fetch("https://localhost:5001/Cvecara/IzbrisiMenadzera/"+prom8.options[prom8.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Menadzer(s.ID, s.JMBG, s.Ime, s.Prezime, s.Email, s.Broj, s.CvecaraID, s.Cvecare);
            })
        }})
}

var btn16 = document.getElementById("izmeniMenadzera");
btn16.onclick = function(){
    fetch("https://localhost:5001/Cvecara/PromeniMenadzera/"+prom8.options[prom8.selectedIndex].value+"/"+devet.value+"/"+deset.value+"/"+jedanaest.value+"/"+dvanaest.value+"/"+trinaest.value+"/"+pompom2.options[pompom2.selectedIndex].value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Menadzer(s.ID, s.JMBG, s.Ime, s.Prezime, s.Email, s.Broj, s.CvecaraID, s.Cvecare);
                cv.crtaj(mestoPet);
            })
        }})
}

/* KRAJ MENADZERA POCETAK DOSTAVA */

var btn17 = document.getElementById("dodajDostavu");

var cetrnaest = document.getElementById("dosbroj");


var mestoCetiri = document.getElementById("dostavuDodaj");
/* 1 */
btn17.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajDostavu/"+pompom3.options[pompom3.selectedIndex].value+"/"+ssdss.options[ssdss.selectedIndex].value+"/"+cetrnaest.value,{ method: "POST"}).then(s=>{
        if(s.ok){
            s.json().then(data=>{
                let cv = new Dostave(data.ID, data.BrojCveca, data.Dostavljaci, data.Cvecare);
            })
        }})
}

function dobijDost(){
    fetch("https://localhost:5001/Cvecara/DobijDostavu/"+prom6.options[prom6.selectedIndex].value,{ method: "GET"}).then(s=>{
        if(s.ok){
            /*var teloTabele = this.obrisiPrethodniSadrzaj();*/
            s.json().then(s=>{
                let cv = new Dostave(s.ID, s.BrojCveca, s.Dostavljaci, s.Cvecare);
                cv.crtaj(mestoCetiri);
            })
        }})
}
var btn18 = document.getElementById("navediDostavu");
btn18.onclick = (ev) => dobijDost();

var btn19 = document.getElementById("obrisiDostavu");
btn19.onclick = function(){
    dobijDost();
    fetch("https://localhost:5001/Cvecara/IzbrisiDostavu/"+prom6.options[prom6.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Dostave(s.ID, s.BrojCveca, s.Dostavljaci, s.Cvecare);
            })
        }})
}

var btn20 = document.getElementById("izmeniDostavu");
btn20.onclick = function(){
    fetch("https://localhost:5001/Cvecara/PromeniDostavu/"+prom6.options[prom6.selectedIndex].value+"/"+pompom3.options[pompom3.selectedIndex].value+"/"+ssdss.options[ssdss.selectedIndex].value+"/"+cetrnaest.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Dostave(s.ID, s.BrojCveca, s.Dostavljaci, s.Cvecare);
                cv.crtaj(mestoCetiri);
            })
        }})
}

/* KRAJ DOSTAVA */