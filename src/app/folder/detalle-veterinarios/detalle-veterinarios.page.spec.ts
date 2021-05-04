import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleVeterinariosPage } from './detalle-veterinarios.page';

describe('DetalleVeterinariosPage', () => {
  let component: DetalleVeterinariosPage;
  let fixture: ComponentFixture<DetalleVeterinariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleVeterinariosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleVeterinariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
