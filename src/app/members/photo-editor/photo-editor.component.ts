import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PathLocationStrategy } from '@angular/common';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { reduce } from 'rxjs/operators';
import { UserService } from 'src/app/_services/user.service';
import { AlertaService } from 'src/app/_services/alerta.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getMemberphotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMainPhoto: Photo;
 
  constructor(private authService: AuthService,
              private userService: UserService,
              private alertaService: AlertaService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any):void {
    this.hasBaseDropZoneOver = e;
  }

  public initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    }); 

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        
        const photo: Photo = {
          id: res.id,
          url: res.url,
          date: res.date,
          description: res.description,
          isMain: res.isMain
        };
        
        this.photos.push(photo);

        if (photo.isMain) {
          this.getMemberphotoChange.emit(photo.url);
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoURL = photo.url;
        }

      }
    }
  }

  public setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id)
                    .subscribe(() => {
                      this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
                      this.currentMainPhoto.isMain = false;
                      photo.isMain = true;
                      this.getMemberphotoChange.emit(photo.url);
                      this.authService.changeMemberPhoto(photo.url);
                      this.authService.currentUser.photoURL = photo.url;
                      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
                    }, error => {
                      this.alertaService.error(error);
                    });
  }

  public deletePhoto(id: number) {
    //this.alertaService.confirm('Are you sure do you want to delete this photo?', () => {
        this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
            this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
            this.alertaService.success('Photo has breen deleted');
        }, error => {
            this.alertaService.error('Failed to delete the photo');
        });
    //});
  }

}
