import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { NativeAudio } from '@ionic-native/native-audio/ngx';
// import { FullScreenImage } from '@ionic-native/full-screen-image';
import { SMS } from '@ionic-native/sms/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { ServiceWorkerModule } from '@angular/service-worker';
// import { SocketIoModule, SocketIoConfig} from 'ng-socket-io'



// const config: SocketIoConfig = {url: 'http://localhost:3001',options: {}}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // SocketIoModule.forRoot(config),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AppRoutingModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    PhotoViewer,
    // FullScreenImage,
    SMS,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}