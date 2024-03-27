import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NavbarService {
  private visibleSubject = new BehaviorSubject<boolean>(true);

  constructor() {}

  isVisibleObservable() {
    return this.visibleSubject.asObservable();
  }

  hide() { this.visibleSubject.next(false) }

  show() { this.visibleSubject.next(true) }

  toggle() { this.visibleSubject.next(!this.visibleSubject.value) }

}