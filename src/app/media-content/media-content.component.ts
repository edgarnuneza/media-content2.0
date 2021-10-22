import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { IMAGES } from '../mock-images';

@Component({
  selector: 'app-media-content',
  templateUrl: './media-content.component.html',
  styleUrls: ['./media-content.component.scss']
})

export class MediaContentComponent implements OnInit {
  images = IMAGES;
  totalColumns!: number;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.placeImages();
  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', () => {
      this.removeImages();
      this.placeImages();
    });
    // this.removeImages();
  }

  getTotalColumns(): number {
    const thisElement: Element = document.querySelector('app-media-content')!;
    const gridColumnsTemplate: string = getComputedStyle(thisElement).gridTemplateColumns;
    return gridColumnsTemplate.split(" ").length;
  }

  placeImages(): void {
    this.totalColumns = this.getTotalColumns();

    for (let i = 1; i <= this.totalColumns; i++) {
      let div = this.renderer.createElement("div");
      this.renderer.setAttribute(div, "id", `column-${i}`);
      this.renderer.addClass(div, "img-content");
      this.renderer.appendChild(document.querySelector("app-media-content"), div);
    }

    for (const [i, image] of this.images.entries()) {

      let numColumn: number = this.getCurrentColumn(i + 1);

      let imgElement = this.renderer.createElement('img');
      this.renderer.setAttribute(imgElement, 'src', image);
      this.renderer.addClass(imgElement, 'image-card');
      this.renderer.appendChild(document.querySelector(`#column-${numColumn}`), imgElement);
      this.renderer.listen(imgElement, 'click', () => {
        alert("Hola");
      });
    }

  }

  getCurrentColumn(numImg: number): number {
    let currentColumn: number;

    currentColumn = numImg % this.totalColumns;

    if (currentColumn === 0) {
      currentColumn = this.totalColumns;
    }

    return currentColumn;
  }

  createId(value: number): string {
    return `column-${value}`;
  }

  removeImages() {
    for (let i = 1; i <= this.totalColumns; i++) {
      let div = document.querySelector(`#column-${i}`);
      this.renderer.removeChild(document.querySelector("app-media-content"), div, false);
    }

  }
}
