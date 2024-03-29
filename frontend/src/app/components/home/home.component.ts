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

  formMode: string = "";
  announcementId: number = -1;

  isAdmin$: Observable<boolean> = this.userService.isAdminObservable();

  formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  showOverlay = false;
  showFeedback = false;
  feedbackMessage = "";

  formData = {
    announcement: ''
  };

  announcements$: Observable<Announcement[]> = this.announcementService.announcementObservable();

  constructor(private announcementService: AnnouncementsService, private userService: UserService) { }

  ngOnInit(): void {
    this.announcementService.fetchAnnouncements();
  }

  formatDate(timestamp: string) {
    const date = new Date(timestamp);
    return this.formatter.format(date);
  }

  async onSubmit() {
    if (!this.formData.announcement && this.formMode !== "delete") {
      this.feedbackMessage = "Announcement message cannot be blank";
      this.showFeedback = true;
      return;
    }
    switch (this.formMode) {
      case "create":
        await this.create()
        break;
      case "edit":
        await this.edit();
        break;
      case "delete":
        await this.delete();
        break;
      default:
        break;
    }
    this.toggleOverlay();
  }

  toggleOverlay(formMode: string = '', formContent: string = '', selectedAnnouncementId: number = -1) {
    this.announcementId = selectedAnnouncementId;
    this.formMode = formMode;
    this.setFormData(formContent);
    if (formMode === "delete") {
      this.feedbackMessage = "Click Submit to delete this announcement";
      this.showFeedback = true;
    } else {
      this.showFeedback = false;
    }
    this.showOverlay = !this.showOverlay;
  }

  sortByTimestamp = (a: Announcement, b: Announcement) => {
    return (new Date(b.date).getTime()) - (new Date(a.date).getTime());
  };

  async delete() {
    const announcementId = this.announcementId;
    console.log("Delete Announcement Id: ", announcementId);

    const res = await this.announcementService.deleteAnnouncement(announcementId);
    if (res.status === 400) {
      console.log("Could not delete announcement!");
      this.feedbackMessage = "Could not delete announcement!";
      this.showFeedback = true;
    } else {
      console.log("Successfully deleted announcement!");
      this.feedbackMessage = "Successfully deleted announcement!";
      await this.announcementService.fetchAnnouncements();
    }
  }

  async create() {
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
      this.feedbackMessage = "Could not add announcement!";
      this.showFeedback = true;
    } else {
      console.log("Successfully create announcement!");
      this.feedbackMessage = "Successfully create announcement!";
      await this.announcementService.fetchAnnouncements();
    }
  }
  async edit() {
    console.log('Form Data:', this.formData);
    const title = "";
    const message = this.formData.announcement;
    const announcementId = this.announcementId;
    console.log("Message: ", message)
    console.log("Edit Announcement Id: ", announcementId);

    const res = await this.announcementService.editAnnouncement(announcementId, title, message);
    if (res.status === 400) {
      console.log("Could not update announcement!");
      this.feedbackMessage = "Could not update announcement!";
      this.showFeedback = true;
    } else {
      console.log("Successfully updated announcement!");
      this.feedbackMessage = "Successfully updated announcement!";
      await this.announcementService.fetchAnnouncements();
    }
  }

  setFormData(content: string) {
    this.formData.announcement = content;
  }
}
