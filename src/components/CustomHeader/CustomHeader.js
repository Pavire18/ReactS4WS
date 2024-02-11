import { GlobalContext } from '../../App';
import './CustomHeader.css';
import React from 'react';

const CustomHeader = ({getInputData,setThemeState,themes}) =>{
    const globalContext = React.useContext(GlobalContext);
    const inputRef = React.useRef();


    const search = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const input = inputRef.current.value;
        getInputData(input);
      }

    return (
        <div className='header'>
            <form onSubmit={search}>
                <input className='header__input' type='text' ref={inputRef}/>
            </form>
            <button onClick={() => setThemeState(globalContext === themes.light ? themes.dark : themes.light)}>Cambiar tema</button>
        </div>
    )
}

export default CustomHeader;