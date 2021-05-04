import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearAyudantiaPage } from './crear-ayudantia.page';

describe('CrearAyudantiaPage', () => {
  let component: CrearAyudantiaPage;
  let fixture: ComponentFixture<CrearAyudantiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAyudantiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearAyudantiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
