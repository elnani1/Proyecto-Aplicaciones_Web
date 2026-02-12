console.log('eliminarUsuario.js cargado correctamente');

function openModalEliminar(userData) {
    console.log('openModalEliminar llamado', userData);
    
    if (userData) {
        window.usuarioAEliminar = userData;
    }
    
    const modal = document.getElementById('modalOverlayEliminar');
    console.log('Modal eliminar encontrado:', modal);
    
    if (modal) {
        modal.classList.remove('hidden');
        console.log('Modal eliminar abierto');
    } else {
        console.error('No se encontró el modal de eliminar');
    }
}

function closeModalEliminar() {
    console.log('closeModalEliminar llamado');
    const modal = document.getElementById('modalOverlayEliminar');
    
    if (modal) {
        modal.classList.add('hidden');
    }
    
    window.usuarioAEliminar = null;
}

function eliminarUsuario() {
    console.log('Eliminando usuario:', window.usuarioAEliminar);
    alert('Usuario eliminado exitosamente');
    closeModalEliminar();
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - eliminarUsuario.js');
    
    const modalOverlayEliminar = document.getElementById('modalOverlayEliminar');
    
    if (modalOverlayEliminar) {
        console.log('Modal overlay eliminar encontrado');
        modalOverlayEliminar.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModalEliminar();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModalEliminar();
        }
    });
});

window.openModalEliminar = openModalEliminar;
window.closeModalEliminar = closeModalEliminar;
window.eliminarUsuario = eliminarUsuario;

console.log('Funciones globales de eliminar asignadas');