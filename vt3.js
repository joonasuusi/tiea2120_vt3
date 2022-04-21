"use strict";  // pidä tämä ensimmäisenä rivinä
//@ts-check 

console.log(data);
/*
// Nappulat
var nappulat;
// Lomakkeet
var lomakkeet;
// Jäsen input kentät
var jäsenInputit;
// Lisättyjen leimaustapojen määrä
var lisätytLeimaustavat;
// Fieldsetit
var fieldsets;
// Inputit
var inputit;
// Joukkueiden listaus
var joukkueListaus;
*/

window.onload = function() {
    let nappi = document.getElementsByTagName("button");
    joukkueLista();
    nappi[0].addEventListener("click", lisaaJoukkue);

    nappi[2].addEventListener("click", lisaaLeima);

    lisaaLeimat(data.leimaustapa);
    lisaaSarjat(data.sarjat);
};

function lisaaLeimat(leimat) {
    let div1 = document.getElementById("ekadiv");
    let lab = document.createElement("label");
    lab.setAttribute("for","leimaus"+leimat[0]);
    lab.textContent = "Leimaustapa";
    div1.appendChild(lab);
    for (let i = 0; i < leimat.length; i++) {
        let lab = document.createElement("label");
        let input = document.createElement("input");
        input.type = "checkbox";
        lab.setAttribute("for","leimaus"+leimat[i]);
        input.setAttribute("id","leimaus"+leimat[i]);
        lab.setAttribute("class","oikealle lohkolabel");
        lab.textContent = leimat[i];
        div1.appendChild(lab);
        lab.appendChild(input);
    }
}

function lisaaSarjat(sarjat) {
    let div = document.getElementById("tokadiv");
    let lab = document.createElement("label");
    lab.setAttribute("for",sarjat[0].nimi);
    lab.textContent = "Sarja";
    div.appendChild(lab);
    sarjat.sort(vertaaSarjat);
    for (let i = 0; i < sarjat.length; i++) {
        let lab = document.createElement("label");
        let input = document.createElement("input");
        input.type = "radio";
        lab.setAttribute("for",sarjat[i].nimi);
        input.setAttribute("id",sarjat[i].nimi);
        lab.setAttribute("class","oikealle lohkolabel");
        lab.textContent = sarjat[i].nimi;
        input.setAttribute("name","sarja");
        input.setAttribute("required","required");
        if (i == 0) {
            input.setAttribute("checked","checked");
        }
        div.appendChild(lab);
        lab.appendChild(input);
    }
}

function vertaaSarjat(a,b) {
    let sarja1 = a.nimi;
    let sarja2 = b.nimi;

    if (sarja1 < sarja2) {return -1;}
    if (sarja1 > sarja2) {return 1;}
    
}

/**
 * Luo sivulle listauksen joukkueista ja jäsenistä
 */
 function joukkueLista() {
    let dataj = data.joukkueet;
    let datas = data.sarjat;
    dataj.sort(vertaa);
    let ul = document.createElement("ul");
    for (let i = 0; i < dataj.length; i++) {
        let nimi = dataj[i].nimi;
        let jasen = dataj[i].jasenet;
        jasen.sort(vertaajasen);
        let li = document.createElement("li");
        let strong = document.createElement('strong');
        //let a = document.createElement("a");
        //a.setAttribute("href", "#field");
        document.body.appendChild(ul);
        ul.appendChild(li);
        //li.appendChild(a);
        for (let j = 0; j < datas.length; j++) {
            if (datas[j].id === dataj[i].sarja) {
                let txt1 = document.createTextNode(nimi.trim() + " ");
                li.appendChild(txt1);
                li.appendChild(strong);
                let txt = document.createTextNode(datas[j].nimi);
                strong.appendChild(txt);
            }
        }
        let ul1 = document.createElement("ul");
        for (let k = 0; k < jasen.length; k++) {
            let nimet = jasen[k];
            let li1 = document.createElement("li");
            li.appendChild(ul1);
            ul1.appendChild(li1);
            li1.textContent = nimet;
        }
    }
}


/**
 * Verrataan joukkueiden nimiä ja laiteteaan ne aakkosjärjestykseen
 * @param {*} a verrattava joukkue 
 * @param {*} b verrattava joukkue
 */
 function vertaa(a, b) {
    const joukkue1 = a.nimi.toUpperCase().trim();
    const joukkue2 = b.nimi.toUpperCase().trim();
    if (joukkue1 > joukkue2) {return 1;}
    if (joukkue1 < joukkue2) {return -1;}
}

/**
 * Verrataan jäsenien nimiä ja laiteteaan ne aakkosjärjestykseen
 * @param {*} a verrattava jäsen 
 * @param {*} b verrattava jäsen
 */
 function vertaajasen(a, b) {
    for (let i = 0; i < data.joukkueet.length; i++) {
        const jasen1 = a[i];
        const jasen2 = b[i];
        if (jasen1 > jasen2) {return 1;}
        if (jasen1 < jasen2) {return -1;}       
    }
}

/**
 * Lisää uuden leimaustavan sivulle
 * @param {} e tapahtuma
 */
 function lisaaLeima(e) {
    e.preventDefault();
    let ok = 0;
    let error = 0;
    let input = document.getElementById("leimausUusi");
    for (let i = 0; i < data.leimaustapa.length; i++) {
        if (input.value.toUpperCase().trim() === data.leimaustapa[i].toUpperCase().trim() || input.value.trim().length < 2) {
            error -= 1;
        }
        else {
            ok += 1;
        }
    }
    if ( error < 0) {
        input.setCustomValidity("Leimaustapa on jo käytössä, tarkista myös välilyönnit");
        input.reportValidity();
        return;
    }
    else {
        input.setCustomValidity("");
        input.reportValidity();
        let paikka = data.leimaustapa.length;
        data.leimaustapa[paikka] = input.value;
        //paivitaForm(input.value);
        tyhjennaForm(data.leimaustapa);
        lisaaLeimat(data.leimaustapa);
    }
    document.getElementById("leimaform").reset();
}

/**
 * 
 */
 function tyhjennaForm(leimat) {
    let f = document.getElementsByTagName("fieldset")[0];
    let div1 = document.getElementById("ekadiv");
    let inputs = div1.getElementsByTagName("input");
    for (let i = inputs.length-1; i >= 0; i--) {
        div1.removeChild(inputs[i].parentNode);
    }
}

/**
 * Tarkistaa onko joukkueen nimi validi
 * @param {*} kentta tarksteltava kenttä
 */
function tarkista(kentta) {
    let nimi =  kentta.value;
    let ok = 0;
    let error = 0;
    let dataj = data.joukkueet;
    for (let i = 0; i < dataj.length; i++) {
        if (dataj[i].nimi.toUpperCase().trim() === nimi.toUpperCase().trim() || nimi === "" || nimi.trim().length < 2) {
            error -= 1;
        }
        else {
            ok += 1;
        }
    }
    if (error < 0) {
        kentta.setCustomValidity("Joukkueen nimi on jo käytössä, tarkista myös välilyönnit");
        kentta.reportValidity();
        //console.log(kentta.value);
        //console.log("Joukkueen nimi on jo käytössä tai tyhjä");
        return error;
    }
    else {
        kentta.setCustomValidity("");
        kentta.reportValidity();
        //console.log("kaikki ok");
        return ok;
    }
}

/**
 * TTarkistaa jäsenet onko samoja nimiä ja tarpeeksi jäseniä
 * @param {*} jasenInp tarkasteltava input kenttä
 */
function tarkistaJasen(jasenInp) {
    for (let i = 0; i < 2; i++) {
        if (jasenInp[i].value === "") {
            jasenInp[i].setCustomValidity("Jäseniä pitää olla vähintään 2!");
            jasenInp[i].reportValidity();
        }
        else {
            jasenInp[i].setCustomValidity("");
            jasenInp[i].reportValidity();
        }
    }
    for (let i = 0; i < jasenInp.length; i++) {
        for (let k = jasenInp.length-1; k > i; k--) {
            if (jasenInp[i].value.toUpperCase().trim() === jasenInp[k].value.toUpperCase().trim()) {
                //console.log("ei samoja nimiä");
                jasenInp[k].setCustomValidity("Ei saa olla samoja nimiä joukkueessa");
                jasenInp[k].reportValidity();
                return false;
            }
            
        }
        
    }
    return true;
}

/**
 * Lisää joukkueen tietorakenteeseen jos kaikki ok
 * @param {*} e tapahtuma
 */
 function lisaaJoukkue(e) {
    e.preventDefault();
    let joukkue = {
        "nimi":joukkueenNimi(),
        "id": uusId(),
        "jasenet": lisaaJasenet(),
        "leimaustapa": leimausTavat(),
        "rastit": [],
        "sarja": otaSarja()
    };
   
    let input = document.getElementById("nimi");
    let jasenInp = document.querySelectorAll('input[name="jasen"]');
    let tulos = tarkista(input);
    let tark = tarkistaJasen(jasenInp);

    if (tulos > 0 && joukkue.jasenet.length >= 2 && joukkue.leimaustapa.length > 0 && tark == true) {
    let paikka = data.joukkueet.length;
    data["joukkueet"][paikka] = joukkue;
    document.getElementById("joukkue").reset();
    let field = document.getElementsByTagName("fieldset")[1];
    let inputit = field.getElementsByTagName("input");
    let labels = field.getElementsByTagName("label");
    if (inputit.length > 2) {
        for (let i = inputit.length-1; i >= 2; i--) {
            field.removeChild(labels[i].parentNode);
        }
    }
    paivitaLista();
    }
    else {
        //console.log("ei onnistunu!");
        return;
    }
}

/**
 * Hakee joukkueen nnimen
 */
function joukkueenNimi() {
    let inp = document.getElementById("nimi");
    return inp.value.trim();
}

/**
 * Luo joukkueelle uuden id:n
 */
function uusId() {
    let id = 0;
    let dataj = data.joukkueet;
    for (let i = 0; i < dataj.length; i++) {
        if (dataj[i].id > id) {
            id = dataj[i].id;
        }
    }
    return id+1;
}

/**
 * Hakee uudelle joukkueelle jäsenet
 */
function lisaaJasenet() {
    let taul = [];
    let field = document.getElementsByTagName("fieldset")[1];
    let inputit = field.getElementsByTagName("input");
    for (let i = 0; i < inputit.length; i++) {
        if (inputit[i].value.trim() !== "") {
            taul.push(inputit[i].value);
        }
    }
    return taul;
}

/**
 * Hakee uudelle joukkueelle leimaustavat
 */
function leimausTavat() {
    /*let taul = [];  
    let leima = "GPS";
    for (let i = 0; i < data.leimaustavat.length; i++) {
        if (leima === data.leimaustavat[i]) {
            taul.push(i);
        }
    }
    return taul;*/
    let taul = [];
    let checkboxit = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxit.length; i++) {
        if (checkboxit[i].checked) {
            taul.push(i);
        }
    }
    if (taul.length < 1) {
        tarkista_leimat(taul);
    }
    return taul;
}

/**
 * Tarkistaa onko jokin leimaustavoista valittu
 * @param {*} t taulukko
 */
 function tarkista_leimat(t) {
    let checkboxit = document.querySelectorAll('input[type="checkbox"]');
    for (let c of checkboxit) {
        if ( t.size ) {
          c.setCustomValidity("");
        } else {
          c.setCustomValidity("Joku pittää valita!");
          c.reportValidity();
        }
    }
}

/**
 * Ottaa uudelle joukkueelle valitun sarjan
 */
function otaSarja() {
    let radio = document.getElementsByName("sarja");
    let sarjanimi;
    for (let k = 0; k < radio.length; k++) {
        if (radio[k].checked == true) {
            sarjanimi = radio[k].parentElement;
            let nimi = sarjanimi.textContent;
            let datas = data.sarjat;
            for (let i = 0; i < datas.length; i++) {
                if (datas[i].nimi === nimi) {
                    return datas[i].id;
                }
            }
        }
    }
}

/**
 * Eventlistener toisen formin syöttökentille
 */
 window.addEventListener("load", function() {
    let field = document.getElementsByTagName("fieldset")[1];
    let inputit = field.getElementsByTagName("input");
  
    inputit[1].addEventListener("input", lisaaUusi);

    /**
     * Lisää uuden label input kentän jos tarvitsee
     * @param {*} e tapahtuma
     */
    function lisaaUusi(e) {
        let viimeinen_tyhja = -1;
        let f = document.getElementsByTagName("fieldset")[1];
        for(let i=inputit.length-1 ; i>-1; i--) {
            let input = inputit[i];
            if ( viimeinen_tyhja > -1 && input.value.trim() == "") { // ei kelpuuteta pelkkiä välilyöntejä
                let poistettava = inputit[viimeinen_tyhja].parentNode; // parentNode on label, joka sisältää inputin
                f.removeChild( poistettava );
                viimeinen_tyhja = i;
            }

            if ( viimeinen_tyhja == -1 && input.value.trim() == "") {
                viimeinen_tyhja = i;
            }   
        }
        if ( viimeinen_tyhja == -1) {
            let label = document.createElement("label");
            let p = document.createElement("p");
            label.textContent = "Jäsen";
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("name", "jasen");
            input.setAttribute("class", "oikealle inputLeveys");
            input.addEventListener("input", lisaaUusi);
            f.appendChild(p).appendChild(label).appendChild(input);
        }
        for(let i=0; i<inputit.length; i++) { // inputit näkyy ulommasta funktiosta
            let label = inputit[i].parentNode;
            label.setAttribute("for","jäsen"+(i+1));
            inputit[i].setAttribute("id", "jasen"+(i+1));
            label.firstChild.nodeValue = "Jäsen " + (i+1); // päivitetään labelin ekan lapsen eli tekstin sisältö
        }
    }
});

/**
 * Päivittää joukkuelistauksen
 */
 function paivitaLista() {
    document.body.removeChild(document.body.lastChild);
    joukkueLista();
}