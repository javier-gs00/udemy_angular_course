import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>()
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      ),
    new Recipe(
      'Olive Oil',
      'Oil',
      'https://cdn.pixabay.com/photo/2015/10/02/15/59/olive-oil-968657_960_720.jpg',
      ),
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
