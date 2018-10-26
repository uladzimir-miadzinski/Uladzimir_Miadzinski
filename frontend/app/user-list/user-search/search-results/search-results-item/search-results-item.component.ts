import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../services/auth.service';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.scss']
})
export class SearchResultsItemComponent implements OnInit {
  @Input() user?: User;

  constructor() {
  }

  ngOnInit() {
  }

}
