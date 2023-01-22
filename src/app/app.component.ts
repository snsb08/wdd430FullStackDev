import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cms';
  
  selectedFeature = 'contacts';


  constructor() {}

  ngOnInit(){}

  switchView(selectedFeature:string){
    this.selectedFeature = selectedFeature;
  }
}
