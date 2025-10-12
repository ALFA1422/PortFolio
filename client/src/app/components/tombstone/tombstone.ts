import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-tombstone',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './tombstone.html',
  styleUrls: ['./tombstone.scss'],
})
export class TombstoneComponent implements OnInit, OnDestroy {
  private sub!: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('🏜️ Entrando en Tombstone...');

    // 🔥 Cuando volvemos desde /tombstone/taberna → /tombstone
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        if (e.urlAfterRedirects === '/tombstone') {
          this.reaparecerPueblo();
        }
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  zoomYEntrar(ev: MouseEvent, ruta: string) {
  const escena = document.querySelector('.escena') as HTMLElement;
  const overlay = document.querySelector('.fade-overlay') as HTMLElement;
  const edificio = (ev.currentTarget || ev.target) as HTMLElement;
  if (!escena || !edificio) return;

  const escenaRect = escena.getBoundingClientRect();
  const edificioRect = edificio.getBoundingClientRect();

  const cx = (edificioRect.left + edificioRect.width / 2) - escenaRect.left;
  const cy = (edificioRect.top + edificioRect.height / 2) - escenaRect.top;

  const ox = (cx / escenaRect.width) * 100;
  const oy = (cy / escenaRect.height) * 100;

  escena.style.transformOrigin = `${ox}% ${oy}%`;
  escena.classList.add('zoom-inicio');
  setTimeout(() => overlay?.classList.add('activa'), 600);

  setTimeout(() => {
    this.router.navigate([ruta], { relativeTo: this.route });
  }, 1400);

  setTimeout(() => {
    escena.classList.remove('zoom-inicio');
    overlay?.classList.remove('activa');
    escena.style.transformOrigin = 'center center';
  }, 2400);
}

  private reaparecerPueblo() {
    const wrapper = document.querySelector('.pueblo-wrapper') as HTMLElement;
    const overlay = document.querySelector('.fade-overlay') as HTMLElement;

    if (wrapper) {
      wrapper.classList.remove('oculta', 'zoom-taberna');
      wrapper.classList.add('reaparece');
      wrapper.style.opacity = '1';
      wrapper.style.visibility = 'visible';
    }

    overlay?.classList.remove('activa');
    console.log('🌵 Pueblo reaparecido');
  }
}
