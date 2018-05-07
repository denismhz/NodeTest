import React, { Component } from 'react';
import './RecipeApp.css';
import Navbar from "./Navbar";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";

class RecipeApp extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <RecipeList />
      </div>
    );
  }
}

export default RecipeApp;
