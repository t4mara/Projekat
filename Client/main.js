import { Cvecare } from "./Cvecare.js";
import { Dostave } from "./Dostave.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Kupovina } from "./Kupovina.js";
import { Zaposleni } from "./Zaposleni.js";


/* CVECARE */

var forma = document.createElement("div");
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
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
        ime:input1.value,
        grad:input2.value,
        brojCveca:input3.value
    })
}).then(s=>{
        if(s.ok){
                let cv = new Cvecare(0, input2.value, input1.value, input3.value);
                cv.crtaj(prazno);
                alert("Dodata cvecara!");
        }
        else{ alert(s.status); }
    }).catch(err=>{
        alert(err);
    });
    return;
}

var dugmeDva = document.createElement("button");
dugmeDva.innerText = "Dobij cvecaru!";

function dobij(){
    fetch("https://localhost:5001/Cvecara/DobijCvecaru/"+cvecSel.options[cvecSel.selectedIndex].value,{ method: "GET"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Cvecare(s.id, s.grad, s.ime, s.brojCveca);
                cv.crtaj(prazno);
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
        alert(err);
    });
    return;
}

dugmeDva.onclick = (ev) => dobij();

var dugmeTri = document.createElement("button");
dugmeTri.innerText = "Izmeni cvecaru!";

dugmeTri.onclick = function(){
    fetch("https://localhost:5001/Cvecara/PromeniCvecaru/"+cvecSel.options[cvecSel.selectedIndex].value+"/"+input1.value+"/"+input2.value+"/"+input3.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Cvecare(s.id, s.grad, s.ime, s.brojCveca);
                cv.crtaj(prazno);
                alert("Izmenjena cvecara!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}

var dugmeCetiri = document.createElement("button");
dugmeCetiri.innerText = "Obrisi cvecaru!";

dugmeCetiri.onclick = function(){
    fetch("https://localhost:5001/Cvecara/IzbrisiCvecaru/"+cvecSel.options[cvecSel.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Cvecare(s.id, s.grad, s.ime, s.brojCveca);
                cv.crtaj(prazno);
                alert("Izbrisana cvecara!");
            })}
        else{ 
            alert(s.status);
            }
    }).catch(err=>{
            alert(err);
        });
        return;
}

var br1 = document.createElement("p");
var br2 = document.createElement("p");
var br3 = document.createElement("p");
var br4 = document.createElement("p");
var br5 = document.createElement("p");
var br6 = document.createElement("p");
var br7 = document.createElement("p");
var br8 = document.createElement("p");

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

var cvecSel = document.createElement("select");
var prom = document.createElement("option");
fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Cvecare(pp.id, pp.grad, pp.ime, pp.brojCveca);
            prom = document.createElement("option");
            prom.value = cv.id;
            prom.text = cv.ime;
            cvecSel.appendChild(prom);
        })
        })
    }});
forma.appendChild(br4);
forma.appendChild(cvecSel);

forma.appendChild(br5);
forma.appendChild(dugmeDva);
forma.appendChild(dugmeTri);
forma.appendChild(dugmeCetiri);

var prazno = document.createElement("p");
forma.appendChild(prazno);
document.body.appendChild(forma);

/* KRAJ CVECARA, POCETAK DOSTAVLJACA */

var forma2 = document.createElement("div");
var labela4 = document.createElement("label");
labela4.innerHTML = "Ime: ";
var input4 = document.createElement("input");
input4.type = "text";
forma2.appendChild(labela4);
forma2.appendChild(input4);
forma2.appendChild(br6);

var dugmePet = document.createElement("button");
dugmePet.innerText = "Dodaj dostavljaca!";
dugmePet.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajDostavljaca/"+input4.value,{ method: "POST"}).then(s=>{
        if(s.ok){
            s.json().then(data=>{
                let cv = new Dostavljaci(data.id, data.ime);
                cv.crtaj(prazno2);
                alert("Dodat dostavljac!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}
forma2.appendChild(dugmePet);

var dostavljaciSel = document.createElement("select");
fetch("https://localhost:5001/Cvecara/DobijDostavljace/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Dostavljaci(pp.id, pp.ime);
            var opt = document.createElement("option");
            opt.value = cv.id;
            opt.text = cv.ime;
            dostavljaciSel.appendChild(opt);
        })
        })
    }})
forma2.appendChild(br7);
forma2.appendChild(dostavljaciSel);
forma2.appendChild(br8);

function dobijDostlj(){
    fetch("https://localhost:5001/Cvecara/DobijDostavljaca/"+dostavljaciSel.options[dostavljaciSel.selectedIndex].value,{ method: "GET"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Dostavljaci(s.id, s.ime);
                cv.crtaj(prazno2);
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}
var dugmeSest = document.createElement("button");
dugmeSest.innerText = "Dobij dostavljaca!";
dugmeSest.onclick = (ev) => dobijDostlj();
forma2.appendChild(dugmeSest);

var dugmeSedam = document.createElement("button");
dugmeSedam.innerText = "Izmeni dostavljaca!";
dugmeSedam.onclick = function(){
    fetch("https://localhost:5001/Cvecara/PromeniDostavljaca/"+dostavljaciSel.options[dostavljaciSel.selectedIndex].value+"/"+input4.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Dostavljaci(s.id, s.ime);
                cv.crtaj(prazno2);
                alert("Izmenjen dostavljac!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
        dobijDostlj();
}
forma2.appendChild(dugmeSedam);

var dugmeOsam = document.createElement("button");
dugmeOsam.innerText = "Obrisi dostavljaca!";
dugmeOsam.onclick = function(){
    fetch("https://localhost:5001/Cvecara/IzbrisiDostavljaca/"+dostavljaciSel.options[dostavljaciSel.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Dostavljaci(s.id, s.ime);
                cv.crtaj(prazno2);
                alert("Izbrisan dostavljac!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}
forma2.appendChild(dugmeOsam);

var prazno2 = document.createElement("p");
forma2.appendChild(prazno2);

document.body.appendChild(forma2);

/* KRAJ DOSTAVLJACA POCETAK ZAPOSLENIH */

var forma3 = document.createElement("div");

var labela5 = document.createElement("label");
labela5.innerHTML = "JMBG: ";
var input5 = document.createElement("input");
input5.type = "text";
var labela6 = document.createElement("label");
labela6.innerHTML = "Grad: ";
var input6 = document.createElement("input");
input6.type = "text";
var labela7 = document.createElement("label");
labela7.innerHTML = "Ime: ";
var input7 = document.createElement("input");
input7.type = "text";
var labela8 = document.createElement("label");
labela8.innerHTML = "Prezime: ";
var input8 = document.createElement("input");
input8.type = "text";
var labela9 = document.createElement("label");
labela9.innerHTML = "Cvecara: "

forma3.appendChild(labela5);
forma3.appendChild(input5);
var br9 = document.createElement("p");
forma3.appendChild(br9);
forma3.appendChild(labela6);
forma3.appendChild(input6);
var br10 = document.createElement("p");
forma3.appendChild(br10);
forma3.appendChild(labela7);
forma3.appendChild(input7);
var br11 = document.createElement("p");
forma3.appendChild(br11);
forma3.appendChild(labela8);
forma3.appendChild(input8);
var br12 = document.createElement("p");
forma3.appendChild(br12);
forma3.appendChild(labela9);
var br13 = document.createElement("p");
forma3.appendChild(br13);

var cvecSel2 = document.createElement("select");
forma3.appendChild(cvecSel2);

fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Cvecare(pp.id, pp.grad, pp.ime, pp.brojCveca);
            var opt2 = document.createElement("option");
            opt2.value = cv.id;
            opt2.text = cv.ime;
            cvecSel2.appendChild(opt2);
        })
        })
    }})

var br14 = document.createElement("p");
forma3.appendChild(br14);

var dugmeDevet = document.createElement("button");
dugmeDevet.innerHTML = "Dodaj zaposlenog!";
dugmeDevet.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajZaposlenog/"+cvecSel2.options[cvecSel2.selectedIndex].value+"/"+input5.value+"/"+input7.value+"/"+input8.value+"/"+input6.value,{ method: "POST"}).then(s=>{
        if(s.ok){
            s.json().then(data=>{
                let cv = new Zaposleni(data.id, data.jmbg, data.ime, data.prezime, data.grad, data.cvecare);
                cv.crtaj(prazno3);
                alert("Dodat zaposleni!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}
forma3.appendChild(dugmeDevet);
var br13 = document.createElement("p");
forma3.appendChild(br13);

var zapSel = document.createElement("select");
forma3.appendChild(zapSel);
fetch("https://localhost:5001/Cvecara/DobijZaposlene/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Zaposleni(pp.id, pp.jmbg, pp.ime, pp.prezime, pp.grad, pp.cvecara);
            var opt3 = document.createElement("option");
            opt3.value = cv.id;
            opt3.text = cv.jmbg;
            zapSel.appendChild(opt3);
        })
        })
    }})


var br15 = document.createElement("p");
forma3.appendChild(br15);

var dugmeDeset = document.createElement("button");
dugmeDeset.innerHTML = "Dobij zaposlenog!";
forma3.appendChild(dugmeDeset);

function dobijZap(){
    fetch("https://localhost:5001/Cvecara/DobijZaposlenog/"+zapSel.options[zapSel.selectedIndex].value,{ method: "GET"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Zaposleni(s.id, s.jmbg, s.ime, s.prezime, s.grad, s.cvecare);
                cv.crtaj(prazno3);
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}
dugmeDeset.onclick = (ev) => dobijZap();

var dugmeJedanaest = document.createElement("button");
dugmeJedanaest.innerHTML = "Izmeni zaposlenog!";
forma3.appendChild(dugmeJedanaest);

dugmeJedanaest.onclick = function(){
    fetch("https://localhost:5001/Cvecara/PromeniZaposlenog/"+zapSel.options[zapSel.selectedIndex].value+"/"+cvecSel2.options[cvecSel2.selectedIndex].value+"/"+input5.value+"/"+input7.value+"/"+input8.value+"/"+input6.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Zaposleni(s.id, s.jmbg, s.ime, s.prezime, s.grad, s.cvecare);
                cv.crtaj(prazno3);
                alert("Izmenjen zaposleni!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}

var dugmeDvanaest = document.createElement("button");
dugmeDvanaest.innerHTML = "Obrisi zaposlenog!";
forma3.appendChild(dugmeDvanaest);

dugmeDvanaest.onclick = function(){
    fetch("https://localhost:5001/Cvecara/IzbrisiZaposlenog/"+zapSel.options[zapSel.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Zaposleni(s.id, s.jmbg, s.ime, s.prezime, s.grad, s.cvecare);
                cv.crtaj(prazno3);
                alert("Obrisan zaposleni!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}

var prazno3 = document.createElement("p");
forma3.appendChild(prazno3);
document.body.appendChild(forma3);

/* KRAJ ZAPOSLENIH POCETAK DOSTAVA */

var forma4 = document.createElement("div");
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

var cvecSel3 = document.createElement("select");
fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
        if(s.ok){
            s.json().then(p=>{
                p.forEach( pp=>{
                var cv = new Cvecare(pp.id, pp.grad, pp.ime, pp.brojCveca);
                var opt5 = document.createElement("option");
                opt5.value = cv.id;
                opt5.text = cv.ime;
                cvecSel3.appendChild(opt5);
 })
 })
}})
var br17 = document.createElement("p");
forma4.appendChild(br17);
forma4.appendChild(cvecSel3);

var br18 = document.createElement("p");
forma4.appendChild(br18);
var labela12 = document.createElement("label");
labela12.innerHTML = "Dostavljac: ";
forma4.appendChild(labela12);

var dostavljaciSel2 = document.createElement("select");
fetch("https://localhost:5001/Cvecara/DobijDostavljace/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Dostavljaci(pp.id, pp.ime);
            var opt4 = document.createElement("option");
            opt4.value = cv.id;
            opt4.text = cv.ime;
            dostavljaciSel2.appendChild(opt4);
        })
        })
    }})
var br19 = document.createElement("p");
forma4.appendChild(br19);
forma4.appendChild(dostavljaciSel2);
var br20 = document.createElement("p");
forma4.appendChild(br20);
var dugmeTrinaest = document.createElement("button");
dugmeTrinaest.innerHTML = "Dodaj dostavu!";

dugmeTrinaest.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajDostavu/"+cvecSel3.options[cvecSel3.selectedIndex].value+"/"+dostavljaciSel2.options[dostavljaciSel2.selectedIndex].value+"/"+input9.value,{ method: "POST"}).then(s=>{
        if(s.ok){
            s.json().then(data=>{
                let cv = new Dostave(data.id, data.brojCveca, data.dostavljaci, data.cvecare);
                cv.crtaj(prazno4);
                alert("Dodata dostava!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}
forma4.appendChild(dugmeTrinaest);

var dostavaSel = document.createElement("select");
var br21 = document.createElement("p");
forma4.appendChild(br21);

fetch("https://localhost:5001/Cvecara/DobijDostave/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Dostave(pp.id, pp.brojCveca, pp.dostavljaci, pp.cvecare);
            var opt6 = document.createElement("option");
            opt6.value = cv.id;
            opt6.text = cv.brojcveca;
            dostavaSel.appendChild(opt6);
        })
        })
    }})
forma4.appendChild(dostavaSel);

var br22 = document.createElement("p");
forma4.appendChild(br22);

var dugmeCetrnaest = document.createElement("button");
dugmeCetrnaest.innerHTML = "Dobij dostavu!";
forma4.appendChild(dugmeCetrnaest);

function dobijDost(){
    fetch("https://localhost:5001/Cvecara/DobijDostavu/"+dostavaSel.options[dostavaSel.selectedIndex].value,{ method: "GET"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Dostave(s.id, s.brojCveca, s.dostavljaci, s.cvecare);
                cv.crtaj(prazno4);
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}
dugmeCetrnaest.onclick = (ev) => dobijDost();

var dugmePetnaest = document.createElement("button");
dugmePetnaest.innerHTML = "Izmeni dostavu!";
forma4.appendChild(dugmePetnaest);

dugmePetnaest.onclick = function(){
    fetch("https://localhost:5001/Cvecara/PromeniDostavu/"+dostavaSel.options[dostavaSel.selectedIndex].value+"/"+cvecSel3.options[cvecSel3.selectedIndex].value+"/"+dostavljaciSel2.options[dostavljaciSel2.selectedIndex].value+"/"+input9.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Dostave(s.id, s.brojCveca, s.dostavljaci, s.cvecare);
                cv.crtaj(prazno4);
                alert("Promenjena dostava!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}

var dugmeSesnaest = document.createElement("button");
dugmeSesnaest.innerHTML = "Obrisi dostavu!";

dugmeSesnaest.onclick = function(){
    fetch("https://localhost:5001/Cvecara/IzbrisiDostavu/"+dostavaSel.options[dostavaSel.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Dostave(s.id, s.brojCveca, s.dostavljaci, s.cvecare);
                cv.crtaj(prazno4);
                alert("Dostava obrisana!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}
forma4.appendChild(dugmeSesnaest);
var prazno4 = document.createElement("p");
forma4.appendChild(prazno4);
document.body.appendChild(forma4);

/* KRAJ DOSTAVA */

var forma5 = document.createElement("div");
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
input13.type = "date";
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
var cvecSel4 = document.createElement("select");

fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
            if(s.ok){
                s.json().then(p=>{
                    p.forEach( pp=>{
                    var cv = new Cvecare(pp.id, pp.grad, pp.ime, pp.brojCveca);
                    var opt7 = document.createElement("option");
                    opt7.value = cv.id;
                    opt7.text = cv.ime;
                    cvecSel4.appendChild(opt7);
})
})
}})

var br24 = document.createElement("p");
forma5.appendChild(br24);
forma5.appendChild(labela15);
var br25 = document.createElement("p");
forma5.appendChild(br25);
forma5.appendChild(cvecSel4);

var br25 = document.createElement("p");
forma5.appendChild(br25);

var dugmeSedamnaest = document.createElement("button");
dugmeSedamnaest.innerHTML = "Dodaj kupovinu!";
forma5.appendChild(dugmeSedamnaest);

dugmeSedamnaest.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajKupovinu/"+input10.value+"/"+input12.value+"/"+input13.value+"/"+input11.value+"/"+cvecSel4.options[cvecSel4.selectedIndex].value,{ method: "POST"}).then(s=>{
        if(s.ok){
            s.json().then(data=>{
                let cv = new Kupovina(data.id, data.brojKupljenogCveca, data.imeKupca, data.datum, data.potrosenNovac, data.cvecare);
                cv.crtaj(prazno5);
                alert("Kupovina dodata!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}

var br26 = document.createElement("p");
forma5.appendChild(br26);

var kupSel = document.createElement("select");
forma5.appendChild(kupSel);

fetch("https://localhost:5001/Cvecara/DobijKupovine/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Kupovina(pp.id, pp.brojKupljenogCveca, pp.imeKupca, pp.datum, pp.potrosenNovac, pp.cvecaraID);
            var opt8 = document.createElement("option");
            opt8.value = cv.id;
            opt8.text = cv.imeKupca + " / " + cv.datum;
            kupSel.appendChild(opt8);
        })
        })
    }})

var br29 = document.createElement("p");
forma5.appendChild(br29);

var dugmeOsamnaest = document.createElement("button");
dugmeOsamnaest.innerHTML = "Dobij kupovinu!";
forma5.appendChild(dugmeOsamnaest);

function dobijKup(){
    fetch("https://localhost:5001/Cvecara/DobijKupovinu/"+kupSel.options[kupSel.selectedIndex].value,{ method: "GET"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Kupovina(s.id, s.brojKupljenogCveca, s.imeKupca, s.datum, s.potrosenNovac, s.cvecare);
                cv.crtaj(prazno5);
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}
dugmeOsamnaest.onclick = (ev) => dobijKup();

var dugmeDevetnaest = document.createElement("button");
dugmeDevetnaest.innerHTML = "Izmeni kupovinu!";
forma5.appendChild(dugmeDevetnaest);

dugmeDevetnaest.onclick = function(){
    fetch("https://localhost:5001/Cvecara/PromeniKupovinu/"+kupSel.options[kupSel.selectedIndex].value+"/"+input10.value+"/"+input12.value+"/"+input13.value+"/"+input11.value+"/"+cvecSel4.options[cvecSel4.selectedIndex].value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Kupovina(s.id, s.brojKupljenogCveca, s.imeKupca, s.prezimeKupca, s.potrosenNovac, s.cvecare);
                cv.crtaj(prazno5);
                alert("Kupovina promenjena!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}

var dugmeDvadeset = document.createElement("button");
dugmeDvadeset.innerHTML = "Obrisi kupovinu!";
forma5.appendChild(dugmeDvadeset);

dugmeDvadeset.onclick = function(){
    fetch("https://localhost:5001/Cvecara/IzbrisiKupovinu/"+kupSel.options[kupSel.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.json().then(s=>{
                let cv = new Kupovina(s.id, s.brojKupljenogCveca, s.imeKupca, s.prezimeKupca, s.potrosenNovac, s.cvecare);
                cv.crtaj(prazno5);
                alert("Kupovina obrisana!");
            })
        }
        else{ alert(s.status); }
    }).catch(err=>{
            alert(err);
        });
        return;
}

var prazno5 = document.createElement("p");
forma5.appendChild(prazno5);
document.body.appendChild(forma5);
