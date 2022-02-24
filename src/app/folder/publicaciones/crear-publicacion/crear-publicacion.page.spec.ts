import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearPublicacionPage } from './crear-publicacion.page';

describe('CrearPublicacionPage', () => {
  let component: CrearPublicacionPage;
  let fixture: ComponentFixture<CrearPublicacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPublicacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
