// ============================================
// SCRIPT PARA HEADER INTERACTIVO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del DOM
    const searchInput = document.querySelector('.search-filters input[type="text"]');
    const roleSelect = document.querySelectorAll('.search-filters select')[0];
    const shiftSelect = document.querySelectorAll('.search-filters select')[1];
    const statusSelect = document.querySelectorAll('.search-filters select')[2];
    const clearButton = document.querySelector('.btn-secondary');
    const avatar = document.querySelector('.avatar');
    const userName = document.querySelector('.name');
    const userRole = document.querySelector('.role');

    // ============================================
    // FUNCIONALIDAD DE BÚSQUEDA Y FILTROS
    // ============================================

    // Guardar valores de filtros
    let filters = {
        search: '',
        role: 'Todas',
        shift: 'Todas',
        status: 'Todas'
    };

    // Búsqueda en tiempo real
    searchInput.addEventListener('input', function(e) {
        filters.search = e.target.value.toLowerCase();
        applyFilters();
        
        // Efecto visual al escribir
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    // Filtro por rol
    roleSelect.addEventListener('change', function(e) {
        filters.role = e.target.value;
        applyFilters();
        animateSelect(this);
    });

    // Filtro por turno
    shiftSelect.addEventListener('change', function(e) {
        filters.shift = e.target.value;
        applyFilters();
        animateSelect(this);
    });

    // Filtro por estado
    statusSelect.addEventListener('change', function(e) {
        filters.status = e.target.value;
        applyFilters();
        animateSelect(this);
    });

    // Función para aplicar filtros
    function applyFilters() {
        console.log('Filtros aplicados:', filters);
        
        // Aquí puedes agregar lógica para filtrar elementos en tu página
        // Por ejemplo, filtrar una tabla o lista de usuarios
        
        // Mostrar feedback visual
        showFilterFeedback();
        
        // Emitir evento personalizado para otros componentes
        const filterEvent = new CustomEvent('filtersChanged', { 
            detail: filters 
        });
        document.dispatchEvent(filterEvent);
    }

    // Feedback visual al filtrar
    function showFilterFeedback() {
        const activeFilters = Object.values(filters).filter(v => v !== '' && v !== 'Todas').length;
        
        if (activeFilters > 0) {
            clearButton.classList.add('active');
            clearButton.textContent = `Limpiar (${activeFilters})`;
        } else {
            clearButton.classList.remove('active');
            clearButton.textContent = 'Limpiar';
        }
    }

    // Animación para selects
    function animateSelect(select) {
        select.style.transform = 'scale(1.05)';
        select.style.boxShadow = '0 4px 15px rgba(156, 106, 99, 0.3)';
        
        setTimeout(() => {
            select.style.transform = 'scale(1)';
            select.style.boxShadow = '';
        }, 300);
    }

    // ============================================
    // BOTÓN LIMPIAR FILTROS
    // ============================================

    clearButton.addEventListener('click', function() {
        // Limpiar todos los filtros
        filters = {
            search: '',
            role: 'Todas',
            shift: 'Todas',
            status: 'Todas'
        };

        // Resetear inputs
        searchInput.value = '';
        roleSelect.selectedIndex = 0;
        shiftSelect.selectedIndex = 0;
        statusSelect.selectedIndex = 0;

        // Animación del botón
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        // Aplicar filtros vacíos
        applyFilters();

        // Mostrar notificación
        showNotification('Filtros limpiados', 'success');
    });

    // ============================================
    // MENÚ DE USUARIO
    // ============================================

    // Crear menú desplegable de usuario
    const userInfo = document.querySelector('.user-info');
    let userMenuOpen = false;

    // Crear el menú si no existe
    if (!document.querySelector('.user-menu')) {
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <div class="menu-item" data-action="profile">
                <span class="menu-icon">👤</span>
                <span>Mi Perfil</span>
            </div>
            <div class="menu-item" data-action="settings">
                <span class="menu-icon">⚙️</span>
                <span>Configuración</span>
            </div>
            <div class="menu-item" data-action="notifications">
                <span class="menu-icon">🔔</span>
                <span>Notificaciones</span>
            </div>
            <div class="menu-divider"></div>
            <div class="menu-item" data-action="logout">
                <span class="menu-icon">🚪</span>
                <span>Cerrar Sesión</span>
            </div>
        `;
        userInfo.appendChild(userMenu);

        // Estilos para el menú
        const style = document.createElement('style');
        style.textContent = `
            .user-info {
                position: relative;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .user-info:hover {
                transform: translateY(-2px);
            }
            
            .user-menu {
                position: absolute;
                top: calc(100% + 10px);
                right: 0;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.15);
                min-width: 220px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                z-index: 1000;
                overflow: hidden;
            }
            
            .user-menu.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .menu-item {
                padding: 14px 18px;
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 14px;
                font-weight: 500;
                color: #333;
            }
            
            .menu-item:hover {
                background: linear-gradient(135deg, #f2e8dd 0%, #e8d9cc 100%);
                padding-left: 22px;
            }
            
            .menu-item:active {
                transform: scale(0.98);
            }
            
            .menu-icon {
                font-size: 18px;
                width: 24px;
                text-align: center;
            }
            
            .menu-divider {
                height: 1px;
                background: #e0e0e0;
                margin: 8px 12px;
            }
            
            .avatar {
                transition: all 0.3s ease;
            }
            
            .user-info:hover .avatar {
                transform: scale(1.1);
                box-shadow: 0 4px 15px rgba(156, 106, 99, 0.4);
            }
            
            .btn-secondary.active {
                background: linear-gradient(135deg, #a57866 0%, #8b6455 100%);
                color: white;
                animation: pulse 1.5s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }

            /* Notificación Toast */
            .notification-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 16px 24px;
                border-radius: 12px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 10000;
                animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .notification-toast.success {
                border-left: 4px solid #27ae60;
            }
            
            .notification-toast.info {
                border-left: 4px solid #3498db;
            }
        `;
        document.head.appendChild(style);
    }

    const userMenu = document.querySelector('.user-menu');

    // Toggle menú de usuario
    userInfo.addEventListener('click', function(e) {
        e.stopPropagation();
        userMenuOpen = !userMenuOpen;
        userMenu.classList.toggle('show');
        
        // Rotar avatar al abrir
        avatar.style.transform = userMenuOpen ? 'rotate(360deg) scale(1.1)' : 'rotate(0deg) scale(1)';
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!userInfo.contains(e.target)) {
            userMenuOpen = false;
            userMenu.classList.remove('show');
            avatar.style.transform = 'rotate(0deg) scale(1)';
        }
    });

    // Acciones del menú
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'profile':
                    showNotification('Abriendo perfil de usuario...', 'info');
                    console.log('Navegar a perfil');
                    // window.location.href = '/perfil';
                    break;
                    
                case 'settings':
                    showNotification('Abriendo configuración...', 'info');
                    console.log('Navegar a configuración');
                    // window.location.href = '/configuracion';
                    break;
                    
                case 'notifications':
                    showNotification('Abriendo notificaciones...', 'info');
                    console.log('Mostrar notificaciones');
                    break;
                    
                case 'logout':
                    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                        showNotification('Cerrando sesión...', 'success');
                        console.log('Cerrar sesión');
                        // setTimeout(() => {
                        //     window.location.href = '/login';
                        // }, 1500);
                    }
                    break;
            }
            
            // Cerrar menú
            userMenuOpen = false;
            userMenu.classList.remove('show');
        });
    });

    // ============================================
    // NOTIFICACIONES
    // ============================================

    function showNotification(message, type = 'success') {
        // Remover notificaciones existentes
        const existing = document.querySelector('.notification-toast');
        if (existing) existing.remove();

        // Crear notificación
        const toast = document.createElement('div');
        toast.className = `notification-toast ${type}`;
        
        const icon = type === 'success' ? '✅' : '📢';
        
        toast.innerHTML = `
            <span style="font-size: 20px;">${icon}</span>
            <span style="font-weight: 600; color: #333;">${message}</span>
        `;
        
        document.body.appendChild(toast);

        // Auto-remover después de 3 segundos
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ============================================
    // ANIMACIONES AL CARGAR
    // ============================================

    // Animar elementos al cargar
    setTimeout(() => {
        searchInput.style.opacity = '0';
        searchInput.style.transform = 'translateY(-10px)';
        searchInput.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            searchInput.style.opacity = '1';
            searchInput.style.transform = 'translateY(0)';
        }, 100);
    }, 0);

    // ============================================
    // ATAJOS DE TECLADO
    // ============================================

    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K para enfocar búsqueda
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
        
        // Esc para limpiar búsqueda
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            filters.search = '';
            applyFilters();
            searchInput.blur();
        }
    });

    // ============================================
    // ESTADO EN TIEMPO REAL
    // ============================================

    // Simular cambio de estado en tiempo real
    function updateUserStatus() {
        const statuses = ['🟢', '🟡', '🔴'];
        const currentStatus = userRole.textContent.match(/🟢|🟡|🔴/)?.[0] || '🟢';
        const currentIndex = statuses.indexOf(currentStatus);
        
        // Este sería actualizado desde el servidor en un caso real
        console.log('Estado actual:', currentStatus);
    }

    // Actualizar estado cada 30 segundos (opcional)
    // setInterval(updateUserStatus, 30000);

    // ============================================
    // LOG INICIAL
    // ============================================

    console.log('✅ Header script cargado correctamente');
    console.log('👤 Usuario:', userName.textContent);
    console.log('🎯 Rol:', userRole.textContent);
    console.log('⌨️  Atajos: Ctrl+K (buscar), Esc (limpiar)');
});

// ============================================
// FUNCIONES EXPORTABLES (si usas módulos)
// ============================================

// Función para actualizar info de usuario desde otro script
function updateUserInfo(name, role, status) {
    const userName = document.querySelector('.name');
    const userRole = document.querySelector('.role');
    
    if (userName) userName.textContent = name;
    if (userRole) userRole.textContent = `${role} ${status}`;
}

// Función para obtener filtros actuales
function getCurrentFilters() {
    return {
        search: document.querySelector('.search-filters input[type="text"]')?.value || '',
        role: document.querySelectorAll('.search-filters select')[0]?.value || 'Todas',
        shift: document.querySelectorAll('.search-filters select')[1]?.value || 'Todas',
        status: document.querySelectorAll('.search-filters select')[2]?.value || 'Todas'
    };
}

// Exportar funciones si usas módulos ES6
// export { updateUserInfo, getCurrentFilters };