import { Component, OnDestroy, OnInit } from '@angular/core';
import { AvatarService } from '../../services/avatar.service';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { NgOptimizedImage } from '@angular/common';
import { SpinnerComponent } from '../../../core/components/spinner/spinner.component';

@Component({
  selector: 'app-avatar-screen',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, MatButtonModule, SpinnerComponent],
  templateUrl: './avatar-screen.component.html',
  styleUrl: './avatar-screen.component.scss',
})
export class AvatarScreenComponent implements OnInit, OnDestroy {
  loading!: boolean;
  avatars!: string[];
  selectedAvatar!: string;
  avatarSub = new Subscription();

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
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
    });
  }

  onSelectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  onUpdateAvatar() {
    this.authService.updateAvatar(this.selectedAvatar).subscribe({
      next: () => {
        localStorage.setItem('photoURL', this.selectedAvatar ?? '');
        this.router.navigate(['/']);
      },
    });
  }

  ngOnDestroy(): void {
    this.avatarSub.unsubscribe();
  }
}
