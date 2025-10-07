import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuDianasComponent } from './components/menu-dianas/menu-dianas';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenuDianasComponent],
  templateUrl: './app.html',
})
export class AppComponent implements AfterViewInit {
  private sonidoDisparo!: HTMLAudioElement;

  ngAfterViewInit(): void {
    // 🔫 Inicializar el sonido del cursor
    this.sonidoDisparo = new Audio('assets/sounds/disparo.mp3');
    this.sonidoDisparo.volume = 0.4;

    // 🎯 Cada clic en cualquier parte reproduce el disparo
    document.addEventListener('click', () => {
      this.reproducirDisparo();
    });
  }

  reproducirDisparo() {
    try {
      // Reinicia para permitir clics seguidos
      this.sonidoDisparo.currentTime = 0;
      this.sonidoDisparo.play().catch(() => {
        // Ignora si el navegador bloquea la primera reproducción
      });
    } catch (e) {
      console.warn('⚠️ Error al reproducir disparo:', e);
    }
  }
}
