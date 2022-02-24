import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CursoDetalleAnuncioPage } from './curso-detalle-anuncio.page';

describe('CursoDetalleAnuncioPage', () => {
  let component: CursoDetalleAnuncioPage;
  let fixture: ComponentFixture<CursoDetalleAnuncioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoDetalleAnuncioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoDetalleAnuncioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
