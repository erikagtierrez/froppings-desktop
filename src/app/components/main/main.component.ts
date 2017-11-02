import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  type:any="";
  
  constructor(
    private router: Router,    
  ) { }

  ngOnInit() {
    this.type=localStorage.getItem("type");
    if(this.type=="Mercadeo"){
      this.router.navigateByUrl("/promotions");    
    }
  }

}
