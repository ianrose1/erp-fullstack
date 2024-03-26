import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import Announcement from '../interfaces/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  private announcementsSubject = new BehaviorSubject<Announcement[]>([]);
  announcements$ = this.announcementsSubject.asObservable();

  constructor() { }

  announcementObservable(){
    return this.announcementsSubject.asObservable();
  }

  async fetchAnnouncements(companyId: number) {
    try {
      const response = await axios.get(`/company/${companyId}/announcements`);
      console.log("Announcements Response Data: ", response.data);
      this.announcementsSubject.next(response.data);
    }
    catch (error) {
      console.error("Error fetching announcements:", error);
    }
  }


}
