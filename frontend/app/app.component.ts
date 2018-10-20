import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public authGuard: AuthGuard
  ) {
  }

  ngOnInit(): void {

  }

}
