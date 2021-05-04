import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.page.html',
  styleUrls: ['./carousel.page.scss'],
})
export class CarouselPage implements OnInit {

  carousel = []

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private router: Router,
              private nativeAudio: NativeAudio,) { }

  ionViewWillEnter(){
    this.nativeAudio.preloadSimple('audioWo','assets/audio/mario-bros-mamma-mia.mp3')
  }

  ngOnInit() {

    firebase.firestore().collection('Carousel').orderBy('Orden').onSnapshot(snap =>{
      this.carousel = []
        snap.forEach(element => {
          this.carousel.push(element.data())
        })
        this.nativeAudio.play('audioWo')
    })
  }

  IonViewWillLeave(){
    this.nativeAudio.unload('audioWo')
  }




}
