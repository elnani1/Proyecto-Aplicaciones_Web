const API_URL = "https://qn2j8bnf-5205.usw3.devtunnels.ms/api/Trabajador";

async function cargarTrabajadores() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const tabla = document.getElementById("tablaTrabajadores");

    tabla.innerHTML = data
        .map(t => `
            <tr>
                <td>${t.id}</td>
                <td>${t.name}</td>
                <td>${t.turno}</td>
                <td>${t.cargo}</td>
                <td>${t.activo ? "🟢" : "🔴"}</td>
            </tr>
        `)
        .join("");

    iniciarPaginacion(); 
}

function iniciarPaginacion() {
    const filasPorPagina = 5;
    let paginaActual = 1;

    const filas = document.querySelectorAll('#tablaTrabajadores tr');
    const totalPaginas = Math.ceil(filas.length / filasPorPagina);

    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const infoPagina = document.getElementById('infoPagina');

    function mostrarPagina(pagina) {
        filas.forEach((fila, i) => {
            const inicio = (pagina - 1) * filasPorPagina;
            const fin = inicio + filasPorPagina;
            fila.style.display = (i >= inicio && i < fin) ? '' : 'none';
        });

        infoPagina.textContent = ` ${pagina} de ${totalPaginas}`;
        btnAnterior.disabled = (pagina === 1);
        btnSiguiente.disabled = (pagina === totalPaginas);
    }

    btnAnterior.onclick = () => {
        if (paginaActual > 1) {
            paginaActual--;
            mostrarPagina(paginaActual);
        }
    };

    btnSiguiente.onclick = () => {
        if (paginaActual < totalPaginas) {
            paginaActual++;
            mostrarPagina(paginaActual);
        }
    };

    mostrarPagina(paginaActual);
}

cargarTrabajadores();
