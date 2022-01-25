import { Cvecare } from "./Cvecare.js";
import { Dostave } from "./Dostave.js";
import { Dostavljaci } from "./Dostavljaci.js";
import { Kupovina } from "./Kupovina.js";
import { Zaposleni } from "./Zaposleni.js";


/* CVECARE */

function osvezi(){ window.location.reload(); }

var bigDiv = document.createElement("div");
bigDiv.className = "kontejner";

var forma = document.createElement("div");
forma.className = "formKlasa";
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
        "Content-Type":"application/json",
    },
    body: JSON.stringify({
        ime:input1.value,
        grad:input2.value,
        brojCveca:input3.value
    })
}).then(s=>{
    console.log(s);
            if(s.ok){
                s.text().then(s=>{
                    alert(s);
                    cvecSelCrtaj();
                    cvecSelCrtaj2();
                    cvecSelCrtaj3();
                    cvecSelCrtaj4();
                })
        }
        else{s.text().then(s=>{
            alert(s);})}
    }).catch(err=>{
        alert(err);
    });
}

var dugmeDva = document.createElement("button");
dugmeDva.innerText = "Dobij cvecaru!";

function dobij(id){
    console.log(id);
    fetch("https://localhost:5001/Cvecara/DobijCvecaru/"+id,{ method: "GET"}).then(s=>{
        if(s.ok){
            console.log(s);
            s.json().then(p=>{
            p.forEach( pp=>{
                var cv = new Cvecare(pp.id, pp.grad, pp.ime, pp.brojCveca);
                console.log(cv);
                cv.crtaj(prazno);
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

dugmeDva.onclick = (ev) => dobij(cvecSel.options[cvecSel.selectedIndex].value);

var dugmeTri = document.createElement("button");
dugmeTri.innerText = "Izmeni cvecaru!";

dugmeTri.onclick = function(){
    dobij(cvecSel.options[cvecSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/PromeniCvecaru/"+cvecSel.options[cvecSel.selectedIndex].value+"/"+input1.value+"/"+input2.value+"/"+input3.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                dobij(cvecSel.options[cvecSel.selectedIndex].value);
                cvecSelCrtaj();
                cvecSelCrtaj2();
                cvecSelCrtaj3();
                cvecSelCrtaj4();
            })
        }
        else{s.text().then(s=>{
            alert(s);})}
    }).catch(err=>{
            alert(err);
        });
}

var dugmeCetiri = document.createElement("button");
dugmeCetiri.innerText = "Obrisi cvecaru!";

dugmeCetiri.onclick = function(){
    dobij(cvecSel.options[cvecSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/IzbrisiCvecaru/"+cvecSel.options[cvecSel.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                cvecSelCrtaj();
                cvecSelCrtaj2();
                cvecSelCrtaj3();
                cvecSelCrtaj4();
            })}
            else{s.text().then(s=>{
                alert(s);})}
        }).catch(err=>{
            alert(err);
        });
}

var br1 = document.createElement("p");
var br2 = document.createElement("p");
var br3 = document.createElement("p");
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

var cvecSelDiv = document.createElement("p");
var cvecSel = cvecSelDiv.childNodes[0];

function cvecSelCrtaj(){
    if(!cvecSelDiv)
    throw new Error("Host je nedefinisan!");

    var provera = cvecSelDiv.innerHTML;

    if(provera != null){
        cvecSelDiv.innerHTML = null;
    }

var cvecSelFiktivni = document.createElement("select");
cvecSelFiktivni.className = "cvecSel";
fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Cvecare(pp.id, pp.grad, pp.ime, pp.brojCveca);
            var prom = document.createElement("option");
            prom.value = cv.id;
            prom.text = cv.ime;
            cvecSelFiktivni.appendChild(prom);
            console.log(prom);
        })
        })
    }});
    cvecSelDiv.appendChild(cvecSelFiktivni);
    console.log(cvecSelFiktivni);
    cvecSel = cvecSelFiktivni;
}

cvecSelCrtaj();
forma.appendChild(cvecSelDiv);

forma.appendChild(dugmeDva);
forma.appendChild(dugmeTri);
forma.appendChild(dugmeCetiri);

var prazno = document.createElement("p");
forma.appendChild(prazno);
bigDiv.appendChild(forma);

/* KRAJ CVECARA, POCETAK DOSTAVLJACA */

var forma2 = document.createElement("div");
forma2.className = "formKlasa";
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
            s.text().then(s=>{
                alert(s);
                dostavljaciSelCrtaj();
                dostavljaciSel2Crtaj();
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
                dostavljaciSel2Crtaj();
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
                dostavljaciSel2Crtaj();
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

bigDiv.appendChild(forma2);

/* KRAJ DOSTAVLJACA POCETAK ZAPOSLENIH */

var forma3 = document.createElement("div");
forma3.className = "formKlasa";

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

var cvecSelDiv2 = document.createElement("p");
var cvecSel2 = cvecSelDiv2.childNodes[0];

function cvecSelCrtaj2(){
    if(!cvecSelDiv2)
    throw new Error("Host je nedefinisan!");

    var provera = cvecSelDiv2.innerHTML;

    if(provera != null){
        cvecSelDiv2.innerHTML = null;
    }
var cvecSel2Fik = document.createElement("select");
cvecSelDiv2.appendChild(cvecSel2Fik);

fetch("https://localhost:5001/Cvecara/DobijCvecare/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Cvecare(pp.id, pp.grad, pp.ime, pp.brojCveca);
            var opt2 = document.createElement("option");
            opt2.value = cv.id;
            opt2.text = cv.ime;
            cvecSel2Fik.appendChild(opt2);
        })
        })
    }})
cvecSel2 = cvecSel2Fik;
}
cvecSelCrtaj2();
forma3.appendChild(cvecSelDiv2);

var dugmeDevet = document.createElement("button");
dugmeDevet.innerHTML = "Dodaj zaposlenog!";
dugmeDevet.onclick= function(){
    fetch("https://localhost:5001/Cvecara/DodajZaposlenog/"+cvecSel2.options[cvecSel2.selectedIndex].value+"/"+input5.value+"/"+input7.value+"/"+input8.value+"/"+input6.value,{
        method: "POST"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                zapSelCrtaj();
            })
        }
        else{s.text().then(s=>{
            alert(s);})}
    }).catch(err=>{
            alert(err);
        });
        return;
}
forma3.appendChild(dugmeDevet);
var zapSelDiv = document.createElement("p");
forma3.appendChild(zapSelDiv);
var zapSel = zapSelDiv.childNodes[0];

function zapSelCrtaj(){
    if(!zapSelDiv)
    throw new Error("Host je nedefinisan!");

    var provera = zapSelDiv.innerHTML;

    if(provera != null){
        zapSelDiv.innerHTML = null;
    }

var zapSelTemp = document.createElement("select");
zapSelDiv.appendChild(zapSelTemp);
fetch("https://localhost:5001/Cvecara/DobijZaposlene/",{ method: "GET"}).then(s=>{
    if(s.ok){
        s.json().then(p=>{
            p.forEach( pp=>{
            var cv = new Zaposleni(pp.id, pp.jmbg, pp.ime, pp.prezime, pp.grad, pp.cvecara);
            var opt3 = document.createElement("option");
            opt3.value = cv.id;
            opt3.text = cv.jmbg;
            zapSelTemp.appendChild(opt3);
        })
        })
    }})
zapSel = zapSelTemp;
}
zapSelCrtaj();

var dugmeDeset = document.createElement("button");
dugmeDeset.innerHTML = "Dobij zaposlenog!";
forma3.appendChild(dugmeDeset);

function dobijZap(id){
    fetch("https://localhost:5001/Cvecara/DobijZaposlenog/"+id,{ method: "GET"}).then(s=>{
        if(s.ok){
            s.json().then(p=>{
            p.forEach( pp=>{
                let cv = new Zaposleni(pp.id, pp.jmbg, pp.ime, pp.prezime, pp.grad, pp.cvecare);
                cv.crtaj(prazno3);
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
dugmeDeset.onclick = (ev) => dobijZap(zapSel.options[zapSel.selectedIndex].value);

var dugmeJedanaest = document.createElement("button");
dugmeJedanaest.innerHTML = "Izmeni zaposlenog!";
forma3.appendChild(dugmeJedanaest);

dugmeJedanaest.onclick = function(){
dobijZap(zapSel.options[zapSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/PromeniZaposlenog/"+zapSel.options[zapSel.selectedIndex].value+"/"+cvecSel2.options[cvecSel2.selectedIndex].value+"/"+input5.value+"/"+input7.value+"/"+input8.value+"/"+input6.value,{ method: "PUT"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                dobijZap(zapSel.options[zapSel.selectedIndex].value);
                alert(s);
                zapSelCrtaj();
            })
        }
        else{s.text().then(s=>{
            alert(s);})}
    }).catch(err=>{
            alert(err);
        });
        return;
}

var dugmeDvanaest = document.createElement("button");
dugmeDvanaest.innerHTML = "Obrisi zaposlenog!";
forma3.appendChild(dugmeDvanaest);

dugmeDvanaest.onclick = function(){
dobijZap(zapSel.options[zapSel.selectedIndex].value);
    fetch("https://localhost:5001/Cvecara/IzbrisiZaposlenog/"+zapSel.options[zapSel.selectedIndex].value,{ method: "DELETE"}).then(s=>{
        if(s.ok){
            s.text().then(s=>{
                alert(s);
                zapSelCrtaj();
            })
        }
        else{s.text().then(s=>{
            alert(s);})}
    }).catch(err=>{
            alert(err);
        });
        return;
}

var prazno3 = document.createElement("p");
forma3.appendChild(prazno3);
bigDiv.appendChild(forma3);


/* KRAJ ZAPOSLENIH POCETAK DOSTAVA */

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
bigDiv.appendChild(forma4);

/* KRAJ DOSTAVA */

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
bigDiv.appendChild(forma5);
document.body.appendChild(bigDiv);
var futer = document.createElement("footer");
futer.innerHTML = "Skolska 2021/2022 godina.";

document.body.appendChild(futer);