import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {
  @ViewChild('menubtn', { static: false }) btnMenu!: ElementRef;
  @ViewChild('options', { static: false }) options!: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.btnMenu.nativeElement, "click", () => {
      this.options.nativeElement.classList.toggle("show");

    });

  }

}
