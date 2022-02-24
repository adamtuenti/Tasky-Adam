import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VeterinarioDetallePage } from './veterinario-detalle.page';

describe('VeterinarioDetallePage', () => {
  let component: VeterinarioDetallePage;
  let fixture: ComponentFixture<VeterinarioDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterinarioDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VeterinarioDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
