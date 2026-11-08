import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PizzeriaService } from '../services/pizzeria';
import { DetallePizza } from '../models/pizza';

@Component({
  selector: 'app-formulario-pedido',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-pedido.html',
})
export class FormularioPedido implements OnInit {
  formPedido!: FormGroup;

  ingredientesDisponibles = [
    { nombre: 'Jamón', costo: 10 },
    { nombre: 'Piña', costo: 10 },
    { nombre: 'Champiñones', costo: 10 }
  ];

  constructor(
    private fb: FormBuilder,
    private pizzeriaService: PizzeriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cli = this.pizzeriaService.clienteActual;
    this.formPedido = this.fb.group({
      nombre: [cli.nombre || '', Validators.required],
      direccion: [cli.direccion || '', Validators.required],
      telefono: [cli.telefono || '', Validators.required],
      tamano: ['Chica', Validators.required],
      ingredientes: this.fb.array([]),
      numPizzas: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onCheckboxChange(e: any): void {
    const checkArray: FormArray = this.formPedido.get('ingredientes') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  agregar(): void {
    if (this.formPedido.invalid) {
      alert('Por favor complete todos los datos requeridos.');
      return;
    }

    const val = this.formPedido.value;

    this.pizzeriaService.clienteActual = {
      nombre: val.nombre,
      direccion: val.direccion,
      telefono: val.telefono,
      fecha: new Date().toISOString().substring(0, 10)
    };

    let precioBase = 40;
    if (val.tamano === 'Mediana') precioBase = 80;
    if (val.tamano === 'Grande') precioBase = 120;

    const ingredientes: string[] = val.ingredientes;
    const costoIngredientes = ingredientes.length * 10;
    const cantidad = Number(val.numPizzas);
    const subtotal = (precioBase + costoIngredientes) * cantidad;

    const nuevaPizza: DetallePizza = {
      tamano: val.tamano,
      precioTamano: precioBase,
      ingredientes: ingredientes,
      costoIngredientes: costoIngredientes,
      numPizzas: cantidad,
      subtotal: subtotal
    };

    this.pizzeriaService.agregarPizza(nuevaPizza);

    // Salta automáticamente a la pestaña de Detalle y Cobro
    this.router.navigate(['/detalle']);
  }
}