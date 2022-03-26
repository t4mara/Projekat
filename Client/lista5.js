import { Kupovina } from "./Kupovina.js";

var prom = document.createElement("div");
var vec = false;
fetch("https://localhost:5001/Cvecara/DobijKupovine/")
.then(p=>{
    p.json().then(kupovine=>{
        kupovine.forEach(kupovina => {
            console.log(kupovina);
            var p=new Kupovina(kupovina.id, kupovina.brojKupljenogCveca, kupovina.imeKupca, kupovina.datum, kupovina.potrosenNovac, kupovina.cvecare);
            if(vec == false) { p.crtajKupovinu(prom, false); vec = true; }
            else {p.crtajKupovinu(prom, true); }
        })
    })
})
document.body.appendChild(prom);