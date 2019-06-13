import { Component, OnInit } from '@angular/core';

import { HostListener } from '@angular/core';
import { Post } from '../shared/post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postCount: Number = 0;
  posts: Post[] = [];

  @HostListener("window:scroll", [])
  onScroll(): void {
    console.log("innerHeight :" + window.innerHeight + " scrolly " + window.scrollY + "body height " + document.body.offsetHeight)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log("at bottom");
      // console.log("innerHeight :" +window.innerHeight + " scrolly "+ window.scrollY + "body height "+ document.body.offsetHeight)
      //code for check total 
      alert("Load More..");
      console.log("OK");
      this.getPosts();
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    this.http.post('http://localhost:3000/post/getPosts', { skip: this.postCount }, httpOptions).subscribe((res) => {

      if (res['success']) {
        console.log(res);
        this.postCount = <number>this.postCount + 10;
        console.log(this.postCount);
        res['data'].forEach(post => {
          this.posts.push(post);
        });
        console.log(this.posts);
      }
    })
  }

}
