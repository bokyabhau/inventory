import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'client';
  constructor(private http: HttpClient) {}

  onClick() {
    const sub = this.http.get('/api').subscribe((data) => {
      console.log(data);
      sub.unsubscribe();
    });
  }

  onGetSomething() {
    const sub = this.http.get('/api/something').subscribe((data) => {
      console.log(data);
      sub.unsubscribe();
    });
  }
}
