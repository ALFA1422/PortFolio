document.addEventListener('DOMContentLoaded', function () {
  // Seleccionar todos los enlaces de la cabecera y las opciones del menú
  const headerLinks = document.querySelectorAll('header a, header option');
  // Obtener el elemento de cambio de menú
  const menuToggle = document.getElementById('togglemenu');

  // Función para marcar el enlace activo
  function setActiveLink(targetId) {
    headerLinks.forEach(function (link) {
      // Eliminar la clase 'active' de todos los enlaces
      link.classList.remove('active');
      if (link.getAttribute('href') === targetId) {
        // Agregar la clase 'active' al enlace correspondiente al targetId
        link.classList.add('active');
      }
    });
  }

  // Manejar el evento de clic en los enlaces de la cabecera
  headerLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offset = targetElement.offsetTop;
        // Desplazamiento suave hasta el elemento objetivo
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
        setActiveLink(targetId); // Marcar el enlace como activo
        window.history.pushState(null, null, targetId); // Actualizar la URL con el nombre de la sección
      }

      if (menuToggle) {
        // Establecer el índice seleccionado en función del targetId
        menuToggle.selectedIndex = Array.from(menuToggle.options).findIndex(option => option.value === targetId);
      }
    });
  });

  // Manejar el evento de cambio en el menú desplegable
  if (menuToggle) {
    menuToggle.addEventListener('change', function () {
      const targetId = "#" + this.value;
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offset = targetElement.offsetTop;
        // Desplazamiento suave hasta el elemento objetivo
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });

        setActiveLink(targetId);
        window.history.pushState(null, null, targetId);
      }
    });
  }

  // Manejar el evento de cambio en el historial del navegador (navegación hacia atrás/adelante)
  window.addEventListener('popstate', function () {
    const currentPath = window.location.hash;
    setActiveLink(currentPath);
  });

  // Manejar el evento de desplazamiento de la ventana
  window.addEventListener('scroll', function () {
    const currentScrollPos = window.pageYOffset;

    headerLinks.forEach(function (link) {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const targetOffsetTop = targetElement.offsetTop;
        const targetHeight = targetElement.offsetHeight;

        if (currentScrollPos >= targetOffsetTop && currentScrollPos < targetOffsetTop + targetHeight) {
          // Agregar la clase 'active' al enlace correspondiente a la sección visible en la ventana
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });
});