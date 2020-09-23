import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService{

    // recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Vadapav',
        'Badi Badi bate vadapav khatein!',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJIJ0O3xWB-cKy-Va1kbb635DNmf4GL6chm-QZ1GZ7T8UPOmjuZQ',
        [
            new Ingredient('Meat',1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('Masala Vadapav',
        'Badi Badi bate vadapav khatein!',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJIJ0O3xWB-cKy-Va1kbb635DNmf4GL6chm-QZ1GZ7T8UPOmjuZQ',
        [
            new Ingredient('Buns',2),
            new Ingredient('Meat', 1)
        ])
      ]; 

      constructor(private slService: ShoppingListService){

      }
      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index:number){
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleterecipe(index : number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}