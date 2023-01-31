import React from "react";

function AnotherOne() {
  return (
    <h2>i'm the very second element!</h2>
  );
}

ReactDOM.render(
  <>
  <App /> 
  <AnotherOne />
  </>
,  document.getElementById('root')
);

//First letter should be in capital case i.e App, AnotherOne

const navbar = (<navbar>
<h1>logo</h1>
</navbar>); // any JSX object in a variable must be put between two parenthesis 

//JSX returns plain javascript object not recognized by browser dealing with DOM 
// it's only when we use ReactDOM.render() the render method interpret's the jsx object in a way that turns them into real DOM elements

//pascal case is capitlizing the very first letter for the components and the rest goes as the camelcase

// you can access images like this <img alt="" src='./logoinblack.png' /> from projfolder/src/index.js 
// and their location would be in the public folder!

/* ASSET IMPORTING

 if you want to import image so you have relative location wherever you call the react component 
 it's better to put the images inside the src folder and import it (and generally more favorable to import assests into js files ratherthan
 using public folder as you assests source
 make sure the image or the image folder is inside the src folder because imports from outside the src folder aren't supported
 
 */

// that goes only for JSX elements not css files you need to import css files inside of react file using import "./styleesheet.css" and
//it's location should be inside the src folder

//  Babel is a very famous transpiler that basically allows us to use future JavaScript in today's browsers.  is needed for 2 main tasks: To compile JSX into React & createElement API calls
// npx is an npm package runner that can execute any package that you want from the npm registry without even installing that package

const date = new Date().getHours();  // outputs the actual result 

const date1 = new Date().getHours; /// outputs the code within the function itself.it's a native function so it will return ƒ getHours() { [native code] }

// Adding images in the public folder and the src folder both are acceptable methods,
// however, importing images into your component has the benefit that your assets will be handled by the build system,
// and will receive hashes which improves caching/performance. You’ll also have the added benefit that it will throw an error if the file is moved/renamed/deleted.

// just like a paramater is passed into a function props are passed into a component
// helps us make a component more reusable 

//deconstructing props 
export default function MyAwesomeComponent(props) {
  return (
    <h1>this is my awesome component {props.title} </h1>
    <h1>this is my awesome component {props.name} </h1>
    <h1>this is my awesome component {props.rank} </h1>

  );
}

//and turn in to this 
export default function MyAwesomeComponent({title,name,rank}) {
  return (
    <h1>this is my awesome component {title} </h1>
    <h1>this is my awesome component {name} </h1>
    <h1>this is my awesome component {rank} </h1>

  );
}
explicit (return) means the return is visible and written in an arrow function
let myFunc = ( (item) => {
  return item * item; 
})

implicit (return) in an arrow function
let myFunc = (item => item*item) // since it's only one item we can remove the () surronding the paramater `item`

dataArray.map((item) => {
  return ( <Card key={item.id} {...item} );
});

// deconstructing object 
// let (url = obj.url) 
// let {url} = obj;

//anytime you have a changing values that should be saved/displayed, you will likely be using state.

// import react, {useState} from "react"; // this is called object destructing as we can have the method useState ready to use instead of getting it from react object

export default function App() {
  let [variable, SetVariable] = React.useState("NO");  
  
  // react.useState("defaultVal") returns an array ["defaultVal", fn()] you can destruct those 
  // with an array destructor to have the default value into a variable and to change or "set" the value into something else by passing the new value to the 
  //Setvariable setter function
  function clickHandler() {
    variable === "YES" ? SetVariable("NO") : SetVariable("YES");
  }
  return (
    <>
      {<p onClick={clickHandler}>{variable}</p>}
    </>
  );
}

// a bad practice when you use the counter++ which means counter = counter +1 which changes the value of the counter instead of letting setCounter changes it
// a better approach is to use counter + 1 that will get the value adds one to that value and pass it to the setCounter to set the value itself
// the best approach is to pass a function the return function for that function is going to be passed to the setCounter and updates the counter value
//when you define a paramater to that function the value being passed by the setter function is actually the current value of the counter 
// you can use that function as a reference for the new value of the counter you want to have

  let [counter, setCounter] = React.useState(0);
  function incCounter() {
    // setCounter(counter++);
    // setCounter(counter + 1);
     setCounter(function(OldValue) {
      return OldValue+1;
    })
  }
  function DecCounter() {
    setCounter(counter - 1);
    console.log(counter);
  }

  let [thingsArray, setThingsArray] = useState(["thing 1", "thing 2"]); // update an array with an element or remove the last element from the array 

  const things = thingsArray.map((thing) => <p key={thing}>{thing}</p>);

  function addItems() {
    setThingsArray(function (prevThings) {
      return [...prevThings, `Thing ${prevThings.length + 1}`];
    });
  }

  function removeItems() {
    setThingsArray(function (prevThings) {
      let temp = [...prevThings];
      temp.pop();
      return [...temp];
    });
  }
return (
  //JSX goes here 
  {things}
) 
Objects in state (UseState)

  const [contact, setContact] = React.useState({
    firstName: "John",
    lastName: "Doe",
    phone: "+1 (719) 555-1212",
    email: "itsmyrealname@example.com",
    isFavorite: true,
  });
  let starIcon = contact.isFavorite ? "star-filled.png" : "star-empty.png";

  function toggleFavorite() {
    setContact((prevContact) => {
      return {...prevContact  , isFavorite: !prevContact.isFavorite };
    });
  }
// anothe way to type the arrow function
  function toggleFavorite() {
    setContact((prevContact) => ({ // this is called implicit return don't forget about it
      ...prevContact,
      isFavorite: !contact.isFavorite,
    }));
  }
// whenever state changes it will rerender the component where the state exists and any child component that may relay on the state to be working correctly

// passing a prop with a value that you are going to put it inside useState and control it inside a component which means you have  2 sources of truth
//isn't the best approach 

export default function Box({on}) {
    let [boxVal,setBoxVal] = useState(on);
    function toggle () {
        setBoxVal((oldState)  => !oldState);
        }

    let styles = {
        backgroundColor: (boxVal ? "#222222" : "transparent" ),
    }
    return <div className="box-container" style={styles} onClick ={toggle} ></div>
}

// another way is to pass a function ex) toggle and that function is going to change in the original state instead of having to create an inner state like the prev exaxmple

    function toggle(id) {
      setSquares(function (oldSquares) {
  const newSquares = [];
        for (let i=0; i<oldSquares.length; i++) {
          const currentSquare = oldSquares[i];
          
            if (currentSquare.id === id) {
              let updatedSquare = {
                ...currentSquare,on:!currentSquare.on,
              }
              newSquares.push(updatedSquare);
              } else {
                newSquares.push(currentSquare);
              }
            }
           return newSquares;
        }

      );
    }

        function toggle(id) {
      setSquares(function (oldSquares) {
       return  oldSquares.map(function(square) {
           return (square.id === id) ? {...square, on:!square.on} : square;
        });
    });
  }

    function handleEvent(e) {
    setFormData(function (prevData) {
      return { ...prevData, [e.target.name]: e.target.value }; // there's a feature in ES6 called computed properties
      // you can turn a dymanic string like something saved in a variable (e.target.name) and use it as the property name for the object
      // by surronding the dynamic string in a square brackets [  ]
    });
  }
  // another example is 

    function handleEvent(e) {
      const name = "firstName";
    setFormData(function (prevData) {
      return { ...prevData, name: e.target.value }; // using name will result in returning the prev object along with a name prop rather than the required firstName
      // you can in this example use ES6 feature computed properties to use a dynamic string that's saved in the name variable as the property name for the object
    }); // notice the color difference after surronding name with []
  }

  // it's own separate closing tag <textarea></textarea> in react it's <textarea value="" />
  // self closing <input />
  // make sure to assign the name of the input the same as it's name in the properties in the object

  //submitting a form is either through <input type="submit" /> and the usual text value is submit
  // if you want to change it you can add an attribute called value and equate it to what you want

  // 2nd option is if there's a button element inside a form it will be automatically treated as a submit button and will be given type="submit" by default
  // if you don't want it to behave that way you can add type="button" 
  // best is to use the button element so you don't have to deal with the value attribute instead <button>send it in!</button>

        // useEffect!

  // the reason why we are using useEffect instead of regular fetch 
  // is because as in the code belows shows when react renders the component for the first time the api call sets starWarsData through setStarWarsData
  // which makes the component render again causing to call the api again and setting starWarsData through setStarWarsData which is going to cause an infinite loop
  export default function App() {

  const [starWarsData, setStarWarsData] = React.useState({});
  console.log("component rendered");
  fetch("https://swapi.dev/api/people/1")
    .then((res) => res.json())
    .then((data) => setStarWarsData(data));
    return (
      <div>
          <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
      </div>
  )
  }
// `count is ${count}` these are called Template literals (Template strings), `` are called backticks
// and whenever you use a variable it means you interpolate the value inside

  // using useEffect hook
// depending on the depencies array that's provided as the 2nd paramater to useEffect method the function passed as the 1st paramater will be called
// if the values changed using setter function (even it was still the same value from the last re-render) as long as you used the setter function 
// that counts as a change
 // the useEffect function will be triggered if it didn't get changed from the previous render it won't get triggered
// this code doesn't run the useEffect function unless the count value changed

//IMPORTANTTT
// THIS WILL CAUSE AN INFINITE LOOP because starWarsData got chanaged [even it got changed to the same value doesn't from https://swapi.dev/api/people/1
// mean it didn't got changed!!!!

const [starWarsData, setStarWarsData] = React.useState({});
const [count, setCount] = React.useState(1);

React.useEffect(
  function () {
    console.log("component rendered");

    fetch(`https://swapi.dev/api/people/1`)
      .then((res) => res.json())
      .then((data) => setStarWarsData(data));
  },
  [starWarsData]
);
// if you want to run the api on the very first render only put an empty depencies array []
// CONTROLLED WITH COUNT VALUE 
  const [starWarsData, setStarWarsData] = React.useState({});
  const [count, setCount] = React.useState(1);

  React.useEffect(
    function () {
      console.log("component rendered");

      fetch(`https://swapi.dev/api/people/${count}`)
        .then((res) => res.json())
        .then((data) => setStarWarsData(data));
    },
    [count]
  );
  function handleClick() {
    setCount((prevCount) => prevCount + 1);
  }

/*
  1. What is a "side effect" in React? What are some examples?
- Any code that affects an outside system.
- local storage, API, websockets, two states to keep in sync


2. What is NOT a "side effect" in React? Examples?
- Anything that React is in charge of.
- Maintaining state, keeping the UI in sync with the data, 
  render DOM elements


3. When does React run your useEffect function? When does it NOT run
   the effect function?
- As soon as the component loads (first render)
- On every re-render of the component (assuming no dependencies array)
- Will NOT run the effect when the values of the dependencies in the
  array stay the same between renders


4. How would you explain what the "dependecies array" is?
- Second paramter to the useEffect function
- A way for React to know whether it should re-run the effect function
*/

/* what can't react handle (Out)side effects
- localStorage react don't interface with localStorage but you can use regular JS to use
- API/Database interactions
- subscribtions
- syncing 2 different internal states together


*/

/* trying to update a react state on an unmounted component could cause a memory leak and shall throw an error
 so that's why you should do a cleanup 
we setuped an event listener on the window and which registered it on our browser and even removing the component that had the event listener (by toggling it off)
doesn't automatically remove that event listener

useEffect will only run after the dom is painted
 */
// useEffect will only run once as there's nothing in the depencencies array
// an event listener is attached to the window object for a function called adjustWidth which is now registered on our browser
// even removing the component that had the event listener (by toggling it off) won't remove the event listener
// so now the function adjustWidth will still run on winow resize and will try to set the innerWidth state even after it the component got removed from the dom
// return function the useEffect recieves to clean up after the component unmounts (gets removed from the dom) is responsible for removing the event listener
// and it runs once the component unmounts
// 
import React from "react";

export default function WindowTracker() {
  let [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    console.log("effect ran");
    function adjustWidth() {
      setInnerWidth(window.innerWidth);
      console.log("bueno");
    }
    window.addEventListener("resize", adjustWidth);
    return () => {
      console.log("adios");
      window.removeEventListener("resize", adjustWidth);
    };
  }, []);

  return <h1>Window width: {innerWidth}</h1>;
}
  /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

    React.useEffect(() => {
      async function getMemes() {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        setAllMemes(data.data.memes);
      }
      getMemes();
      return function() {
        //cleanup code goes here and runs when the component unmounts
      }
    }, []);

    //  Lazy Initialization | Lazy Initial State
    // if we have a constant value to use as the initial state for a useState it will get assigned the very first time the component renders
    // and then react ignores it and keeps track of it whenever it gets changed however..
// when you have a getter function or a function that's going to return the inital state whenever the component rerenders it will run 
// if it's something like 
 const [state, setState] = React.useState(conosole.log("hamada")); 
 // it will each and everytime the component rerenders if it's an expensive function it needs to be lazy loaded by having a function () => {our function}
    const [notes, setNotes] = React.useState(
      () => JSON.parse(localStorage.getItem("notes")) || []
    );

// the reason why the key prop is important so react can keep the components in order if anything were to be removed or added to the array of components



