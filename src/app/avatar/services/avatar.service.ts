import { inject, Injectable } from '@angular/core';
import { listAll, ref, Storage, getDownloadURL } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  storage = inject(Storage);

  listAvatars(): Observable<string[]> {
    const avatarRef = ref(this.storage, '');
    return from(
      listAll(avatarRef).then((res) =>
        Promise.all(res.items.map((item) => getDownloadURL(item)))
      )
    );
  }
}
