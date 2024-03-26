import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import Announcement from 'src/app/interfaces/announcement';
import { AnnouncementsService } from 'src/app/services/announcements.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  announcements$: Observable<Announcement[]> = this.announcementService.announcementObservable();

  constructor(private announcementService: AnnouncementsService) {}

}
