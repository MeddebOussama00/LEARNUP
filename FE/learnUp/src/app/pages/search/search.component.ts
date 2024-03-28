import { Component, OnInit,ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LearnService } from '../../learn.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  f =new FormGroup({
    level: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required)
});
 er:string|null=null;
  constructor(private elementRef: ElementRef) {}
  onSubmit() {
    const btn = this.elementRef.nativeElement.querySelector('#btn');
    if (this.f.invalid) {
      Swal.fire({
        icon: "error",
        title: "Wrong",
        text: 'Please fill out all required fields',
      });
      btn.disabled=true;
    }
  }
}

