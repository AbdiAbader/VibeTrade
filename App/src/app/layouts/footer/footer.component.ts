import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import  * as fs from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor() {

   }
   faFacebook = fs.faFacebook;
   faTwitter = fs.faTwitter;
    faYoutube = fs.faYoutube;
    faInstagram = fs.faInstagram;
    faLinkedin = fs.faLinkedin;
    faGithub = fs.faGithub;
    faPaypal = fs.faPaypal;
    


}
