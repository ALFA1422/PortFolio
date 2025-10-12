import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PuertaSalidaEdificioComponent } from '../puerta-salida-edificio/puerta-salida-edificio';

interface Dialogo {
  id: string;
  texto: string;
  respuestas?: { texto: string; next?: string }[];
}

@Component({
  selector: 'app-taberna',
  standalone: true,
  imports: [CommonModule, PuertaSalidaEdificioComponent],
  templateUrl: './taberna.html',
  styleUrls: ['./taberna.scss']
})
export class TabernaComponent implements AfterViewInit {
  mostrarDialogo = false;
  dialogoInicial = true;
  dialogoActual: Dialogo | null = null;
  conversacionTerminada = false;
  puertaAbierta = false;
  enBarra = false; // ⬅️ botón fijo visible cuando estamos en la barra/zoom
  
  constructor(private router: Router, private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Esperamos a que el DOM esté realmente renderizado
    setTimeout(() => {
      const contenedor = document.querySelector('.tabernero-container');
      const escena = document.querySelector('.escena-taberna');

      if (!contenedor || !escena) return;

      this.renderer.removeClass(contenedor, 'mirando-activo');

      setTimeout(() => this.renderer.addClass(contenedor, 'mirando-activo'), 1500);

      // Mostrar saludo
      setTimeout(() => {
        this.mostrarDialogo = true;
        this.dialogoInicial = true;

        // 🪑 Después del saludo, destacar taburetes
        setTimeout(() => {
          this.renderer.addClass(escena, 'destacar-taburetes');
        }, 1500);
      }, 2000);
    }, 0);
  }


  /** 🔍 Acercarse al tabernero (zoom + conversación) */
  acercarseAlTabernero() {
    const escena = document.querySelector('.escena-taberna') as HTMLElement;
    const tabernero = document.querySelector('.tabernero-container img.mirando') as HTMLElement;
    if (!escena || !tabernero) return;
    if (escena.classList.contains('zoom-tabern')) return;

    const rectEscena = escena.getBoundingClientRect();
    const rectTabernero = tabernero.getBoundingClientRect();
    const taberneroCenterX = rectTabernero.left + rectTabernero.width / 2;
    const taberneroCenterY = rectTabernero.top + rectTabernero.height / 2;
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const offsetX = viewportCenterX - taberneroCenterX;
    const offsetY = viewportCenterY - taberneroCenterY;
    const txPercent = -50 + (offsetX / rectEscena.width) * 100;
    const tyPercent = -50 + (offsetY / rectEscena.height) * 100;

    const zoomScale = 3.6;
    const zoomSpeed = 4000; // 4 segundos de animación
    const offsetFineX = 50;
    const offsetFineY = 0;

    // Aplicar parámetros CSS dinámicos
    escena.style.setProperty('--zoom-tx', `${txPercent}%`);
    escena.style.setProperty('--zoom-ty', `${tyPercent}%`);
    escena.style.setProperty('--zoom-scale', `${zoomScale}`);
    escena.style.setProperty('--zoom-offset-x', `${offsetFineX}px`);
    escena.style.setProperty('--zoom-offset-y', `${offsetFineY}px`);
    escena.style.setProperty('--zoom-speed', `${zoomSpeed / 1000}s`);

    escena.classList.add('zoom-tabern');

    // 🕓 Esperar a que el zoom termine antes de mostrar la conversación
    this.dialogoInicial = false;
    this.mostrarDialogo = false;

    setTimeout(() => {
      this.enBarra = true;          // ⬅️ mostrar botón fijo
      this.mostrarDialogo = true;
      this.iniciarConversacion();
    }, zoomSpeed + 200);
  }


  /** 🗣️ Diálogo completo */
  iniciarConversacion() {
    this.dialogoActual = {
      id: 'inicio',
      texto: 'Han pasado muchas cosas esta noche, Sheriff. Ese tipo del cartel —el de “SE BUSCA”— ha estado aquí hace un rato. Entró tambaleándose, pidiendo whisky, con una mirada que no olvidaré. Poco después, el banco ardía. Lo que buscaba... lo llevaba en las manos, una especie de tabla negra con botones y una cuerda colgando.',
      respuestas: [
        { texto: '¿Sabes qué era esa tabla?', next: 'tabla' },
        { texto: '¿Qué dijo cuando estuvo aquí?', next: 'habla' },
        { texto: '¿Viste hacia dónde se fue?', next: 'ubicacion' }
      ]
    };
  }

  seleccionarRespuesta(nextId?: string) {
    if (!nextId) return;

    switch (nextId) {
      case 'tabla':
        this.dialogoActual = {
          id: 'tabla',
          texto: 'No tengo idea. Parecía importante para él. La sujetaba como si fuera su última esperanza. Dijo que con esa “tabla” podía traer cosas de su mundo a este. Tonterías de borracho, pensé.',
          respuestas: [
            { texto: '¿Te contó cómo funcionaba?', next: 'funciona' },
            { texto: '¿Parecía peligroso?', next: 'peligro' }
          ]
        };
        break;

      case 'funciona':
        this.dialogoActual = {
          id: 'funciona',
          texto: 'Decía que pulsando los botones podía invocar objetos y darles vida. “Todo está hecho de código”, repetía una y otra vez. Hablaba de comandos, estructuras y algo que llamó Angular, TypeScript... Palabras raras para mí.',
          respuestas: [
            { texto: 'Angular... suena a brujería.', next: 'brujeria' },
            { texto: 'Y tú, ¿le creíste?', next: 'creer' }
          ]
        };
        break;

      case 'peligro':
        this.dialogoActual = {
          id: 'peligro',
          texto: 'Peligroso... no sé, pero tenía la mirada de alguien que ya no distingue la realidad del sueño. Decía que había entrado aquí por error... que este mundo era suyo, construido con esas palabras que sólo él entendía.',
          respuestas: [
            { texto: '¿Dijo por qué lo hizo?', next: 'motivo' },
            { texto: '¿Y tú qué hiciste?', next: 'reaccion' }
          ]
        };
        break;

      case 'motivo':
        this.dialogoActual = {
          id: 'motivo',
          texto: 'Decía que había perdido algo. Algo que necesitaba para volver a su mundo. Que sin eso... quedaría atrapado aquí, entre los píxeles y el polvo.',
          respuestas: [
            { texto: '¿Se refería a la tabla?', next: 'tabla' },
            { texto: 'Curiosa historia...', next: 'creer' }
          ]
        };
        break;

      case 'reaccion':
        this.dialogoActual = {
          id: 'reaccion',
          texto: 'Yo sólo llené su vaso y lo escuché. No todos los días entra alguien que asegura haber creado el mundo en el que vive.',
          respuestas: [
            { texto: 'Quizás decía la verdad...', next: 'creer' },
            { texto: 'Tal vez estaba loco...', next: 'final' }
          ]
        };
        break;

      case 'brujeria':
        this.dialogoActual = {
          id: 'brujeria',
          texto: 'Brujería, tecnología... no sé qué diferencia hay, Serif. Dijo que con esos lenguajes podía crear lugares, gentes, hasta historias. Que este pueblo nació de ellos. Yo sólo sirvo whisky, no mundos.',
          respuestas: [
            { texto: 'Parece que hablaba en serio...', next: 'creer' },
            { texto: 'Y luego incendió el banco...', next: 'banco' }
          ]
        };
        break;

      case 'creer':
        this.dialogoActual = {
          id: 'creer',
          texto: 'No le di crédito. Aquí todos cuentan historias después de unas copas. Pero cuando oí la explosión del banco, supe que no eran simples delirios. Puede que realmente trajera algo de su mundo al nuestro.',
          respuestas: [
            { texto: '¿Algo como qué?', next: 'objeto' },
            { texto: '¿Volvió después?', next: 'volver' }
          ]
        };
        break;

      case 'habla':
        this.dialogoActual = {
          id: 'habla',
          texto: 'Dijo muchas cosas, Serif... demasiadas para un hombre sobrio. Hablaba de “crear mundos” con algo llamado Angular, y de darles vida con un tal TypeScript. Nombró una nube donde guardaba su oro... AWS, creo. Y otras palabras: Socket, Mongo, Nest... Sonaban a hechizos prohibidos.',
          respuestas: [
            { texto: '¿Hechizos prohibidos?', next: 'hechizos' },
            { texto: '¿Qué más decía?', next: 'mas' }
          ]
        };
        break;

      case 'hechizos':
        this.dialogoActual = {
          id: 'hechizos',
          texto: 'Sí. Decía que con esos hechizos podía hacer que las cosas se movieran solas, que la gente hablara sin verse... como si el aire llevara las palabras. Lo llamó “Socket.IO”, un espíritu que viaja por los cables.',
          respuestas: [
            { texto: '¿Y tú le creíste?', next: 'creer' },
            { texto: 'Sigue...', next: 'mas' }
          ]
        };
        break;

      case 'mas':
        this.dialogoActual = {
          id: 'mas',
          texto: 'No paraba de reír, diciendo que podía levantar tabernas, bancos y hasta ciudades enteras con un lenguaje invisible llamado HTML. Y que las vestía con algo llamado Tailwind y CSS, como si les cosiera la ropa al alma. Yo sólo le serví otro whisky y le dije que aquí eso se llama delirio.',
          respuestas: [
            { texto: 'Quizá no era delirio...', next: 'creer' },
            { texto: 'Eso suena a brujería pura.', next: 'brujeria' }
          ]
        };
        break;

      case 'objeto':
        this.dialogoActual = {
          id: 'objeto',
          texto: 'Decía que su “tabla con botones” era la llave. Que con ella podía cruzar de un mundo al otro. Un teclado, creo que lo llamó. No sé qué demonios es eso, pero juró que sin él estaría atrapado aquí para siempre.',
          respuestas: [
            { texto: 'Y ahora ha vuelto a por él...', next: 'vuelve' },
            { texto: '¿Dijo algo más?', next: 'final' }
          ]
        };
        break;

      case 'volver':
        this.dialogoActual = {
          id: 'volver',
          texto: 'Volvió, sí. Lo vi pasar de nuevo por la puerta, más decidido que antes. Tenía la mirada de quien ya no teme nada, ni siquiera a su propia creación.',
          respuestas: [
            { texto: '¿Y qué hizo?', next: 'banco' },
            { texto: 'Entonces el incendio...', next: 'banco' }
          ]
        };
        break;

      case 'banco':
        this.dialogoActual = {
          id: 'banco',
          texto: 'Sí... el banco. Dicen que entró gritando “¡deploy fallido!” y luego todo empezó a arder. Nadie entendió esas palabras, pero sonaron... definitivas.',
          respuestas: [
            { texto: 'Vaya historia...', next: 'final' },
            { texto: 'Quizás lo encuentre en el desierto...', next: 'final' }
          ]
        };
        break;

      case 'vuelve':
        this.dialogoActual = {
          id: 'vuelve',
          texto: 'Sí... volvió al banco y lo quemó. Salió con esa cosa en las manos, gritando que tenía que “reconectar con el sistema”. Luego montó a caballo y se perdió en el desierto. El humo aún se ve desde aquí.',
          respuestas: [
            { texto: 'El sistema...', next: 'sistema' },
            { texto: '¿Crees que regresará?', next: 'final' }
          ]
        };
        break;

      case 'sistema':
        this.dialogoActual = {
          id: 'sistema',
          texto: 'No sé qué quiso decir. Pero antes de irse dijo una última cosa... que todos nosotros estábamos dentro de su código. Y se rió, como si fuera un chiste privado entre él y el mismísimo diablo.',
          respuestas: [
            { texto: 'Quizás no mentía...', next: 'final' },
            { texto: 'Vaya historia...', next: 'final' }
          ]
        };
        break;

      case 'ubicacion':
        this.dialogoActual = {
          id: 'ubicacion',
          texto: 'Salió del pueblo por el camino de las montañas. Iba borracho, pero decidido. Decía que arriba, donde se acaba el polvo, encontraría la salida.',
          respuestas: [
            { texto: 'La salida...', next: 'sistema' },
            { texto: 'Gracias, tabernero.', next: 'final' }
          ]
        };
        break;

      default:
        this.dialogoActual = {
          id: 'final',
          texto: 'Buena suerte, Serif. Si lo encuentra... no le mire a los ojos. A veces, los dioses de los códigos no soportan que les devuelvan la mirada.'
        };
        this.conversacionTerminada = true;
        break;
    }
  }

  /** 🔙 Botón de volver al pueblo */
  volverAlPueblo() {
    const escena = document.getElementById('taberna');
    escena?.classList.add('saliendo');
    setTimeout(() => this.router.navigate(['/tombstone']), 800);
  }

  abrirPuertaAnimada() {
    if (this.puertaAbierta) return;
    this.puertaAbierta = true;

    const overlay = document.querySelector('.tunnel-overlay') as HTMLElement;
    if (!overlay) return;

    // 1️⃣ Activamos la animación del túnel (ya presente)
    overlay.classList.add('activa');

    // 2️⃣ Después de ~1.2 s, completamos el fundido a negro total
    setTimeout(() => {
      overlay.classList.add('fundido-total');
    }, 1200);

    // 3️⃣ Al acabar el fundido (≈2 s), cambiamos de escena
    setTimeout(() => {
      this.volverAlPueblo();
    }, 2000);
  }

  /** ↩️ Volver a la vista completa (salir del zoom) */
  volverVistaGeneral() {
    const escena = document.querySelector('.escena-taberna') as HTMLElement;
    if (!escena) return;

    // 🔸 añadimos clase de animación "zoom-out"
    escena.classList.remove('zoom-tabern');
    escena.classList.add('zoom-out');

    // limpiamos estados al acabar la animación
    setTimeout(() => {
      escena.classList.remove('zoom-out');
      this.enBarra = false;              // oculta botón fijo
      this.mostrarDialogo = false;
      this.conversacionTerminada = false;
      this.dialogoInicial = true;

      // 🪑 reactivar taburetes después de volver
      setTimeout(() => escena.classList.add('destacar-taburetes'), 600);
    }, 1800); // coincide con la duración CSS
  }

}


