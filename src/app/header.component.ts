import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// import {Header} from '../header.model';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() selectedFeatureEvent = new EventEmitter<string>();
  // header: Header;

  constructor() {}

  ngOnInit(){}

  onSelected(selectedEvent: string){
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
