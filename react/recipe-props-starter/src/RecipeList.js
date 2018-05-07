import React, {Component} from "react";
import "./RecipeList.css";
import Recipe from "./Recipe";
import PropTypes from "prop-types";

class RecipeList extends Component{
    static defaultProps = {
        recipes: [
            {title: "kakakaak", ingredients: ["flour", "water"],
                image: "https://www.gutekueche.at/img/rezept/35771/spaghetti-mit-fleischsauce.jpg",
                instructions: "mix ingredients"},
            {title: "kakakaak", ingredients: ["flour", "water"],
                image: "https://www.gutekueche.at/img/rezept/35771/spaghetti-mit-fleischsauce.jpg",
                instructions: "mix ingredients"},
            {title: "kakakaak", ingredients: ["flour", "water"],
                image: "https://www.gutekueche.at/img/rezept/35771/spaghetti-mit-fleischsauce.jpg",
                instructions: "mix ingredients"}
        ]
    }

    static propTypes = {
        recipes: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    render(){
        const recipes = this.props.recipes.map((r,index) => (
            <Recipe key={index} {...r} />
        ));
        return(<div className="recipe-list">
                    {recipes}
                </div>
        );
    }
}

export default RecipeList;
