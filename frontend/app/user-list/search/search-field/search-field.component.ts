import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {
  name = '';

  constructor() {
  }

  ngOnInit() {
  }

  onKeyUp(event: KeyboardEvent) {
    if (event !== null && event.target !== null) {
      this.name = (event.target as Element).innerHTML || '';
    }
  }

}
