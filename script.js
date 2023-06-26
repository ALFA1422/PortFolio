document.addEventListener('DOMContentLoaded', function() {
  const headerLinks = document.querySelectorAll('header a');
  const menuToggle = document.getElementById('menu-toggle');

  headerLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offset = targetElement.offsetTop;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }

      // Ocultar el menú desplegable después de hacer clic en un enlace
      menuToggle.selectedIndex = 0;
    });
  });

  menuToggle.addEventListener('change', function() {
    const targetId = "#" + this.value;
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const offset = targetElement.offsetTop;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });

  // Agrega una clase "active" al enlace correspondiente en la botonera superior cuando se desplaza a una sección
  window.addEventListener('scroll', function() {
    const currentScrollPos = window.pageYOffset;

    headerLinks.forEach(function(link) {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const targetOffsetTop = targetElement.offsetTop;
        const targetHeight = targetElement.offsetHeight;

        if (currentScrollPos >= targetOffsetTop && currentScrollPos < targetOffsetTop + targetHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });
});





  
  

  
  

  
  

  