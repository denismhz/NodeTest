import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Recipe.css";

class Recipe extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
        instructions: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      onDelete: PropTypes.func.isRequired
    }

    render(){
        const {title, image, instructions, id, onDelete} = this.props;
        const ingredients = this.props.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
        ));
        return(
            <div className="recipe-card">
                <div className="recipe-card-image">
                    <img src={image} alt={title} />
                </div>
                <div className="recipe-card-content">
                    <h3 className="recipe-title">{title}</h3>
                    <h4>Ingredients:</h4>
                    <ul>
                        {ingredients}
                    </ul>
                    <h4>Instructions:</h4>
                    <p>{instructions}</p>
                    <button onClick={()=>onDelete(id)} type="button">DELETE</button>
                    
                </div>
            </div>
        );
    }
}

export default Recipe;
