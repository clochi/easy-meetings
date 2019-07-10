import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'em-no-group',
  templateUrl: './no-group.component.html',
  styleUrls: ['./no-group.component.less']
})
export class NoGroupComponent implements OnInit {
  groupSubscription: Subscription;
  isLoading = false;
  constructor(
    private groupService: GroupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.groupSubscription = this.groupService.getActiveGroup()
      .subscribe(group => {
        if (group) {
          this.router.navigate(['/app']);
        } else {
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy() {
    this.isLoading = false;
    this.groupSubscription.unsubscribe();
  }

}
