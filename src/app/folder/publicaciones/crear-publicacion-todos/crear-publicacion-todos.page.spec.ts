import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearPublicacionTodosPage } from './crear-publicacion-todos.page';

describe('CrearPublicacionTodosPage', () => {
  let component: CrearPublicacionTodosPage;
  let fixture: ComponentFixture<CrearPublicacionTodosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPublicacionTodosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPublicacionTodosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
