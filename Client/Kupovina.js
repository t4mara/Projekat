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

    crtajFormu(host){
        
var forma5 = document.createElement("div");
forma5.className = "formKlasa";
var input10 = document.createElement("input");
input10.type = "text";
var labela13 = document.createElement("label");
labela13.innerHTML = "Broj kupljenog cveca: ";
forma5.appendChild(labela13);
forma5.appendChild(input10);
var br23 = document.createElement("p");
forma5.appendChild(br23);

var labela16 = document.createElement("label");
labela16.innerHTML = "Ime kupca: ";
var input12 = document.createElement("input");
forma5.appendChild(labela16);
forma5.appendChild(input12);
var br27 = document.createElement("p");
forma5.appendChild(br27);

var labela17 = document.createElement("label");
labela17.innerHTML = "Datum: ";
var input13 = document.createElement("input");
input13.type = "datetime-local";
forma5.appendChild(labela17);
forma5.appendChild(input13);
var br28 = document.createElement("p");
forma5.appendChild(br28);

var input11 = document.createElement("input");
input11.type = "text";
var labela14 = document.createElement("label");
labela14.innerHTML = "Potrosen novac: ";
forma5.appendChild(labela14);
forma5.appendChild(input11);

var labela15 = document.createElement("label");
labela15.innerHTML = "Cvecara: ";
var cvecSelDiv4 = document.createElement("p");
var cvecSel4 = cvecSelDiv4.childNodes[0];

function cvecSelCrtaj4(){
    if(!cvecSelDiv4)
    throw new Error("Host je nedefinisan!");

    var provera = cvecSelDiv4.innerHTML;

    if(provera != null){
        cvecSelDiv4.innerHTML = null;
    }
var cvecSel4Fik = document.createElement("select");
fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
            if(s.ok){
                s.json().then(p=>{
                    p.forEach( pp=>{
                    var cv = new Cvecare(pp.id, pp.grad, pp.ime, pp.brojCveca);
                    var opt7 = document.createElement("option");
                    opt7.value = cv.id;
                    opt7.text = cv.ime;
                    cvecSel4Fik.appendChild(opt7);
})
})
}})
cvecSelDiv4.appendChild(cvecSel4Fik);
cvecSel4 = cvecSel4Fik;
}
cvecSelCrtaj4();
var br24 = document.createElement("p");
forma5.appendChild(br24);
forma5.appendChild(labela15);
forma5.appendChild(cvecSelDiv4);

var dugmeSedamnaest = document.createElement("button");
dugmeSedamnaest.innerHTML = "Dodaj kupovinu!";
forma5.appendChild(dugmeSedamnaest);

dugmeSedamnaest.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajKupovinu/"+input10.value+"/"+input12.value+"/"+input13.value+"/"+input11.value+"/"+cvecSel4.options[cvecSel4.selectedIndex].value,{ method: "POST"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                kupSelCrtaj();

                var v = false;
                var roditelj = host.parentNode;
                roditelj.innerHTML = null;
                fetch("https://localhost:5001/Cvecara/DobijKupovine/")
                .then(p=>{
                    p.json().then(kupovine=>{
                        kupovine.forEach(kupovina => {
                            console.log(kupovina);
                            var p=new Kupovina(kupovina.id, kupovina.brojKupljenogCveca, kupovina.imeKupca, kupovina.datum, kupovina.potrosenNovac, kupovina.cvecare);
                            if(v == false) { p.crtajKupovinu(roditelj, false); v = true; }
                            else {p.crtajKupovinu(roditelj, true); }
                            
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


var kupSelDiv = document.createElement("p");
forma5.appendChild(kupSelDiv);
var kupSel = kupSelDiv.childNodes[0];

function kupSelCrtaj(){
    if(!kupSelDiv)
    throw new Error("Host je nedefinisan!");

    var provera = kupSelDiv.innerHTML;

    if(provera != null){
        kupSelDiv.innerHTML = null;
    }

var kupSelFik = document.createElement("select");
fetch("https://localhost:5001/Cvecara/DobijKupovine/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Kupovina(pp.id, pp.brojKupljenogCveca, pp.imeKupca, pp.datum, pp.potrosenNovac, pp.cvecaraID);
            var opt8 = document.createElement("option");
            opt8.value = cv.id;
            opt8.text = cv.imeKupca + " / " + cv.datum;
            kupSelFik.appendChild(opt8);
        })
        })
    }})
kupSelDiv.appendChild(kupSelFik);
kupSel = kupSelFik;
}
kupSelCrtaj();
var dugmeOsamnaest = document.createElement("button");
dugmeOsamnaest.innerHTML = "Dobij kupovinu!";
forma5.appendChild(dugmeOsamnaest);

function dobijKup(id){
    fetch("https://localhost:5001/Cvecara/DobijKupovinu/"+id,{ method: "GET"}).then(s=>{
        if(s.ok){
            s.json().then(p=>{
            p.forEach( pp=>{
                let cv = new Kupovina(pp.id, pp.brojKupljenogCveca, pp.imeKupca, pp.datum, pp.potrosenNovac, pp.cvecare);
                cv.crtaj(prazno5);
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
dugmeOsamnaest.onclick = (ev) => dobijKup(kupSel.options[kupSel.selectedIndex].value);

var dugmeDevetnaest = document.createElement("button");
dugmeDevetnaest.innerHTML = "Izmeni kupovinu!";
forma5.appendChild(dugmeDevetnaest);

dugmeDevetnaest.onclick = function(){
    dobijKup(kupSel.options[kupSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/PromeniKupovinu/"+kupSel.options[kupSel.selectedIndex].value+"/"+input10.value+"/"+input12.value+"/"+input13.value+"/"+input11.value+"/"+cvecSel4.options[cvecSel4.selectedIndex].value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                dobijKup(kupSel.options[kupSel.selectedIndex].value);
                kupSelCrtaj();

                var v = false;
                var roditelj = host.parentNode;
                roditelj.innerHTML = null;
                fetch("https://localhost:5001/Cvecara/DobijKupovine/")
                .then(p=>{
                    p.json().then(kupovine=>{
                        kupovine.forEach(kupovina => {
                            console.log(kupovina);
                            var p=new Kupovina(kupovina.id, kupovina.brojKupljenogCveca, kupovina.imeKupca, kupovina.datum, kupovina.potrosenNovac, kupovina.cvecare);
                            if(v == false) { p.crtajKupovinu(roditelj, false); v = true; }
                            else {p.crtajKupovinu(roditelj, true); }
                            
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

var dugmeDvadeset = document.createElement("button");
dugmeDvadeset.innerHTML = "Obrisi kupovinu!";
forma5.appendChild(dugmeDvadeset);

dugmeDvadeset.onclick = function(){
    dobijKup(kupSel.options[kupSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/IzbrisiKupovinu/"+kupSel.options[kupSel.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                kupSelCrtaj();

                var v = false;
                var roditelj = host.parentNode;
                roditelj.innerHTML = null;
                fetch("https://localhost:5001/Cvecara/DobijKupovine/")
                .then(p=>{
                    p.json().then(kupovine=>{
                        kupovine.forEach(kupovina => {
                            console.log(kupovina);
                            var p=new Kupovina(kupovina.id, kupovina.brojKupljenogCveca, kupovina.imeKupca, kupovina.datum, kupovina.potrosenNovac, kupovina.cvecare);
                            if(v == false) { p.crtajKupovinu(roditelj, false); v = true; }
                            else {p.crtajKupovinu(roditelj, true); }
                            
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

var prazno5 = document.createElement("p");
forma5.appendChild(prazno5);
host.appendChild(forma5);
    }


    crtajKupovinu(host, vec){
        if(!host)
        throw new Exception("Ne postoji");
    
        this.kontejner = document.createElement("div");
        var kontejner2 = document.createElement("div");
    
        this.crtajFormu(kontejner2, vec);
        var dugmeD = document.createElement("button");
        dugmeD.innerHTML = this.imeKupca+" "+this.datum;
        this.kontejner.appendChild(dugmeD);
    
        if(!vec){ host.appendChild(kontejner2);}
        host.appendChild(this.kontejner);
    
    }

}