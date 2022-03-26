import { Dostave } from "./Dostave.js";

var prom = document.createElement("div");
var vec = false;
fetch("https://localhost:5001/Cvecara/DobijDostave/")
.then(p=>{
    p.json().then(dostave=>{
        dostave.forEach(dostava => {
            console.log(dostava);
            var p=new Dostave(dostava.id, dostava.brojCveca, dostava.dostavljaci, dostava.cvecare);
            if(vec == false) { p.crtajDostavu(prom, false); vec = true; }
            else {p.crtajDostavu(prom, true); }
        })
    })
})
document.body.appendChild(prom);