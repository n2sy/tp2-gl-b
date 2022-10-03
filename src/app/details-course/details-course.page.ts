import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ListCoursesService } from '../list-courses.service';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.page.html',
  styleUrls: ['./details-course.page.scss'],
})
export class DetailsCoursePage implements OnInit {
  selectedCourse;
  constructor(
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router,
    private courseSer: ListCoursesService
  ) {}

  ngOnInit() {
    // this.activatedRoute.params.subscribe({
    //   next: (p: Params) => {
    //     console.log(p['id']);
    //   },
    //   // error : () => {

    //   // },
    //   // complete : () => {

    //   // }
    // });
    this.activatedRoute.paramMap.subscribe({
      next: (p: ParamMap) => {
        console.log(p.get('id'));
        this.selectedCourse = this.courseSer.getCourseById(p.get('id'));
      },
    });
    //console.log(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Etes vous sur de vouloir supprimer ce cours ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.courseSer.deleteCourse(this.selectedCourse);
            this.router.navigateByUrl('/');
          },
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }
}
