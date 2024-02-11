import './ImageList.css';
import useFetch from '../../hooks/useFetch';
import React from "react";
import { GlobalContext } from '../../App';

const API_URL = "https://api.pexels.com/v1";
const ImageList = ({ textParam, favoriteList,addPhoto,deletePhoto }) => {


    const [info, setInfo] = React.useState([]);
    const globalContext = React.useContext(GlobalContext);

    useFetch(API_URL, textParam, setInfo);

    const imageOrdered = React.useMemo(() => {
        return info
            .map(photo => {
                return {
                    ...photo,
                    alt: photo.alt.trim()
                }
            })
            .sort((a, b) => {
                return a.alt < b.alt ? -1 : 1
            });
    }, [info]);



    return (
        <div>
        <h2>GALERIA DE FOTOS</h2>
        <div style={{ background: globalContext.background, color: globalContext.fontColor }} className="image-list">
            {imageOrdered.map((photo) => {
                return (
                    <div key={photo.id} onClick={() => addPhoto(photo)}>
                        <div className='image-card'>
                            <img className="image-list__img" src={photo.src.medium} />
                            <p className="image-list__description">{photo.alt}</p>
                        </div>
                    </div>
                )
            })}
        </div>
        {/* LISTA DE FAVORITOS */}
        <h2>LISTA DE FAVORITOS</h2>
        <div style={{ background: globalContext.background, color: globalContext.fontColor }} className="image-list">
        {favoriteList.map((photo) => {
            return (
                <div key={photo.id} onClick={() => deletePhoto(photo)}>
                    <div className='image-card'>
                        <img className="image-list__img" src={photo.src.medium} />
                        <p className="image-list__description">{photo.alt}</p>
                    </div>
                </div>
            )
        })}
        </div>
    </div>


    )
}

export default ImageList;