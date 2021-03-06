import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../profile/shared/user.service';
import {NewUser} from '../profile/shared/newUser.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  users: any;
  user: NewUser = new NewUser('', '', '', '', '');
  errorMessage: string;
  username: string;
  password: string;
  loginOk: string;
  data: Date = new Date();


  constructor( private activatedRoute: ActivatedRoute,
               private router: Router,
              private userService: UserService) {}

  ngOnInit(): void {
    localStorage.setItem('username', '');
    localStorage.setItem('mapType', '');
    localStorage.setItem('userId', '');
     }

  login() {
    this.userService.login(this.username, this.password).subscribe(data => {
      if (data._body === '') {
        alert('login or password is incorrect');
      } else {
        localStorage.setItem('username', this.username);
        this.userService.findByName(this.username)
          .subscribe(userFound => {
            if (userFound.mapType != null) {
              localStorage.setItem('mapType', userFound.mapType);
            } else {
              localStorage.setItem('mapType', 'streets');
            }
            localStorage.setItem('userId', userFound.id);
            }
          );

        console.log('local storage is: ' + localStorage.getItem('username'));
        this.router.navigateByUrl('/mountain/getall');
      }
    });
  }


}
