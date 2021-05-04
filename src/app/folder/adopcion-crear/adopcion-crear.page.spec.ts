import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdopcionCrearPage } from './adopcion-crear.page';

describe('AdopcionCrearPage', () => {
  let component: AdopcionCrearPage;
  let fixture: ComponentFixture<AdopcionCrearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopcionCrearPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdopcionCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
