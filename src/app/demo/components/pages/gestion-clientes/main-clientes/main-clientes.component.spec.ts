import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainClientesComponent } from './main-clientes.component';

describe('MainClientesComponent', () => {
  let component: MainClientesComponent;
  let fixture: ComponentFixture<MainClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
