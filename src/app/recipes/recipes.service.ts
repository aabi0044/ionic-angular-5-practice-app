import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'any',
      imageUrl: 'https://picsum.photos/seed/picsum/200/300',
      ingredient: ['french', 'hilly']
    },
    {
      id: 'r2',
      title: 'any two',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      ingredient: ['french', 'hilly']
    }
  ]
  constructor() { }

  getAllRecipes() {
    return [...this.recipes]
  }
  getRecipe(recipeId: string) {
    return {
      ...this.recipes.find(rec => {
        return rec.id === recipeId;
      })
    }
  }
  deleteRecipe(recipeId: string) {

    this.recipes = this.recipes.filter(item=>item.id !== recipeId);
    console.log(this.recipes);
  }
}
