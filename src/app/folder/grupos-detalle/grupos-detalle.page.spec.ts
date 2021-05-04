import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GruposDetallePage } from './grupos-detalle.page';

describe('GruposDetallePage', () => {
  let component: GruposDetallePage;
  let fixture: ComponentFixture<GruposDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GruposDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
