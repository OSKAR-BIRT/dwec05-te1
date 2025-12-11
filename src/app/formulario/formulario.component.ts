import { Component } from '@angular/core';
import { DatosJuego } from '../Modelos/Configuracion';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  // Variables para los contenidos de los input
  contenidoNombre: string = "";
  contenidoRango: number = 0;
  contenidoIntentos: number = 0;

  // Variables con los contenidos de los mensajes de error de cada input
  feedbackNombre: string = "El campo nombre no puede estar vacio";
  feedbackRango: string = "El rango tiene que ser por lo menos 4"
  feedbackIntentos: string = "El número mínimo de intentos es 1"

  // Variables booleanas que controlan si cada elemento es correcto
  nombreOK: boolean = false;
  rangoOK: boolean = false;
  intentosOK: boolean = false;
  deshabilitarBoton: boolean = true;

  /************************************************************
   * function tratarBlur
   * @input {focusEvent}  Evento que ha llamado a la función
   * @output {void}
   * Cuando se pierde el foco de los input esta función comprueba el contenido
   * del input que ha perdido el foco y actualiza las variables booleanas que
   * controlan si el contenido es correcto
  */
  tratarBlur(evento: FocusEvent) : void {
    const elementoGenerador = evento.target as HTMLInputElement;
    if (elementoGenerador.id == "nombre") {
      if (elementoGenerador.value == "") {
        this.feedbackNombre = "El campo nombre no puede estar vacio";
        this.nombreOK = false;
      } else {
        this.feedbackNombre = "";
        this.nombreOK = true;
        this.contenidoNombre = elementoGenerador.value;
      }
    } else if (elementoGenerador.id == "rango") {
      if (parseFloat(elementoGenerador.value) < 4) {
        this.feedbackRango = "El rango tiene que ser por lo menos 4";
        this.rangoOK = false;
      } else {
        this.feedbackRango = "";
        this.rangoOK = true;
        this.contenidoRango = parseFloat(elementoGenerador.value);
      }
    } else if (elementoGenerador.id == "intentos") {
      if (parseFloat(elementoGenerador.value) < 1) {
        this.feedbackIntentos = "El número mínimo de intentos es 1";
        this.intentosOK = false;
      } else {
        this.feedbackIntentos = "";
        this.intentosOK = true;
        this.contenidoIntentos = parseFloat(elementoGenerador.value);
      }
    }
    this.deshabilitarBoton = !(this.nombreOK && this.intentosOK && this.rangoOK);
    console.log(this.deshabilitarBoton);
    
  }

  /************************************************************
   * function iniciarJuego
   * @input {void}
   * @output {void}
   * Función que es llamada por el botón de iniciar el juego cuando es pulsado.
   * Recoge los datos y los almacena en la variable datosJuego que se ha importado 
   * de Configuracion.ts en la carpeta Modelos. Después pasa a la pantalla 
   * principal del juego.
  */
  iniciarJuego(): void {
    DatosJuego.nombreJugador = this.contenidoNombre;
    DatosJuego.rangoJuego = this.contenidoRango;
    DatosJuego.intentos = this.contenidoIntentos;

    alert(`${DatosJuego.nombreJugador} comienza el juego con un rango del 1 al ${DatosJuego.rangoJuego} y con ${DatosJuego.intentos} intentos.`);
  }

}

