import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, take } from 'rxjs';
import Announcement from '../interfaces/announcement';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  private announcementsSubject = new BehaviorSubject<Announcement[]>([]);
  announcements$ = this.announcementsSubject.asObservable();

  constructor(private userService: UserService) { }

  announcementObservable(){
    return this.announcementsSubject.asObservable();
  }

  getCurrentAnnouncements(): Announcement[] {
    return this.announcementsSubject.value;
  }

  updateAnnouncements(announcements: Announcement[]) {
   const sortedAnnouncements = announcements.sort((a: Announcement, b: Announcement) => {
      return (new Date(b.date).getTime()) - (new Date(a.date).getTime());
    })
    this.announcementsSubject.next(sortedAnnouncements);
  }

  async fetchAnnouncements() {
    try {
      const companyId: number = this.userService.getCurrentCompanyId();
      const response = await axios.get(`http://localhost:8080/company/${companyId}/announcements`);
      console.log("Announcements Response Data: ", response.data);
      const announcements: Announcement[] = response.data;
      this.updateAnnouncements(announcements);
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
      return {status: 200, ...response.data}; 
    }
    catch (error) {
      console.error("Error creating new announcement:", error);
      return {status: 400}; 
    }
  }


    async editAnnouncement(announcementId: number, title: string = "", message: string = "") {
      try {
        const response = await axios.patch(`http://localhost:8080/announcements/${announcementId}`, {
          title,
          message
        });
        console.log("Patch Announcement Response Data: ", response.data);
        return {status: 200, ...response.data}; 
      }
      catch (error) {
        console.error("Error patching announcement:", error);
        return {status: 400}; 
      }
    }

    async deleteAnnouncement(announcementId: number, title: string = "", message: string = "") {
      try {
        const response = await axios.delete(`http://localhost:8080/announcements/${announcementId}`);
        console.log("Delete Announcement Response Data: ", response.data);
        return {status: 200, ...response.data}; 
      }
      catch (error) {
        console.error("Error deleting announcement:", error);
        return {status: 400}; 
      }
    }


}
