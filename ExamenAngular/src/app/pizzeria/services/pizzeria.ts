import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente, DetallePizza, PedidoCompleto } from '../models/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzeriaService {
  private apiUrl = 'http://127.0.0.1:5000/api';

  // Almacén temporal de pizzas del pedido en curso
  private pizzasSubject = new BehaviorSubject<DetallePizza[]>([]);
  public pizzas$ = this.pizzasSubject.asObservable();

  // Datos del cliente guardados temporalmente
  public clienteActual: Cliente = { nombre: '', direccion: '', telefono: '', fecha: '' };

  constructor(private http: HttpClient) {}

  agregarPizza(pizza: DetallePizza): void {
    const listaActual = this.pizzasSubject.value;
    pizza.idTemp = Date.now();
    this.pizzasSubject.next([...listaActual, pizza]);
  }

  quitarPizza(index: number): void {
    const lista = [...this.pizzasSubject.value];
    lista.splice(index, 1);
    this.pizzasSubject.next(lista);
  }

  limpiarPedido(): void {
    this.pizzasSubject.next([]);
    this.clienteActual = { nombre: '', direccion: '', telefono: '', fecha: '' };
  }

  obtenerPizzasActuales(): DetallePizza[] {
    return this.pizzasSubject.value;
  }

  calcularTotalPedido(): number {
    return this.pizzasSubject.value.reduce((acc, p) => acc + p.subtotal, 0);
  }

  // Endpoints hacia Flask
  guardarPedido(pedido: PedidoCompleto): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedidos`, pedido);
  }

  obtenerVentasPorDia(dia: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ventas/dia/${dia}`);
  }

  obtenerVentasPorMes(mes: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ventas/mes/${mes}`);
  }

  obtenerDetalleVenta(idVenta: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ventas/detalle/${idVenta}`);
  }
}