import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {timeout} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImgbbService {
    IMGBB_KEY= "ffcd8183ed733b35a7be81d70581bf45";
  constructor(private http: HttpClient) {}

  upload(b64Image: any) {
    const formData = new FormData()

    formData.append('image', b64Image)

    return this.http.post("https://api.imgbb.com/1/upload", formData, { params: {key: this.IMGBB_KEY}})    // This call is going to use the proxy detailed in /proxy.conf.json to bypass CORS
    .pipe(
      timeout(10000)      // After 10 seconds return timeout
    )
  }
}