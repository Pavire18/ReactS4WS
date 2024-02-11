import './App.css';
import React from "react";
import ImageList from './components/ImageList/ImageList';
import CustomHeader from './components/CustomHeader/CustomHeader';

export const GlobalContext = React.createContext();

const themes = {
  light: {
    name: "Light",
    background: "#FFF",
    fontColor: "#000",
  },
  dark: {
    name: "Dark",
    background: "#000",
    fontColor: "#FFF",
  }
}


//---------------REDUCER-------------------
const initialValue = {
 favorites:[]
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD PHOTO':
      //CONTROL PARA QUE NO PUEDA AÑADIR VARIAS VECES LA MISMA FOTO Y DE ERRORES DE ID DUPLICADA.
      if(!state.favorites.includes(action.payload)){
        return {
          ...state,
          favorites: [...state.favorites, action.payload]
        }
      }else{
        return state;
      }

    case 'DELETE PHOTO':
      return {
        ...state,
        favorites: state.favorites.filter(img => img.id !=action.payload.id)
      }
    default:
      console.error("Case not supported");
  }
}




//-----------------------------------------
function App() {
  const [textParam, setTextParam]=React.useState("car");
  const [favoriteList , setFavoriteList] = React.useState([]);
  const [themeState, setThemeState] = React.useState(themes.dark);
  const [state, dispatch] = React.useReducer(reducer, initialValue);


//--------------REDUCER FUNCTIONS----------------

const addPhoto = (photo) =>{
  dispatch({ type: "ADD PHOTO", payload: photo });
};
const deletePhoto = (photo) =>{
  dispatch({ type: "DELETE PHOTO", payload: photo });
};

//---------------------------------------------------

  const getInputData = (data) =>{
    setTextParam(data);
  }

  return (
    <GlobalContext.Provider value={themeState}>
    <div className="App">
      <CustomHeader getInputData={getInputData} setThemeState={setThemeState} themes={themes}/>
      <ImageList textParam={textParam} favoriteList={state.favorites} addPhoto={addPhoto} deletePhoto={deletePhoto} ></ImageList>
    </div>
    </GlobalContext.Provider>
  );
}

export default App;
