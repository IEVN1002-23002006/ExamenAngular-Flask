import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pedido', pathMatch: 'full' },
  {
    path: 'pedido',
    loadComponent: () =>
      import('./pizzeria/formulario-pedido/formulario-pedido').then((c) => c.FormularioPedido)
  },
  {
    path: 'detalle',
    loadComponent: () =>
      import('./pizzeria/detalle-pedido/detalle-pedido').then((c) => c.DetallePedido)
  },
  {
    path: 'ventas',
    loadComponent: () =>
      import('./pizzeria/ventas-reporte/ventas-reporte').then((c) => c.VentasReporte)
  }
];