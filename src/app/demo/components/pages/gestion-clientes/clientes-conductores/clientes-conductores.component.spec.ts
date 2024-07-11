import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesConductoresComponent } from './clientes-conductores.component';

describe('ClientesConductoresComponent', () => {
  let component: ClientesConductoresComponent;
  let fixture: ComponentFixture<ClientesConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesConductoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
