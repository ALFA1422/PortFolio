import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MenuDianasComponent } from './components/menu-dianas/menu-dianas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, MenuDianasComponent],
  templateUrl: './app.html',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  mostrarDianas = true;
  private sonidoDisparo!: HTMLAudioElement;
  private handleClickBound!: (event: MouseEvent) => void;

  constructor(private router: Router) {
    // ✅ Evalúa una vez al arrancar
    this.mostrarDianas = this.calcularSiMostrarDianas();

    // ✅ Y en cada navegación terminada
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => (this.mostrarDianas = this.calcularSiMostrarDianas()));
  }

  /** ✅ Solo muestra dianas en rutas raíz: /se-busca y /tombstone */
  private calcularSiMostrarDianas(): boolean {
    const root = this.router.routerState.snapshot.root;
    const segs: string[] = this.extraerSegmentos(root);

    // /se-busca            -> ["se-busca"]          ✅
    // /tombstone           -> ["tombstone"]         ✅
    // /tombstone/taberna   -> ["tombstone","taberna"] ❌
    if (segs.length === 1 && (segs[0] === 'se-busca' || segs[0] === 'tombstone')) {
      return true;
    }
    return false;
  }

  private extraerSegmentos(node: ActivatedRouteSnapshot): string[] {
    const segs: string[] = [];
    let current = node.firstChild;
    while (current) {
      const path = current.routeConfig?.path ?? '';
      if (path) segs.push(path);
      current = current.firstChild!;
    }
    return segs;
  }

  /** 🔫 Configurar sonido del disparo solo para clics sobre dianas */
  ngAfterViewInit(): void {
    this.sonidoDisparo = new Audio('assets/sounds/disparo.mp3');
    this.sonidoDisparo.volume = 0.4;

    // Guardamos la referencia para poder limpiar luego
    this.handleClickBound = (event) => this.handleClick(event);
    document.addEventListener('click', this.handleClickBound);
  }

  /** 🧠 Detectar clic sobre diana */
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // ✅ Solo reproducir si el clic fue en una diana o sus mitades
    const esDiana =
      target.classList.contains('diana-img') ||
      target.classList.contains('diana-mitad') ||
      target.closest('.diana-wrapper');

    if (esDiana) {
      this.reproducirDisparo();

      // 💥 Animación del cursor (mano rotada)
      document.body.classList.add('clicked');
      setTimeout(() => document.body.classList.remove('clicked'), 150);
    }
  }

  /** 🎵 Reproducir sonido */
  reproducirDisparo() {
    try {
      this.sonidoDisparo.currentTime = 0;
      this.sonidoDisparo.play().catch(() => {});
    } catch (e) {
      console.warn('⚠️ Error al reproducir disparo:', e);
    }
  }

  /** 🧹 Limpieza del listener global */
  ngOnDestroy(): void {
    if (this.handleClickBound) {
      document.removeEventListener('click', this.handleClickBound);
    }
  }
}
