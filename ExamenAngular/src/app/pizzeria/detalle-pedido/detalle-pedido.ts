import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PizzeriaService } from '../services/pizzeria';
import { DetallePizza, Cliente, PedidoCompleto } from '../models/pizza';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-pedido.html',
})
export class DetallePedido implements OnInit {
  pizzas: DetallePizza[] = [];
  cliente!: Cliente;
  indiceSeleccionado: number = -1;
  totalPedido: number = 0;

  constructor(public pizzeriaService: PizzeriaService, private router: Router) {}

  ngOnInit(): void {
    this.cliente = this.pizzeriaService.clienteActual;
    this.pizzeriaService.pizzas$.subscribe((lista) => {
      this.pizzas = lista;
      this.totalPedido = this.pizzeriaService.calcularTotalPedido();
      this.indiceSeleccionado = -1;
    });
  }

  seleccionar(i: number): void {
    this.indiceSeleccionado = i;
  }

  quitar(): void {
    if (this.indiceSeleccionado >= 0) {
      this.pizzeriaService.quitarPizza(this.indiceSeleccionado);
    }
  }

  terminar(): void {
    if (this.pizzas.length === 0) return;

    const confirmar = confirm(`¿Cobrar pedido a ${this.cliente.nombre} por un total de $${this.totalPedido}?`);
    if (confirmar) {
      const pedido: PedidoCompleto = {
        cliente: this.cliente,
        pizzas: this.pizzas,
        total: this.totalPedido
      };

      this.pizzeriaService.guardarPedido(pedido).subscribe({
        next: () => {
          alert(`¡Venta guardada con éxito!`);
          this.pizzeriaService.limpiarPedido();
          this.router.navigate(['/ventas']);
        },
        error: (err) => {
          console.error(err);
          alert('Hubo un error al comunicar con Flask.');
        }
      });
    }
  }
}