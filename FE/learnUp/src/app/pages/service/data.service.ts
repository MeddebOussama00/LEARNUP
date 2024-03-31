import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private files: Array<{f: any, name: string ,dateFile:Date}> = [];
  constructor() { }
  set(v:any){
    this.files.push(v)
  }
  get(){
    return this.files;
  }
  upload(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const fileContent = new Uint8Array(e.target.result);
      this.files.push({ f: fileContent, name: file.name, dateFile: file.lastModifiedDate });

    }
    fileReader.readAsArrayBuffer(file);
  };
  }
}
