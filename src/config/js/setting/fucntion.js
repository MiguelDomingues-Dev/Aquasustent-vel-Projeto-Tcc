const menus = document.querySelectorAll(".nav-links");
const profileSection = document.querySelector(".profile-section");
const notificationSection = document.querySelector(".otification-section");

const sections = {
    profile: profileSection,
    notification: notificationSection
};

menus.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        
        menus.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
        
        const sectionKey = this.getAttribute("data-section"); // Assumindo que os links têm um data-section correspondente
        
        Object.keys(sections).forEach(key => {
            sections[key].style.display = key === sectionKey ? "block" : "none";
        });
    });
});

const inputs = document.querySelectorAll(".input");
inputs.forEach(input => {
    input.disabled = true
})
document.querySelector(".edit").addEventListener("click", function () {
    inputs.forEach(input => {
        input.disabled = false
    });
})

