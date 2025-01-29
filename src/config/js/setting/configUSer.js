document.addEventListener('DOMContentLoaded', function () {
    const btnEditar = document.getElementById('btnEditar');
    const inputs = document.querySelectorAll('input.form-control');

    let isEditable = false;

    btnEditar.addEventListener('click', function () {
        isEditable = !isEditable;

        inputs.forEach(input => {
            input.disabled = !isEditable;
        });

        if (isEditable) {
            btnEditar.textContent = 'Cancelar';
            btnEditar.classList.replace('btn-green', 'btn-outline-green');
        } else {
            btnEditar.textContent = 'Editar';
            btnEditar.classList.replace('btn-outline-green', 'btn-green');
        }
    });
});