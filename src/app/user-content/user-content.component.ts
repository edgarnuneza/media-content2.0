import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { User } from '../user';
import { USERS } from '../mock-users';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss'],
})
export class UserContentComponent implements OnInit {
  users = USERS;

  constructor(private render: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {}

  getDate(date: Date) {
    let months: string[] = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

    return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  getFirstLetters(name: string, lastName: string) {
    return `${name[0] + lastName[0]}`;
  }

  collapsible(num: number):void {
    for(let infoEle of document.querySelectorAll(`.info-${num}`)!) {
      infoEle.classList.toggle("show");
    }
  }

  createClassName(num:number):string {
    return `info-${num}`;

  }
}
