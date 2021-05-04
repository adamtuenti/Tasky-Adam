import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallePublicidadPage } from './detalle-publicidad.page';

describe('DetallePublicidadPage', () => {
  let component: DetallePublicidadPage;
  let fixture: ComponentFixture<DetallePublicidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePublicidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePublicidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
