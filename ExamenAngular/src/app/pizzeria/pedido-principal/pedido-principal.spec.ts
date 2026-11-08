import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoPrincipal } from './pedido-principal';

describe('PedidoPrincipal', () => {
  let component: PedidoPrincipal;
  let fixture: ComponentFixture<PedidoPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoPrincipal],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoPrincipal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
