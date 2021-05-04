import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdopcionDetallePage } from './adopcion-detalle.page';

describe('AdopcionDetallePage', () => {
  let component: AdopcionDetallePage;
  let fixture: ComponentFixture<AdopcionDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopcionDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdopcionDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
