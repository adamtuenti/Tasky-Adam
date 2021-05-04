import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdopcionEditarPage } from './adopcion-editar.page';

describe('AdopcionEditarPage', () => {
  let component: AdopcionEditarPage;
  let fixture: ComponentFixture<AdopcionEditarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopcionEditarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdopcionEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
