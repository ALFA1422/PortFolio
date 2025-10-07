import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { DianaBaseComponent } from '../diana-base/diana-base';

@Component({
  selector: 'app-menu-dianas',
  standalone: true,
  imports: [CommonModule, RouterModule, DianaBaseComponent],
  templateUrl: './menu-dianas.html',
  styleUrls: ['./menu-dianas.scss'],
})
export class MenuDianasComponent {
  rutaActual$ = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    this.rutaActual$.next(this.router.url);
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.rutaActual$.next(e.urlAfterRedirects));
  }
}
