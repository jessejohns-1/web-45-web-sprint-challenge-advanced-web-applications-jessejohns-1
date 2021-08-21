import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const dummydata = {
    color:"lilac",
    code: {
        hex: "#9a99dd",
      },
      id: 5
}

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={{ color: '', code: { hex: '' } }} />);
});
  
test("Renders the color passed into component", () => {
    render(<Color color={dummydata} />)
    const testColor = screen.getByText(/lilac/i)
    expect (testColor).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    
    render(
        <Color
            color={dummydata}
            deleteColor={() => {}}
            toggleEdit={() => {}}
        />
    );
    const deleteTest = screen.getByTestId('delete');
    userEvent.click(deleteTest);
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    render(
    <Color 
            color={dummydata} 
            deleteColor={()=>{}}
            toggleEdit={()=>{}}
            setEditColor={()=>{}}
    />
    );
    const test = screen.getByTestId('color');
    userEvent.click(test);
});