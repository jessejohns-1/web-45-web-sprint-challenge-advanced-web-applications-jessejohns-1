import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";
const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);


  useEffect(() => {
    fetchColorService()
    .then((res) => {
      //setting state to the fetched colors
      setColors(res);})
    //catch errors
    .catch((err) => {console.log(err);})

  }, [editing]);

  const toggleEdit = (value) => {
    setEditing(value);
  };

const saveEdit = (editColor) => {
    axiosWithAuth()
      //call the api
      .put(`/api/colors/${editColor.id}`, editColor)
      .then(res => {
        console.log(res)
        //Finding theIndex of color
        let Index = colors.findIndex((color) => color.id === editColor.id);

        colors[Index] = editColor
        setColors([...colors])
      })
      //Catch errors
      .catch((error) => {console.log(error); })
  };


  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
      //call to the api 
      .delete(`/api/colors/${colorToDelete.id}`)
      //filtering through the color to delete
      .then(() => {
        setColors(colors.filter(color => color.id !== colorToDelete.id))
      })
      //Catching any of the errors errors
      .catch(error => {console.log(error); })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
