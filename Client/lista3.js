import { Dostavljaci } from "./Dostavljaci.js";

var prom = document.createElement("div");
var vec = false;
fetch("https://localhost:5001/Cvecara/DobijDostavljace/")
.then(p=>{
    p.json().then(dostavljaci=>{
        dostavljaci.forEach(dostavljac => {
            console.log(dostavljac);
            var p=new Dostavljaci(dostavljac.id, dostavljac.ime);
            if(vec == false) { p.crtajDostavljaca(prom, false); vec = true; }
            else {p.crtajDostavljaca(prom, true); }
        })
    })
})
document.body.appendChild(prom);