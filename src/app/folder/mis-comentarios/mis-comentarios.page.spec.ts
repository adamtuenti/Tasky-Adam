import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisComentariosPage } from './mis-comentarios.page';

describe('MisComentariosPage', () => {
  let component: MisComentariosPage;
  let fixture: ComponentFixture<MisComentariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisComentariosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
