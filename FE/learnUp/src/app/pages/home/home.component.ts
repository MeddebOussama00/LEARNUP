import { Component,OnInit,ViewEncapsulation} from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HOMEComponent   {

  
  /*upload(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
     const fileReader = new FileReader();
     fileReader.onload = (e: any) => {
      const fileContent = new Uint8Array(e.target.result);
      this.dataservice.set({ f: fileContent, name: file.name, dateFile: file.lastModifiedDate });

    }
    fileReader.readAsArrayBuffer(file);
  };
  }*/
    }  

