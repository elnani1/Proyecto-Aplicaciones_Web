
        // Variables globales
        document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const usuarioInput = document.getElementById("usuario");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.querySelector(".toggle-password img");

  // 👁 Mostrar / ocultar contraseña (solo si existe el icono)
  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";

      // Cambia ícono automáticamente
      togglePassword.src = isPassword
        ? "./img/Untitled_Project_Visibility_Off_Icon.png"
        : "./img/Untitled_Project_Visibility_Icon_1.png";
    });
  }

  // 🧠 Validación del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = usuarioInput.value.trim();
    const password = passwordInput.value.trim();

    // Validar campos vacíos
    if (!usuario || !password) {
      alert(" Por favor, completa todos los campos.");
      return;
    }

    // Validar longitud mínima
    if (usuario.length < 3) {
      alert(" El usuario debe tener al menos 3 caracteres.");
      return;
    }

    if (password.length < 4) {
      alert(" La contraseña debe tener un mínimo de 4 caracteres.");
      return;
    }

    // Simulación de login (cámbialo por tu API después)
    if (usuario === "everardoklosova@gmail.com" && password === "12345") {
      alert(" Inicio de sesión exitoso");
      window.location.href = "hola.html"; 
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });
});