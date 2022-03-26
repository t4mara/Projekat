import { Zaposleni } from "./Zaposleni.js";

var prom = document.createElement("div");
var vec = false;
fetch("https://localhost:5001/Cvecara/DobijZaposlene/")
.then(p=>{
    p.json().then(zaposleni=>{
        zaposleni.forEach(zaposlen => {
            console.log(zaposlen);
            var p=new Zaposleni(zaposlen.id, zaposlen.jmbg, zaposlen.ime, zaposlen.prezime, zaposlen.grad, zaposlen.cvecara);
            if(vec == false) { p.crtajZaposlenog(prom, false); vec = true; }
            else {p.crtajZaposlenog(prom, true); }
        })
    })
})
document.body.appendChild(prom);