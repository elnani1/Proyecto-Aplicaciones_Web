// agregarUser.js

function openModal() {
    document.getElementById('modalOverlay').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.add('hidden');
    document.getElementById('userForm').reset();
}

// Cerrar modal al hacer clic fuera de él
document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    // Manejar el envío del formulario
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nombre: document.getElementById('nombre').value,
                primerApellido: document.getElementById('primerApellido').value,
                segundoApellido: document.getElementById('segundoApellido').value,
                turno: document.getElementById('turno').value,
                clave: document.getElementById('clave').value
            };

            console.log('Datos del formulario:', formData);
                        
            // Guardar user, por ejemplo, enviar los datos a un servidor
            
            alert('Usuario guardado exitosamente');
            closeModal();
        });
    }

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

const API_URL = "https://localhost:44306/api/Trabajador";

document.getElementById("userForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const primerApellido = document.getElementById("primerApellido").value.trim();
    const segundoApellido = document.getElementById("segundoApellido").value.trim();
    const turno = document.getElementById("turno").value;
    const cargo = document.getElementById("clave").value;

    // Construir el nombre completo
    const nombreCompleto = `${nombre} ${primerApellido} ${segundoApellido}`.trim();

    // Crear objeto EXACTO para la API
    const trabajador = {
        id: 0,
        name: nombreCompleto,
        turno: turno,
        cargo: cargo,
        activo: true
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trabajador)
        });

        if (!res.ok) {
            alert("Error al guardar el trabajador");
            return;
        }

        alert("Trabajador guardado correctamente");

        closeModal(); // Cierra tu modal
        
        // Si tienes una función para actualizar la tabla:
        // cargarTrabajadores();

    } catch (error) {
        console.error("Error al conectar con API:", error);
        alert("Error al conectar con la API");
    }
});

// Hacer las funciones globales para que puedan ser llamadas desde los iframes
window.openModal = openModal;
window.closeModal = closeModal;