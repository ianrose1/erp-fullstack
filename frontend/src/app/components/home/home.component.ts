import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import Announcement from 'src/app/interfaces/announcement';
import { AnnouncementsService } from 'src/app/services/announcements.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  showOverlay = false;
  createFailed = false;

  formData = {
    announcement: ''
  };

  announcements$: Observable<Announcement[]> = this.announcementService.announcementObservable().pipe(
    map(announcements => announcements.sort((a: Announcement, b: Announcement) => {
      return (new Date(b.date).getTime()) - (new Date(a.date).getTime());
    })));

  constructor(private announcementService: AnnouncementsService, private userService: UserService) { }

  ngOnInit(): void {
    this.announcementService.fetchAnnouncements();
  }

  formatDate(timestamp: string) {
    const date = new Date(timestamp);
    return this.formatter.format(date);
  }

  async onSubmit() {
    console.log('Form Data:', this.formData);
    const user = this.userService.getCurrentUser();
    const userId = user ? user.id : -1;
    const companyId = this.userService.getCurrentCompanyId();
    const title = "";
    const message = this.formData.announcement;
    console.log("User: ", user)
    console.log("UserId: ", userId)
    console.log("CompanyId: ", companyId)
    console.log("Message: ", message)
    const res = await this.announcementService.createNewAnnouncement(companyId, userId, title, message);
    if (res.status === 400) {
      console.log("Could not add announcement!");
      this.createFailed = true;
    } else {
      console.log("Successfully create announcement!");
      await this.announcementService.fetchAnnouncements();
      this.toggleOverlay();
    }
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
    this.createFailed = false;
  }

  sortByTimestamp = (a: Announcement, b: Announcement) => {
    return (new Date(b.date).getTime()) - (new Date(a.date).getTime());
  };

}
