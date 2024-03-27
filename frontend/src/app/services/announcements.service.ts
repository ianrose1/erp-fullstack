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
      const response = await axios.get(`http://localhost:8080/company/${companyId}/announcements`);
      console.log("Announcements Response Data: ", response.data);
      this.announcementsSubject.next(response.data);
    }
    catch (error) {
      console.error("Error fetching announcements:", error);
    }
  }

  // create new announcement needs 1) companyId and 2)userId
  async createNewAnnouncement(companyId: number, userId: number, title: string, message: string) {
    try {
      const response = await axios.post(`http://localhost:8080/announcements/${userId}/${companyId}`, {
        title,
        message
      });
      console.log("Post New Announcement Response Data: ", response.data);
      this.announcementsSubject.next(response.data);
    }
    catch (error) {
      console.error("Error creating new announcement:", error);
    }
  }


}
