import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode = false
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = parseInt(params.id, 10)
          this.editMode = params.id != null
          this.initForm()
        }
      )
  }

  private initForm() {
    const recipe = this.recipeService.getRecipe(this.id)
    const recipeName = this.editMode ? recipe.name : ''
    const recipeImagePath = this.editMode ? recipe.imagePath : ''
    const recipeDescription = this.editMode ? recipe.description : ''

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription)
    })
  }

  onSubmit() {
    console.log(this.recipeForm)
  }

}
