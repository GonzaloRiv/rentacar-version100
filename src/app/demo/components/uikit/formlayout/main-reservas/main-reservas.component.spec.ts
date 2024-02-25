import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainReservasComponent } from './main-reservas.component';

describe('MainReservasComponent', () => {
  let component: MainReservasComponent;
  let fixture: ComponentFixture<MainReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
