import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {CaptchaResponseDto} from "../models/caprtchaResponseDto";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  constructor(private api: ApiService) { }
  getCaptchas(): Observable<CaptchaResponseDto[]> {
    return this.api.get<CaptchaResponseDto[]>('captchas').pipe(map(caches => {
      return caches;
    }))
  }
  saveCaptcha(captchaFormData: FormData): Observable<CaptchaResponseDto>{
    return this.api.postFormData<CaptchaResponseDto>('saveCaptcha',captchaFormData).pipe(map(data=> {
      return data;
    }))
  }
}
