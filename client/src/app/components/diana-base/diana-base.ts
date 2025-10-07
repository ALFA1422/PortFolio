import {
  Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diana-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diana-base.html',
  styleUrls: ['./diana-base.scss'],
})
export class DianaBaseComponent implements OnChanges {
  @Input() imagenEntera!: string;
  @Input() imagenRotaIzq!: string;
  @Input() imagenRotaDer!: string;
  @Input() ruta!: string;
  @Input() rutaActual!: string | null;
  @Input() escala = 1;
  @Input() escalaIzq = 1;
  @Input() escalaDer = 1;
  @Input() offsetIzq = -30;
  @Input() offsetDer = 30;
  @Input() rotacionIzq = 0;
  @Input() rotacionDer = 0;
  @Input() offsetYIzq = 0;
  @Input() offsetYDer = 0;

  rota = false;
  rompiendose = false;

  @ViewChild('wrapper', { static: true }) wrapper!: ElementRef<HTMLElement>;
  @ViewChild('entera', { static: false }) entera?: ElementRef<HTMLImageElement>;

  constructor(private router: Router, private rd: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rutaActual'] && this.rutaActual)
      this.rota = this.rutaActual === this.ruta;
  }

  /** 💥 Golpe sobre las mitades (sin romper el aire) */
  impactoMitad(event: MouseEvent) {
    const img = event.currentTarget as HTMLImageElement;
    img.animate(
      [
        { transform: 'translateZ(0px) rotateX(0deg) scale(1)', filter: 'brightness(1)' },
        { transform: 'translateZ(-80px) rotateX(-15deg) scale(1.05)', filter: 'brightness(1.3)', offset: 0.2 },
        { transform: 'translateZ(40px) rotateX(10deg) scale(0.98)', filter: 'brightness(1.1)', offset: 0.45 },
        { transform: 'translateZ(-25px) rotateX(-6deg) scale(1.02)', offset: 0.7 },
        { transform: 'translateZ(0px) rotateX(0deg) scale(1)', filter: 'brightness(1)', offset: 1 },
      ],
      {
        duration: 1200,
        easing: 'cubic-bezier(0.42, 1.4, 0.44, 1)',
        fill: 'forwards',
        composite: 'add',
      }
    );
  }

  /** 🎯 Disparo principal */
  async romperDiana() {
    if (this.rota || this.rompiendose) return;
    this.rompiendose = true;
    const img = this.entera?.nativeElement;
    if (!img) return;

    img.classList.remove('animate-columpio');
    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

    // ⚡️ Animación de impacto realista (piñata con peso)
    img.animate(
      [
        // golpe inicial
        { transform: 'rotateX(0deg)', filter: 'brightness(1)' },
        { transform: 'rotateX(-70deg) rotateZ(-5deg) scale(1.05)', filter: 'brightness(1.5)', offset: 0.1 },
        // rebote hacia delante
        { transform: 'rotateX(45deg) rotateZ(3deg) scale(0.97)', filter: 'brightness(1.2)', offset: 0.25 },
        // retroceso medio
        { transform: 'rotateX(-30deg) rotateZ(-2deg)', offset: 0.4 },
        // movimiento amortiguado
        { transform: 'rotateX(20deg) rotateZ(1deg)', offset: 0.55 },
        { transform: 'rotateX(-10deg) rotateZ(-0.5deg)', offset: 0.7 },
        // 🌀 pequeño temblor
        { transform: 'rotateX(5deg) rotateZ(1deg)', offset: 0.8 },
        { transform: 'rotateX(-5deg) rotateZ(-1deg)', offset: 0.85 },
        { transform: 'rotateX(3deg) rotateZ(0.5deg)', offset: 0.9 },
        // estabiliza
        { transform: 'rotateX(0deg) rotateZ(0deg) scale(1)', filter: 'brightness(1)', offset: 1 },
      ],
      { duration: 3000, easing: 'cubic-bezier(0.4, 1.6, 0.4, 1)', fill: 'forwards' }
    );

    // ☁️ Fundido y ruptura final
    const overlay = this.rd.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed', inset: '0', background: 'white',
      opacity: '0', pointerEvents: 'none', zIndex: '9999',
    });
    this.rd.appendChild(document.body, overlay);

    await delay(2200);
    overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 800,
      easing: 'ease-in-out',
      fill: 'forwards',
    });

    await delay(400);
    this.rota = true; // cambia a mitades
    await delay(600);

    if (this.ruta) this.router.navigateByUrl(this.ruta);

    const fadeOut = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 600,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
    await fadeOut.finished.catch(() => {});
    this.rd.removeChild(document.body, overlay);

    this.rompiendose = false;
  }
}
