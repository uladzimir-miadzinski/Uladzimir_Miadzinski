import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../user-service.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  @Input() users?: User[];

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
