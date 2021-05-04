import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisAyudantiasPage } from './mis-ayudantias.page';

describe('MisAyudantiasPage', () => {
  let component: MisAyudantiasPage;
  let fixture: ComponentFixture<MisAyudantiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisAyudantiasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisAyudantiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
