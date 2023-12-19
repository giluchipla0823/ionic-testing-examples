import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-animation',
  templateUrl: './example-animation.page.html',
  styleUrls: ['./example-animation.page.scss'],
})
export class ExampleAnimationPage implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    
  }
  animationend() {

    const box = document.getElementById("box");

    if (box.classList.contains('collapsed')) {
      box.classList.remove("collapsed");
      // box.style.display = "none";
      
    }

  }
  
  box() {
    const box = document.getElementById("box");

    if (box.classList.contains("expandable")) {
        box.classList.remove("expandable");
        box.classList.add("collapsed");
    }
  }

  open() {
    const box = document.getElementById("box");

    if (!box.classList.contains("expandable")) {
        box.classList.add("expandable");
        // box.style.display = "flex";
    }
  }

}
