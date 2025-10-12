import { Component, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puerta-salida-edificio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puerta-salida-edificio.html',
  styleUrls: ['./puerta-salida-edificio.scss'],
})
export class PuertaSalidaEdificioComponent {
  @Input() destino: string = '/tombstone';
  puertaAbierta = false;

  constructor(private router: Router, private host: ElementRef) {}

animarSalida() {
  if (this.puertaAbierta) return;
  this.puertaAbierta = true;

  const puerta = this.host.nativeElement.querySelector('.puerta-salida') as HTMLElement;
  const overlay = document.querySelector('.fade-overlay') as HTMLElement; // 🌑 overlay global de tombstone

  if (!puerta || !overlay) return;

  // 🔦 Paso 1: animación leve en la puerta
  puerta.style.transition = 'transform 1.6s ease-in-out';
  puerta.style.transformOrigin = 'center center';
  puerta.style.transform = 'scale(1.4)';

  // 🌑 Paso 2: iniciar fundido negro global
  overlay.classList.add('activa');

  // 🚪 Paso 3: navegar al pueblo tras el fundido completo
  setTimeout(() => {
    this.router.navigate(['/tombstone']);
  }, 1200); // coincide con transition .8s del overlay
}


}
