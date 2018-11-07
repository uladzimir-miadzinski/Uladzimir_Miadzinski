import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { User } from '../user-service.interface';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { allUsers, DataState } from '../../redux/reducers';
import { LoadUsers } from '../../redux/actions/user/user.actions';
import { SearchFieldComponent } from './search-field/search-field.component';

@Component({
  selector: 'app-user-list-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  users$: Observable<User[]> = this.dataStore.pipe(select(allUsers));
  filteredUsers!: User[];

  @Input() isDropdownHidden = true;
  @Output() selectedUserChange: EventEmitter<User> = new EventEmitter<User>();

  @ViewChild(SearchFieldComponent)
  searchFieldComponent = SearchFieldComponent;

  constructor(
    private dataStore: Store<DataState>
  ) {
    this.dataStore.dispatch(new LoadUsers());
  }

  ngOnInit() {
  }

  searchOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
      event.preventDefault();
    }
  }

  search() {
    this.users$.subscribe((users: User[]) => {
      this.filteredUsers = users.filter((user: User) => this.filterBySearchField(user));
    });
  }

  filterBySearchField(user: User) {
    const nameToFind = this.searchFieldComponent.name || '';
    if (nameToFind === '') {
      return true;
    } else if (typeof user !== 'undefined' && typeof user.name !== 'undefined') {
      const words = user.name.split(' ');
      return words.find((word: string) => word.toLowerCase().startsWith(nameToFind.toLowerCase())) !== undefined;
    } else {
      return false;
    }
  }

  onSelectedUserChange(user: User) {
    this.selectedUserChange.emit(user);
  }

  ngAfterViewInit(): void {
    this.search();
  }
}
