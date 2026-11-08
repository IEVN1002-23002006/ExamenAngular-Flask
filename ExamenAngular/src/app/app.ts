import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-slate-950 border-b border-slate-800 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <span class="text-2xl">🍕</span>
        <span class="text-xl font-black tracking-wider text-amber-400">Pizzeria Chivis & Sara </span>
      </div>
      <div class="flex gap-2">
        <a
          routerLink="/pedido"
          routerLinkActive="bg-amber-500 text-slate-950 font-bold shadow"
          class="px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          1. Nuevo Pedido
        </a>
        <a
          routerLink="/detalle"
          routerLinkActive="bg-amber-500 text-slate-950 font-bold shadow"
          class="px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          2. Detalle y Cobro
        </a>
        <a
          routerLink="/ventas"
          routerLinkActive="bg-amber-500 text-slate-950 font-bold shadow"
          class="px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          3. Reporte de Ventas
        </a>
      </div>
    </nav>

    <main class="min-h-[calc(100vh-73px)] bg-white">
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {}