
document.addEventListener("DOMContentLoaded", function () {

    // 1. Vertinimo slankiklių reikšmių atnaujinimas
    const vertinimai = [
        { input: "vertinimas1", output: "reiksme1" },
        { input: "vertinimas2", output: "reiksme2" },
        { input: "vertinimas3", output: "reiksme3" }
    ];

    vertinimai.forEach(function (item) {
        const slankiklis = document.getElementById(item.input);
        const reiksme = document.getElementById(item.output);

        if (slankiklis && reiksme) {
            slankiklis.addEventListener("input", function () {
                reiksme.textContent = slankiklis.value;
            });
        }
    });


    // 2. Formos pasirinkimas
    const forma = document.querySelector(".php-email-form");


    // 3. Neaktyvaus Siųsti mygtuko funkcionalumas
    const siustiMygtukas = document.getElementById("siusti");

    if (forma && siustiMygtukas) {

        function tikrintiForma() {
            siustiMygtukas.disabled = !forma.checkValidity();
        }

        // Tikrinama įvedant arba keičiant duomenis
        forma.addEventListener("input", tikrintiForma);
        forma.addEventListener("change", tikrintiForma);

        // Pradžioje mygtukas neaktyvus
        tikrintiForma();
    }


    // 4. Formos duomenų apdorojimas
    if (forma) {

        forma.addEventListener("submit", function (event) {

            // Sustabdomas numatytasis formos pateikimas
            event.preventDefault();

            // Patikrinama forma
            if (!forma.checkValidity()) {
                forma.reportValidity();
                return;
            }

            // 5. Sukuriamas JavaScript objektas
            const formosDuomenys = {
                vardas: forma.elements["vardas"].value,
                pavarde: forma.elements["pavarde"].value,
                email: forma.elements["email"].value,
                telefonas: forma.elements["telefonas"].value,
                adresas: forma.elements["adresas"].value,
                vertinimas1: forma.elements["vertinimas1"].value,
                vertinimas2: forma.elements["vertinimas2"].value,
                vertinimas3: forma.elements["vertinimas3"].value
            };


            // 6. Apskaičiuojamas trijų klausimų vidurkis
            const vidurkis = (
                Number(formosDuomenys.vertinimas1) +
                Number(formosDuomenys.vertinimas2) +
                Number(formosDuomenys.vertinimas3)
            ) / 3;

            // Vidurkis pridedamas prie objekto
            formosDuomenys.vidurkis = vidurkis.toFixed(2);


            // 7. Objektas išvedamas naršyklės konsolėje
            console.log("Formos duomenys:");
            console.log(formosDuomenys);


            // 8. Duomenys atvaizduojami svetainėje
            const rezultatas = document.getElementById("formos-rezultatas");

            if (!rezultatas) {
                console.error("Nerastas formos rezultatų elementas!");
                return;
            }

            rezultatas.replaceChildren();

            const antraste = document.createElement("h3");
            antraste.textContent = "Jūsų pateikti duomenys:";
            rezultatas.appendChild(antraste);


            // 9. Formos duomenų sąrašas
            const laukai = [
                ["Vardas", formosDuomenys.vardas],
                ["Pavardė", formosDuomenys.pavarde],
                ["El. paštas", formosDuomenys.email],
                ["Tel. Numeris", formosDuomenys.telefonas],
                ["Adresas", formosDuomenys.adresas],
                ["Vertinimas 1", formosDuomenys.vertinimas1],
                ["Vertinimas 2", formosDuomenys.vertinimas2],
                ["Vertinimas 3", formosDuomenys.vertinimas3]
            ];


            // 10. Kiekvieno lauko atvaizdavimas
            laukai.forEach(function (laukas) {

                const eilute = document.createElement("p");
                const pavadinimas = document.createElement("strong");

                pavadinimas.textContent = laukas[0] + ": ";

                eilute.appendChild(pavadinimas);
                eilute.appendChild(document.createTextNode(laukas[1]));

                rezultatas.appendChild(eilute);

            });


            // 11. Vardo, pavardės ir vidurkio atvaizdavimas
            const vidurkioRezultatas = document.createElement("h3");

            vidurkioRezultatas.textContent =
                formosDuomenys.vardas + " " +
                formosDuomenys.pavarde + ": " +
                formosDuomenys.vidurkis;

            rezultatas.appendChild(vidurkioRezultatas);

        });
    }

});

