import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicacionesMateriaPage } from './publicaciones-materia.page';

describe('PublicacionesMateriaPage', () => {
  let component: PublicacionesMateriaPage;
  let fixture: ComponentFixture<PublicacionesMateriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionesMateriaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicacionesMateriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
