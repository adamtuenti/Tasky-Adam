import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarouselPage } from './carousel.page';

describe('CarouselPage', () => {
  let component: CarouselPage;
  let fixture: ComponentFixture<CarouselPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
