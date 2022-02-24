import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CursoAyudantesPage } from './curso-ayudantes.page';

describe('CursoAyudantesPage', () => {
  let component: CursoAyudantesPage;
  let fixture: ComponentFixture<CursoAyudantesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoAyudantesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoAyudantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
