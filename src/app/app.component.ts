import { Component, HostListener, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'anais';
  isShowMenu = true; 

  faLinkedinIn = faLinkedinIn;
  faGithub = faGithub;

  errorMail = false;
  errorNom = false;
  errorMessage = false;

  isEtudiantActive = true; 
  isPlus = true; 

  customOptions_testimonial: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    dots: false,
    nav: true,
    navSpeed: 200,
     navText: ["<span class='material-icons'>keyboard_arrow_left</span>",
     "<span class='material-icons'>keyboard_arrow_right</span>"],
    responsive: {
      0: {
        items: 1
      },
      490: {
        items: 1
      },
      940: {
        items: 1
      }
    }
  }

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.contactForm = this.fb.group({
      nom: [''],
      mail: [''],
      message: ['']
    });
  }



  ngOnInit() {
    AOS.init();
    console.log("je suis dans init")
  }

  getShowMenu() {
    this.isShowMenu = !this.isShowMenu;
    console.log("je suis dans show menu");

  }

  onSubmit() {
    if (this.contactForm.valid) {

      let message =  this.contactForm.value.message + "\n Envoyé du Porfolio. ";
      

      let formData = new FormData();
      formData.append("name", this.contactForm.value.nom);
      formData.append("email", this.contactForm.value.mail);
      formData.append("message", message);


      this.httpClient.post("https://formspree.io/f/mknpvgjd", formData).subscribe(
        response => {
          this.errorMail = this.contactForm.controls.mail.status === "VALID" ? false : true;
          this.errorMessage = this.contactForm.controls.message.status === "VALID" ? false : true;
          this.errorNom = this.contactForm.controls.nom.status === "VALID" ? false : true;

          // this.toastr.success(this.contactForm.value.nom + ", Votre message a bien été envoyé ", "Message", {
          //   timeOut: 1800,
          //   progressBar: true,
          //   progressAnimation: 'increasing'
          // })

          this.contactForm = this.fb.group({
            nom: [''],
            mail: [''],
            message: ['']
          });

        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.errorMail = this.contactForm.controls.mail.status === "VALID" ? false : true;
      this.errorMessage = this.contactForm.controls.message.status === "VALID" ? false : true;
      this.errorNom = this.contactForm.controls.nom.status === "VALID" ? false : true;
    }
  }

  onFocusMethod(e) {
    e.srcElement.parentNode.classList.add("focus");
  }

  onBlurMethod(e) {
    let attr = e.target.id;
    if (this.contactForm.value[attr] === "")
      e.srcElement.parentNode.classList.remove("focus");
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.querySelector('header');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('opacity_true');
      //Scrolling 
    } else {
      element.classList.remove('opacity_true');
    }
  }

  clickEtudiantActive(){
    this.isEtudiantActive = true;
  }

  clickSalActive(){
    this.isEtudiantActive = false;
  }

  clickIcon(){
    console.log("plus - menos");
  }
}



