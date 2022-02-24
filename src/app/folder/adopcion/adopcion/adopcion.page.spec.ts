import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdopcionPage } from './adopcion.page';

describe('AdopcionPage', () => {
  let component: AdopcionPage;
  let fixture: ComponentFixture<AdopcionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopcionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdopcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
