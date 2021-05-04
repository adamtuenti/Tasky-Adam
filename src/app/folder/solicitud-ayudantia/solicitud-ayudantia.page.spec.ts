import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SolicitudAyudantiaPage } from './solicitud-ayudantia.page';

describe('SolicitudAyudantiaPage', () => {
  let component: SolicitudAyudantiaPage;
  let fixture: ComponentFixture<SolicitudAyudantiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudAyudantiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudAyudantiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
