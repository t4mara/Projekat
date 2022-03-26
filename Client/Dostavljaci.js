import { Cvecare } from "./Cvecare.js";
import { Dostave } from "./Dostave.js";
import { Kupovina } from "./Kupovina.js";
import { Zaposleni } from "./Zaposleni.js";
export class Dostavljaci{
    constructor(id, ime){
        this.id = id;
        this.ime = ime;
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

        var red2 = document.createElement("tr");

        let el=document.createElement("td");
        el.innerHTML=this.ime;
        red2.appendChild(el);

        tabela.appendChild(red);
        tabela.appendChild(red2);
        host.appendChild(tabela);
        tabela.setAttribute("border", 2);
    }

    crtajDostavljaca(host, vec){
        if(!host)
        throw new Exception("Ne postoji");

        this.kontejner = document.createElement("div");
        var kontejner2 = document.createElement("div");

        this.crtajFormu(kontejner2, vec);
        var dugmeD = document.createElement("button");
        dugmeD.innerHTML = this.ime;
        this.kontejner.appendChild(dugmeD);

        if(!vec){ host.appendChild(kontejner2);}
        host.appendChild(this.kontejner);

    }

    crtajFormu(host){
        
var forma2 = document.createElement("div");
forma2.className = "formKlasa";
var labela4 = document.createElement("label");
labela4.innerHTML = "Ime: ";
var input4 = document.createElement("input");
input4.type = "text";
forma2.appendChild(labela4);
forma2.appendChild(input4);

var dugmePet = document.createElement("button");
dugmePet.innerText = "Dodaj dostavljaca!";
dugmePet.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajDostavljaca/"+input4.value,{ method: "POST"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                dostavljaciSelCrtaj();

                var v = false;
var roditelj = host.parentNode;
roditelj.innerHTML = null;
fetch("https://localhost:5001/Cvecara/DobijDostavljace/")
.then(p=>{
    p.json().then(dostave=>{
        dostave.forEach(dostava => {
            console.log(dostava);
            var p=new Dostavljaci(dostava.id, dostava.ime);
            if(v == false) { p.crtajDostavljaca(roditelj, false); v = true; }
            else {p.crtajDostavljaca(roditelj, true); }
            
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
forma2.appendChild(dugmePet);

var dostavljaciSelDiv = document.createElement("p");
var dostavljaciSel = dostavljaciSelDiv.childNodes[0];

function dostavljaciSelCrtaj(){
    if(!dostavljaciSelDiv)
    throw new Error("Host je nedefinisan!");

    var provera = dostavljaciSelDiv.innerHTML;

    if(provera != null){
        dostavljaciSelDiv.innerHTML = null;
    }

var dostavljaciSelFik = document.createElement("select");
dostavljaciSelFik.className = "dostavljaciSel";
fetch("https://localhost:5001/Cvecara/DobijDostavljace/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach(pp=>{
            var cv = new Dostavljaci(pp.id, pp.ime);
            var opt = document.createElement("option");
            opt.value = cv.id;
            opt.text = cv.ime;
            dostavljaciSelFik.appendChild(opt);
        })
        })
    }})
dostavljaciSelDiv.appendChild(dostavljaciSelFik);
dostavljaciSel = dostavljaciSelFik;
}
dostavljaciSelCrtaj();
forma2.appendChild(dostavljaciSelDiv);

function dobijDostlj(id){
    fetch("https://localhost:5001/Cvecara/DobijDostavljaca/"+id,{ method: "GET"}).then(s=>{
        if(s.ok){
            s.json().then(p=>{
                p.forEach( pp=>{
                let cv = new Dostavljaci(pp.id, pp.ime);
                console.log(cv);
                cv.crtaj(prazno2);
            })
            })
        }
        else{s.text().then(s=>{
            alert(s);})}
    }).catch(err=>{
            alert(err);
        });
}
var dugmeSest = document.createElement("button");
dugmeSest.innerText = "Dobij dostavljaca!";
dugmeSest.onclick = (ev) => dobijDostlj(dostavljaciSel.options[dostavljaciSel.selectedIndex].value);
forma2.appendChild(dugmeSest);

var dugmeSedam = document.createElement("button");
dugmeSedam.innerText = "Izmeni dostavljaca!";
dugmeSedam.onclick = function(){
dobijDostlj(dostavljaciSel.options[dostavljaciSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/PromeniDostavljaca/"+dostavljaciSel.options[dostavljaciSel.selectedIndex].value+"/"+input4.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                dobijDostlj(dostavljaciSel.options[dostavljaciSel.selectedIndex].value);
                alert(s);
                dostavljaciSelCrtaj();

                var v = false;
                var roditelj = host.parentNode;
                roditelj.innerHTML = null;
                fetch("https://localhost:5001/Cvecara/DobijDostavljace/")
                .then(p=>{
                    p.json().then(dostave=>{
                        dostave.forEach(dostava => {
                            console.log(dostava);
                            var p=new Dostavljaci(dostava.id, dostava.ime);
                            if(v == false) { p.crtajDostavljaca(roditelj, false); v = true; }
                            else {p.crtajDostavljaca(roditelj, true); }
                            
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
forma2.appendChild(dugmeSedam);

var dugmeOsam = document.createElement("button");
dugmeOsam.innerText = "Obrisi dostavljaca!";
dugmeOsam.onclick = function(){
    dobijDostlj(dostavljaciSel.options[dostavljaciSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/IzbrisiDostavljaca/"+dostavljaciSel.options[dostavljaciSel.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                dostavljaciSelCrtaj();

                var v = false;
                var roditelj = host.parentNode;
                roditelj.innerHTML = null;
                fetch("https://localhost:5001/Cvecara/DobijDostavljace/")
                .then(p=>{
                    p.json().then(dostave=>{
                        dostave.forEach(dostava => {
                            console.log(dostava);
                            var p=new Dostavljaci(dostava.id, dostava.ime);
                            if(v == false) { p.crtajDostavljaca(roditelj, false); v = true; }
                            else {p.crtajDostavljaca(roditelj, true); }
                            
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
forma2.appendChild(dugmeOsam);

var prazno2 = document.createElement("p");
forma2.appendChild(prazno2);

host.appendChild(forma2);
    }
}