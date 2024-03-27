import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  announcements$: Observable<Announcement[]> = this.announcementService.announcementObservable();

  constructor(private announcementService: AnnouncementsService, private userService: UserService) {}

  ngOnInit(): void {
    this.announcementService.fetchAnnouncements();
  }

  formatDate(timestamp: string) {
    const date = new Date(timestamp);
    return this.formatter.format(date);
  }


}
