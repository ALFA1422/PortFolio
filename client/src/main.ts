import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// 🔄 Detectar clics globalmente y cambiar el cursor temporalmente
window.addEventListener('mousedown', () => {
  document.body.classList.add('clicked');
});

window.addEventListener('mouseup', () => {
  setTimeout(() => {
    document.body.classList.remove('clicked');
  }, 50); // ligera pausa para que se perciba el giro
});
