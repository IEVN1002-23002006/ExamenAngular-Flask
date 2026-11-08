import { Component } from '@angular/core';
import { FormularioPedido } from '../formulario-pedido/formulario-pedido';
import { DetallePedido } from '../detalle-pedido/detalle-pedido';
import { VentasReporte } from '../ventas-reporte/ventas-reporte';

@Component({
  selector: 'app-pedido-principal',
  standalone: true,
  imports: [FormularioPedido, DetallePedido, VentasReporte],
  templateUrl: './pedido-principal.html',
})
export class PedidoPrincipal {}