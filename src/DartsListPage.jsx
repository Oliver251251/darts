import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';

export const DartsListPage = () => {

    const[dartses,setDartses] = useState([]);
    const[isFetchPending, setFetchPending] = useState(false);
    
    useEffect(() => {
        setFetchPending(true);
        axios.get("https://darts.sulla.hu/darts")
            .then((res) => res.data)
            .then((data) => setDartses(data))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);
    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <p className="h1">Dartsozók</p>
                    {dartses.map((dartss, index) => (

                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="h5">Név: {dartss.name}</p>
                            <p className="text-danger">Születési dátum: {dartss.birth_date}</p>
                            <p className="text-success">Megnyert világbajnokságok: {dartss.world_ch_won}</p>
                            <div className="card-body">
                                <NavLink key={dartss.id} to={"/darts/" + dartss.id}>
                                    <img alt={dartss.name}
                                        className="img-fluid"
                                        style={{ maxHeight: 200 }}
                                        src={dartss.image_url ? dartss.image_url :
                                            "https://via.placeholder.com/400x800"} /></NavLink>
                                <br />
                                <NavLink to={dartss.profile_url} target="_blank">Wikipédia link</NavLink><br />
                            </div>
                            <div>
                                <Link to={`/del-darts/${dartss.id}`} className="justify-content-center align-item-center"><i class="bi bi-trash3 fs-3"></i></Link>&nbsp;&nbsp;&nbsp;
                                <Link to={`/mod-darts/${dartss.id}`} className="justify-content-center align-item-center"><i class="bi bi-pencil-square fs-3"></i></Link>&nbsp;&nbsp;&nbsp;
                                <Link to={`/darts/${dartss.id}`} className="justify-content-center align-item-center"><i class="bi bi-text-paragraph fs-3"></i></Link>
                                </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}