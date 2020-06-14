import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;
  constructor(private activatedRoute: ActivatedRoute,
    private service: RecipesService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        this.router.navigate(['/recipes'])
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.service.getRecipe(recipeId)
    });
  }
  onDeleteRecipe() {
    this.alertController.create({
      header: 'Are you Sure',
      message: 'Do you really want to delete ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Delete',
          handler: () => {
            this.service.deleteRecipe(this.loadedRecipe.id);
            this.router.navigate(['/recipes'])
          }
        }
      ]

    }).then(alertCl => {
      alertCl.present();
    })

  }
}
