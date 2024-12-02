import axios from "axios";
import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';

export const DartsSingle = () => {
    const {dartsId} = useParams();
    const [darts, setDarts] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() =>{
        setPending(true);
        (async() =>{
            try {
                const valasz = await axios.get(`https://darts.sulla.hu/darts/${dartsId}`)
                setDarts(valasz.data)
            } catch (hiba) {
                console.log(hiba);
            }finally{
                setPending(false);
            }
        })();
        
    }, []);

    return(
        <div className="container mt-5">
            <h2 className="text-center">Dartsozó: {darts.name}</h2>
            {isPending || !dartsId? (<div className="spinner-border"></div>) : (
                <div className="row row-cols-2 row-cols-md-3 g-4 justify-content-center align-item-center">
                    <div className="col text-center">
                        <div className="card h-200">
                            <h3 className="text-dark text-center card-title">Dartsozó neve: {darts.name}</h3>
                            <h5 className="text-dark text-center">Születési éve: {darts.birth_date}</h5>
                            <h5 className="text-dark text-center">Nyert világbajnokságai: {darts.world_ch_won}</h5>
                                <div className="card-body align-items-center">
                                    <Link to={darts.profile_url} className="fs-6" target="_blank">Profil link</Link>
                                    <br/>
                                    <img src={darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800"} alt={darts.name}
                                    className="img-fluid" style={{width: "250px"}}/>
                                </div>
                                <div>
                                <Link to={`/del-darts/${darts.id}`} className="justify-content-center align-item-center"><i className="bi bi-trash3 fs-3"></i></Link>&nbsp;&nbsp;&nbsp;
                                <Link to={`/mod-darts/${darts.id}`} className="justify-content-center align-item-center"><i className="bi bi-pencil-square fs-3"></i></Link>&nbsp;&nbsp;&nbsp;
                                <Link to="/" className="justify-content-center align-item-center"><i className="bi bi-arrow-left fs-3">Vissza</i></Link>
                                </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}