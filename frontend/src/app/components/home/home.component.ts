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

  announcements$: Observable<Announcement[]> = this.announcementService.announcementObservable();

  constructor(private announcementService: AnnouncementsService, private userService: UserService) {}

  ngOnInit(): void {
    this.announcementService.fetchAnnouncements();
  }

}
