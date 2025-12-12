export var DatosJuego = {
    nombreJugador: "",
    rangoJuego: 0,
    intentos: 0
}

export function generarEnteroAleatorio(min: number, max: number): number {
    // Aseguramos que min y max sean enteros (por si acaso)
    min = Math.ceil(min);
    max = Math.floor(max);

    // La lógica principal:
    // 1. (max - min + 1): Calcula el tamaño del rango (ej. 1 a 10 es 10 números, 10 - 1 + 1)
    // 2. Math.random() * ...: Genera un número decimal aleatorio dentro del rango [0, rango_size)
    // 3. Math.floor(...): Convierte ese número decimal a un entero
    // 4. + min: Desplaza el resultado para que comience en 'min'
    return Math.floor(Math.random() * (max - min + 1)) + min;
}