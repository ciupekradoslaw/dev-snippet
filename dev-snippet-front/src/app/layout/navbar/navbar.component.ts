import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    MatButton,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
