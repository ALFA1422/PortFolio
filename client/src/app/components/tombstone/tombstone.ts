import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tombstone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tombstone.html',
  styleUrls: ['./tombstone.scss'],
})
export class TombstoneComponent {
  // 🔫 Aquí podrás añadir lógica más adelante:
  // - animaciones de entrada del sheriff
  // - aparición de edificios (taberna, banco, cárcel)
  // - sonido ambiente del pueblo o viento del desierto

  ngOnInit() {
    console.log('🏜️ Entrando en Tombstone...');
  }
}
