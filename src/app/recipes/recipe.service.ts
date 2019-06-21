import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Steak and salad',
      'The usual steak with salad',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [
        new Ingredient('meat', 1),
        new Ingredient('salads', 2),
      ]
      ),
    new Recipe(
      'Olive Oil',
      'Oil',
      'https://cdn.pixabay.com/photo/2015/10/02/15/59/olive-oil-968657_960_720.jpg',
      [
        new Ingredient('oil', 1),
        new Ingredient('olives', 5),
      ]
      ),
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
    }
}
