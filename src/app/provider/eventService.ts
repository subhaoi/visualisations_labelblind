/**
 * Created by appectual on 9/1/19.
 */
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class eventService {
  private subject = new Subject<any>();
  private loader = new Subject<any>();
  private backButton = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({text: message});
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  setLoader(message: string) {
    this.loader.next({text: message});
  }

  clearLoader() {
    this.loader.next();
  }

  getLoader(): Observable<any> {
    return this.loader.asObservable();
  }

  setBackButton(message: string) {
    this.backButton.next({text: message});
  }

  clearBackButton() {
    this.backButton.next();
  }

  getBackButton(): Observable<any> {
    return this.backButton.asObservable();
  }



}
