import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  registerForm: FormGroup;
  valueOfFeeling;
  valueOfWhen;
  valueofwhen;
  data: any[] = [];

  constructor(
    private storage: Storage,
    private alertController: AlertController
  ) {
    this.registerForm = new FormGroup({
      note: new FormControl(),
      valueoffeel: new FormControl(),
      valueofwhen: new FormControl(),
      date: new FormControl(),
      time: new FormControl(),      
   });
   this.valueOfFeeling = ['5','4','3','2','1','0','-1','-2','-3','-4','-5'];
   this.valueOfWhen = ['Sekarang', 'Pilih Waktu'];
  }

  ionViewWillEnter(){  
    this.storage.get('data').then(val =>{
      if(val){
        this.data = val;
      }
    })
  }

  async presentAlert(form) {
    const alert = await this.alertController.create({
       message: 'Yakin?',
      buttons: [
        {
          text: 'Tidak',
          handler: () => {//do nothing
          }
        },
        {
          text: 'Iya',
          handler: () => {
            this.submit(form)
          }
        }
      ]
    });
    alert.present();
  }

  submit(form){
    

    let date;
    if (form.valueofwhen == 'Sekarang'){
      date = new Date();
    }else{
      date = new Date(form.time);
    }

    this.data.push({date: date, note: form.note, valueOfFeeling: form.valueoffeel});
    this.storage.set("data", this.data);

    this.registerForm.reset();
  }

  public optionsFn(): void { //here item is an object 
    console.log('ubah', this.valueofwhen);
  }
}
