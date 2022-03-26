import { Cvecare } from "./Cvecare.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Kupovina } from "./Kupovina.js";
import { Zaposleni } from "./Zaposleni.js";

var prom = document.createElement("div");
var vec = false;
fetch("https://localhost:5001/Cvecara/DobijCvecare/")
.then(p=>{
    p.json().then(cvecare=>{
        cvecare.forEach(cvecara => {
            console.log(cvecara);
            var p=new Cvecare(cvecara.id, cvecara.grad, cvecara.ime, cvecara.brojcveca);
            if(vec == false) { p.crtajCvecaru(prom, false); vec = true; }
            else {p.crtajCvecaru(prom, true); }
        })
    })
})
document.body.appendChild(prom);