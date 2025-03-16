const profile = document.querySelector("#btnUserPerfil");
const dropdown = document.querySelector(".dropdow__wrapper");

profile.addEventListener('click', () => {
    console.log("OLá")
    dropdown.classList.remove('none');
    dropdown.classList.toggle('hide');
});

document.addEventListener("click", (event) => {
    const isClickInsideDropdown = dropdown.contains(event.target);
    const isProfileClicked = profile.contains(event.target);

    if (!isClickInsideDropdown && !isProfileClicked) {
        dropdown.classList.add('hide');
        dropdown.classList.add('dropdown__wrapper--fade-in');
    }
});