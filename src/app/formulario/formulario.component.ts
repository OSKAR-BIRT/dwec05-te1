import { Component, ViewChild, ElementRef } from '@angular/core';
import { DatosJuego, generarEnteroAleatorio } from '../Modelos/Configuracion';


@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  // Atributos para los contenidos de los input
  contenidoNombre: string = "";
  contenidoRango: number = 0;
  contenidoIntentos: number = 0;

  // Atributos con los contenidos de los mensajes de error de cada input
  public feedbackNombre: string = "";
  public feedbackRango: string = ""
  public feedbackIntentos: string = ""

  // Atributos booleanas que controlan si cada elemento del formulario es correcto
  public nombreOK: boolean = false;
  public rangoOK: boolean = false;
  public intentosOK: boolean = false;

  // Atributos booleanos que controlan si los elementos del formulario están activos o no
  public deshabilitarIniciarJuego: boolean = true;
  public deshabilitarNombre: boolean = false;
  public deshabilitarRango: boolean = false;
  public deshabilitarIntentos: boolean = false;

  // Otros atributos de la fase del juego
  public intentosRestantes: number = 0;
  public estamosEnFaseJuego: boolean = false;
  public feedbackJuego: string = "";
  public numeroBuscado: number = 0;
  public numeroSugerido: number = 0;
  public juegoFinalizado: boolean = false;


  /************************************************************
   * function tratarBlur
   * @input {focusEvent}  Evento que ha llamado a la función
   * @output {void}
   * Cuando se pierde el foco de los input esta función comprueba el contenido
   * del input que ha perdido el foco y actualiza las variables booleanas que
   * controlan si el contenido es correcto
  */
  tratarBlur(evento: FocusEvent): void {
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
    this.deshabilitarIniciarJuego = !(this.nombreOK && this.intentosOK && this.rangoOK);

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

    // Guardamos los datos del juego en el json del modelo
    DatosJuego.nombreJugador = this.contenidoNombre;
    DatosJuego.rangoJuego = this.contenidoRango;
    DatosJuego.intentos = this.contenidoIntentos;

    // Llamamos al programa que gestiona el juego
    this.jugarAlJuegoDeAdivinacion();


  }


  jugarAlJuegoDeAdivinacion(): void {

    // Configuramos los parámetros booleanos que muestran la zona de juego y bloquean la zona del formulario
    this.deshabilitarIniciarJuego = true;
    this.deshabilitarNombre = true;
    this.deshabilitarRango = true;
    this.deshabilitarIntentos = true;
    this.estamosEnFaseJuego = true;

    // Configuramos el parámetro de intentos restantes
    this.intentosRestantes = this.contenidoIntentos;

    // Generamos el número buscado
    this.numeroBuscado = generarEnteroAleatorio(1, this.contenidoRango);

  }



  comprobarJuego(): void {


    if (this.intentosRestantes > 0) {
      if (this.numeroSugerido > this.numeroBuscado) {
        this.feedbackJuego = 'Te pasaste. Inténtalo de nuevo';
        this.intentosRestantes--;
      } else if (this.numeroSugerido == this.numeroBuscado) {
        this.juegoFinalizado = true;
        this.feedbackJuego = 'Has ganado, el número buscado era el ' + this.numeroBuscado;
      } else if (this.numeroSugerido == this.numeroBuscado - 1) {
        this.feedbackJuego = 'Caliente. Inténtalo de nuevo';
        this.intentosRestantes--;
      } else if (this.numeroSugerido == this.numeroBuscado - 2) {
        this.feedbackJuego = 'Templado. Inténtalo de nuevo';
        this.intentosRestantes--;
      } else {
        this.feedbackJuego = 'Frio. Inténtalo de nuevo';
        this.intentosRestantes--;
      }
    }

    if (this.intentosRestantes == 0) {
      // Si entramos en este bloque es porque en el bloque anterior se ha consumido el número de intentos
      // y no se ha encontrado la solución.
      this.juegoFinalizado = true;
      this.feedbackJuego = 'GAME OVER - PERDISTE. El número buscado era el ' + this.numeroBuscado;
    }

  }

  reiniciarJuego() : void {
    
    this.contenidoNombre = "";
    this.contenidoRango = 0;
    this.contenidoIntentos = 0;

    this.nombreOK = false;
    this.rangoOK = false;
    this.intentosOK = false;

    this.deshabilitarIniciarJuego = true;
    this.deshabilitarNombre = false;
    this.deshabilitarRango = false;
    this.deshabilitarIntentos = false;

    this.intentosRestantes = 0;
    this.estamosEnFaseJuego = false;
    this.feedbackJuego = "";
    this.numeroBuscado = 0;
    this.numeroSugerido = 0;
    this.juegoFinalizado = false;
  }


}

