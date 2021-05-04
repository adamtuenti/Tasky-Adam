import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearGrupoPage } from './crear-grupo.page';

describe('CrearGrupoPage', () => {
  let component: CrearGrupoPage;
  let fixture: ComponentFixture<CrearGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearGrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
