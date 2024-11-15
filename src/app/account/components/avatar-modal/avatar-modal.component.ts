import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AvatarService } from '../../../avatar/services/avatar.service';
import { UtilService } from '../../../core/services/util.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { SpinnerComponent } from '../../../core/components/spinner/spinner.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-avatar-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, SpinnerComponent],
  templateUrl: './avatar-modal.component.html',
  styleUrl: './avatar-modal.component.scss',
})
export class AvatarModalComponent implements OnInit, OnDestroy {
  loading!: boolean;
  avatars!: string[];
  selectedAvatar!: string;
  avatarSub = new Subscription();

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AvatarModalComponent>,
    private utilService: UtilService,
  ) {}

  ngOnInit(): void {
    this.listAvatars();
  }

  listAvatars() {
    this.loading = true;
    this.avatarSub = this.avatarService.listAvatars().subscribe({
      next: (res) => {
        this.avatars = res;
      },
      complete: () => {
        this.loading = false;
      },
      error: () => {
        this.utilService.openSnackBar(
          'Something went wrong, please try again later.',
        );
      },
    });
  }

  onSelectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  onUpdateAvatar() {
    this.authService.updateAvatar(this.selectedAvatar).subscribe({
      next: () => {
        localStorage.setItem('photoURL', this.selectedAvatar ?? '');
        this.authService.profileChanged$.next(this.selectedAvatar as string);
        this.dialogRef.close(true);
        this.utilService.openSnackBar('Avatar updated successfully.');
      },
    });
  }

  ngOnDestroy(): void {
    this.avatarSub.unsubscribe();
  }
}
