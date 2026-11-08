export interface Cliente {
  nombre: string;
  direccion: string;
  telefono: string;
  fecha: string;
}

export interface DetallePizza {
  idTemp?: number;
  tamano: string; // 'Chica', 'Mediana', 'Grande'
  precioTamano: number; // 40, 80, 120
  ingredientes: string[]; // Jamon, Pina, Champinones
  costoIngredientes: number; // $10 c/u
  numPizzas: number;
  subtotal: number;
}

export interface PedidoCompleto {
  cliente: Cliente;
  pizzas: DetallePizza[];
  total: number;
}

export interface VentaResumen {
  idVenta?: number;
  cliente: string;
  total: number;
  fecha?: string;
}