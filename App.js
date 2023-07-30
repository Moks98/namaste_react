const heading = React.createElement(
    
    "div",{id:"parent1"},[
        React.createElement("div",{id:"child1"},[ 
            React.createElement("h1",{},"I am h1"),
            React.createElement("h2",{},"I am h2"),
        ]),
     
    
            React.createElement("div",{id:"child2"},[ 
                React.createElement("h1",{},"I am h1 child2"),
                React.createElement("h2",{},"I am h2 child2"),
            ]),
        ]);



 const root = ReactDOM.createRoot(document.getElementById("root"));
 root.render(heading);//object..