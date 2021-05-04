import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisAyudantiasAnunciosPage } from './mis-ayudantias-anuncios.page';

describe('MisAyudantiasAnunciosPage', () => {
  let component: MisAyudantiasAnunciosPage;
  let fixture: ComponentFixture<MisAyudantiasAnunciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisAyudantiasAnunciosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisAyudantiasAnunciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
