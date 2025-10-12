import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio';
import { TombstoneComponent } from './components/tombstone/tombstone';
import { TabernaComponent } from './components/tombstone/taberna/taberna';


export const routes: Routes = [
  { path: '', redirectTo: 'se-busca', pathMatch: 'full' },
  { path: 'se-busca', component: InicioComponent },
  {
    path: 'tombstone',
    component: TombstoneComponent,
    children: [
      { path: 'taberna', component: TabernaComponent },

      
    ],
  },
];
