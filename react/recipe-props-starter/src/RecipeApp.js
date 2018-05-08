import React, { Component } from 'react';
import './RecipeApp.css';
import Navbar from "./Navbar";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";
import RecipeInput from "./RecipeInput";

class RecipeApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipes: [
                {id:0, title: "kakakaak", ingredients: ["flour", "water"],
                    image: "https://www.gutekueche.at/img/rezept/35771/spaghetti-mit-fleischsauce.jpg",
                    instructions: "mix ingredients"},
                {id:1, title: "kakakaak", ingredients: ["flour", "water"],
                    image: "https://www.gutekueche.at/img/rezept/35771/spaghetti-mit-fleischsauce.jpg",
                    instructions: "mix ingredients"},
                {id:2, title: "kakakaak", ingredients: ["flour", "water"],
                    image: "https://www.gutekueche.at/img/rezept/35771/spaghetti-mit-fleischsauce.jpg",
                    instructions: "mix ingredients"}
            ],
          nextRecipeId: 3,
          showForm: false
        }
      this.handleSave = this.handleSave.bind(this);
      this.onDelete = this.onDelete.bind(this);
    }

  onDelete(id) {
    const recipes = this.state.recipes.filter(r => r.id !== id);
    this.setState({recipes});
  }

  handleSave(recipe) {
    this.setState((prevState, props)=>{
      const newRecipe={...recipe,id:this.state.nextRecipeId};
      return {
        nextRecipeId: prevState.nextRecipeId +1,
        showForm:false,
        recipes: [...this.state.recipes, newRecipe]
      }
    });
  }
    


  render() {
    const {showForm} = this.state;
        return (
            <div className="App">
              <Navbar onNewRecipe={()=>this.setState({showForm:true})}/>
              {showForm?<RecipeInput onSave={this.handleSave} 
                onClose={() => this.setState({showForm: false})}
              />:null}
                <RecipeList onDelete={this.onDelete} recipes={this.state.recipes}/>
            </div>
        );
    }
}

export default RecipeApp;
