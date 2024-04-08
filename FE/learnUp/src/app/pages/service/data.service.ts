import { Injectable } from '@angular/core';
import { Course } from '../course/course.component';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private files: Array<Course> = [];

  constructor() { }

  set(v: Course): void {
    this.files.push(v);
  }

  get(): Array<Course> {
    return this.files;
  }

  upload(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const fileContent = new Uint8Array(e.target.result);
        this.files.push({
          id: 0, 
          title: file.name,
          data: fileContent,
          type: 'cour',
          date: file.lastModifiedDate,
          nblike: 0,
          nbdislike: 0,
          id_U: 0, // Assign appropriate user ID
          id_sub: 0 // Assign appropriate subject ID
        });
      }
      fileReader.readAsArrayBuffer(file);
    }
  }
}
