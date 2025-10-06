import { Component, AfterViewInit } from '@angular/core';
import { InicioComponent } from './components/inicio/inicio';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    InicioComponent,

  ],
  templateUrl: './app.html',
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const headerLinks = document.querySelectorAll('header a');
    const menuToggle = document.getElementById('menu-toggle') as HTMLSelectElement | null;

    if (!menuToggle || !headerLinks.length) return;

    // 🔹 Scroll suave para enlaces
    headerLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = (link as HTMLAnchorElement).getAttribute('href');
        if (!targetId) return;
        const targetElement = document.querySelector(targetId.startsWith('#') ? targetId : `#${targetId}`);
        if (targetElement) {
          const offset = (targetElement as HTMLElement).offsetTop - 60;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
        menuToggle.selectedIndex = 0;
      });
    });

    // 🔹 Scroll suave para el select móvil
    menuToggle.addEventListener('change', () => {
      const targetId = '#' + menuToggle.value;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = (targetElement as HTMLElement).offsetTop - 60;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });

    // 🔹 Resalta la sección activa según scroll
    window.addEventListener('scroll', () => {
      const currentScrollPos = window.scrollY;
      headerLinks.forEach(link => {
        const targetId = (link as HTMLAnchorElement).getAttribute('href');
        const targetElement = document.querySelector(targetId!);
        if (!targetElement) return;
        const top = (targetElement as HTMLElement).offsetTop - 80;
        const bottom = top + (targetElement as HTMLElement).offsetHeight;

        if (currentScrollPos >= top && currentScrollPos < bottom) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    });
  }
}
