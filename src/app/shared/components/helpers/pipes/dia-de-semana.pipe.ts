import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {
  transform(value: Date): string {
    if (!value) {
      return ''; // Otra acción apropiada si value es undefined o null
    }
    
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayIndex = value.getDay();
    return daysOfWeek[dayIndex];
  }
}
