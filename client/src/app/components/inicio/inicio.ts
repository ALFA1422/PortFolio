import { Component, HostListener } from '@angular/core';
import { MenuDianasComponent } from '../menu-dianas/menu-dianas';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MenuDianasComponent], // 👈 lo añades aquí
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss']
})
export class InicioComponent {
  scrollIntensity = 0;

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    this.scrollIntensity += event.deltaY * -0.001;
    this.scrollIntensity = Math.max(0, Math.min(1, this.scrollIntensity));

    const fadeLayer = document.getElementById('fadeLayer');
    if (fadeLayer) {
      fadeLayer.style.opacity = (this.scrollIntensity * 0.9).toString();
    }
  }
}
