import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarGrupoPage } from './editar-grupo.page';

describe('EditarGrupoPage', () => {
  let component: EditarGrupoPage;
  let fixture: ComponentFixture<EditarGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarGrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
