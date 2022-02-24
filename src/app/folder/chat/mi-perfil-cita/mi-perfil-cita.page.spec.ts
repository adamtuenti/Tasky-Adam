import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MiPerfilCitaPage } from './mi-perfil-cita.page';

describe('MiPerfilCitaPage', () => {
  let component: MiPerfilCitaPage;
  let fixture: ComponentFixture<MiPerfilCitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiPerfilCitaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MiPerfilCitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
