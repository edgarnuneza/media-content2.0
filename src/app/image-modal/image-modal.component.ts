import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    let image = this.elementRef.nativeElement.querySelector("#image");

    // image!.addEventListener("load", function () {
    //   if (screen.width < image!.clientWidth) {

    //   }
    // });

    this.renderer.listen(image, "load", () => {
      this.resize(image);
    });

    this.renderer.listen(image, "click", (e) => {

      this.zoom(e);
    });

  }

  resize(image: any) {
    let ratio = this.aspectRatioFit(image.width, image.height, screen.width * 0.80, screen.height * 0.80);
    image.with = ratio.width;
    image.height = ratio.height;

  }

  aspectRatioFit(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  zoom(e: any) {

    let zoomer = e.currentTarget;
    let offsetX, offsetY;
    console.log(zoomer);
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
    let x = offsetX / zoomer.offsetWidth * 100
    let y = offsetY / zoomer.offsetHeight * 100
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
  }

}
