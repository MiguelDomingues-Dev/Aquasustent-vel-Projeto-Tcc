const btnContinue = document.querySelector("#btnContinuarAdd");

const prepareCel = document.querySelector("#prepareCel");
const spaceModdal1 = document.querySelector("#spaceModdal1");

btnContinue.addEventListener("click", () => {
    prepareCel.style.display = 'block';
    spaceModdal1.style.display = 'none';
})