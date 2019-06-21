import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  id: number

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = parseInt(params.id, 10)
          this.recipe = this.recipeService.getRecipe(this.id)
        }
      )
  }

  onAddToShoppingList() {
    const ingredients: Ingredient[] = this.recipe.ingredients
    this.recipeService.addIngredientsToShoppingList(ingredients)
  }

  onEditRecipe() {
    // both methods do the same
    this.router.navigate(['edit'], {relativeTo: this.route})
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

}
