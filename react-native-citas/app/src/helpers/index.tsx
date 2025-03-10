
export const formatearFecha = (fecha: string | number | Date) => {
    const nuevaFecha = new Date(fecha)
    const opciones: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}