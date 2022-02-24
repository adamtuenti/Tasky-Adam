import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CursoDetallePage } from './curso-detalle.page';

describe('CursoDetallePage', () => {
  let component: CursoDetallePage;
  let fixture: ComponentFixture<CursoDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
