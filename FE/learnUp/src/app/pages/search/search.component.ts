import { Component, OnInit,ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';;
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SearchService } from '../service/search.service';
import { CourService } from '../service/cour.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent   {
  f =new FormGroup({
    level: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required)
});
 er:string|null=null;
    cour:{ idSubject: number, nameSub: string }[]=[]
    spec :{ idspe: number, namespe: string }[] = [];
    levels: { namelevel: string, idlevel: number }[] = [];
    cl:{ idclass: number, nameclass: string }[]=[]
    constructor(private elementRef: ElementRef, private route: Router, private search: SearchService,private c :CourService) {
      this.search.getAllLevel().subscribe((data: { namelevel: string, idlevel: number }[]) => {
        this.levels = data;
      });
    }
    getCouId(){
      const cd = this.f.get("course")?.value;
      if(cd){
        this.c.setId(parseInt(cd));
      }
    }
    getSpe() {
      const levelId = this.f.get("level")?.value;
      if (levelId) {
        this.search.getSpecialty(levelId).subscribe((data: { idspe: number, namespe: string }[]) => {
          this.spec = data;
        });
      }
    }
    getclass(){
      const c = this.f.get("speciality")?.value;
      if (c) {
        this.search.getAllClass(c).subscribe((data:{ idclass: number, nameclass: string }[]) => {
          this.cl = data;
        });
        console.log(this.cl);
        
      }
    }
    getCour(){
      const c = this.f.get("class")?.value;
      if (c) {
        this.search.getAllCour(c).subscribe((data:{ idSubject: number, nameSub: string }[]) => {
          this.cour = data;
        });        
      }
    }
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
    btn.disabled=false;
    this.route.navigate(['/home/Cour']);
  }
}

