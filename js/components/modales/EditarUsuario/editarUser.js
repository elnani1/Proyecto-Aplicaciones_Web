// editarUsuario.js
console.log('editarUsuario.js cargado correctamente');

function openModalEditar(userData) {
    console.log('openModalEditar llamado', userData);
    
    // Si se pasan datos del usuario, pre-llenar el formulario
    if (userData) {
        document.getElementById('nombreEditar').value = userData.nombre || '';
        document.getElementById('primerApellidoEditar').value = userData.primerApellido || '';
        document.getElementById('segundoApellidoEditar').value = userData.segundoApellido || '';
        document.getElementById('turnoEditar').value = userData.turno || '';
        document.getElementById('cargoEditar').value = userData.cargo || '';
    }
    
    const modal = document.getElementById('modalOverlayEditar');
    console.log('Modal encontrado:', modal);
    
    if (modal) {
        modal.classList.remove('hidden');
        console.log('Modal abierto');
    } else {
        console.error('No se encontró el modal con id: modalOverlayEditar');
    }
}

function closeModalEditar() {
    console.log('closeModalEditar llamado');
    const modal = document.getElementById('modalOverlayEditar');
    const form = document.getElementById('userFormEditar');
    
    if (modal) {
        modal.classList.add('hidden');
    }
    
    if (form) {
        form.reset();
    }
}

// Cerrar modal al hacer clic fuera de él
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - editarUsuario.js');
    
    const modalOverlayEditar = document.getElementById('modalOverlayEditar');
    
    if (modalOverlayEditar) {
        console.log('Modal overlay editar encontrado');
        modalOverlayEditar.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModalEditar();
            }
        });
    } else {
        console.error('No se encontró modalOverlayEditar en el DOM');
    }

    // Manejar el envío del formulario de edición
    const userFormEditar = document.getElementById('userFormEditar');
    if (userFormEditar) {
        console.log('Formulario de editar encontrado');
        userFormEditar.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nombre: document.getElementById('nombreEditar').value,
                primerApellido: document.getElementById('primerApellidoEditar').value,
                segundoApellido: document.getElementById('segundoApellidoEditar').value,
                turno: document.getElementById('turnoEditar').value,
                cargo: document.getElementById('cargoEditar').value
            };

            console.log('Datos actualizados del formulario:', formData);
            
            alert('Usuario actualizado exitosamente');
            closeModalEditar();
        });
    } else {
        console.error('No se encontró userFormEditar en el DOM');
    }

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModalEditar();
        }
    });
});

// Hacer las funciones globales para que puedan ser llamadas desde los iframes
window.openModalEditar = openModalEditar;
window.closeModalEditar = closeModalEditar;

console.log('Funciones globales de editar asignadas');