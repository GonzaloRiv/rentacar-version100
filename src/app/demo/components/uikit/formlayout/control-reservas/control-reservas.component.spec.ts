import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlReservasComponent } from './control-reservas.component';

describe('ControlReservasComponent', () => {
  let component: ControlReservasComponent;
  let fixture: ComponentFixture<ControlReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
