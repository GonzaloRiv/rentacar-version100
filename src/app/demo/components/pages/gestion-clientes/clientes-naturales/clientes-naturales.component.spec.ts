import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesNaturalesComponent } from './clientes-naturales.component';

describe('ClientesNaturalesComponent', () => {
  let component: ClientesNaturalesComponent;
  let fixture: ComponentFixture<ClientesNaturalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesNaturalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesNaturalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
