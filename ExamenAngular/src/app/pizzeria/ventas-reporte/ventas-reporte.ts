import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzeriaService } from '../services/pizzeria';

@Component({
  selector: 'app-ventas-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas-reporte.html',
})
export class VentasReporte {
  tipoConsulta: 'dia' | 'mes' = 'dia';
  parametro: string = 'lunes';
  ventas: any[] = [];
  totalAcumulado: number = 0;

  constructor(private pizzeriaService: PizzeriaService) {}

  consultar(): void {
    if (!this.parametro.trim()) return;

    if (this.tipoConsulta === 'dia') {
      this.pizzeriaService.obtenerVentasPorDia(this.parametro.trim()).subscribe({
        next: (res) => {
          this.ventas = res.ventas || [];
          this.totalAcumulado = res.totalAcumulado ?? this.ventas.reduce((acc, curr) => acc + curr.total, 0);
        },
        error: (err) => console.error(err)
      });
    } else {
      this.pizzeriaService.obtenerVentasPorMes(this.parametro.trim()).subscribe({
        next: (res) => {
          this.ventas = res.ventas || [];
          this.totalAcumulado = res.totalAcumulado ?? this.ventas.reduce((acc, curr) => acc + curr.total, 0);
        },
        error: (err) => console.error(err)
      });
    }
  }
}