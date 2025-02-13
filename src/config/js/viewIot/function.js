const nameIot = document.querySelector("#nameIot");

const btnIoTs = document.querySelectorAll(".btnIot");

btnIoTs.forEach(btnIoT => {
    btnIoT.addEventListener("click", function () {
        nameIot.value = this.value;
    });
});