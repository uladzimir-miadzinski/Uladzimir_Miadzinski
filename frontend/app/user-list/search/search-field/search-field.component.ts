import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {
  @Input() name = '';
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onKeyUp(event: KeyboardEvent) {
    if (event !== null && event.target !== null) {
      this.name = (event.target as Element).innerHTML;
    }
    this.nameChange.emit(this.name);
  }

}
