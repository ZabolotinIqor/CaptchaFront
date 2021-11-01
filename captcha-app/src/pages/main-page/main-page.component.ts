import { Component, OnInit } from '@angular/core';
import {CaptchaService} from "../../services/captcha.service";
import {CaptchaResponseDto} from "../../models/caprtchaResponseDto";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  captchas: CaptchaResponseDto[] = [];
  captchaForm : FormGroup;
  constructor(private  captchaService: CaptchaService) {
    this.createForm();
  }

  ngOnInit(): void {
     this.captchaService.getCaptchas().subscribe(captcha => this.captchas = captcha);

  }
  onSubmit(){
    const formData = this.toFormData(this.captchaForm.value);
    formData.append('archive', this.captchaForm.get('archive').value);
    this.captchaService.saveCaptcha(formData).subscribe((data)=> this.captchas.push(data));
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.captchaForm.patchValue({
        archive: file
      });
    }
  }
  private createForm() {
    this.captchaForm = new FormGroup({
      "name": new FormControl("", ),
      "hasCyrillic": new FormControl(false, ),
      "hasLatin": new FormControl(false, ),
      "hasNumeric": new FormControl(false,),
      "hasSpecialSymbols": new FormControl(false,),
      "isCaseSensitive": new FormControl(false,),
      "hasAnswer": new FormControl(false, ),
      "archive": new FormControl("", ),
    });
  }
  public toFormData<T>( formValue: T ) {
    const formData = new FormData();

    for ( const key of Object.keys(formValue) ) {
      if (key !== 'archive'){
        const value = formValue[key];
        formData.append(key, value);
      }
    }

    return formData;
  }

}
