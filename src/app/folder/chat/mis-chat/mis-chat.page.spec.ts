import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisChatPage } from './mis-chat.page';

describe('MisChatPage', () => {
  let component: MisChatPage;
  let fixture: ComponentFixture<MisChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
