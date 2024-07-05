import React, { useState, } from 'react';
import "./userform.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrescription } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const Userform = ({ setPatient }) => {
    const [localPatient, setLocalPatient] = useState({
        name: "",
        surname: "",
        age: "",
        sex: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPatient(localPatient);
        navigate('/Druglist');
    };

    return (
        <main className="main container">
            <FontAwesomeIcon icon={faPrescription} className="logo" size="5x" />
            <div className="form">
                <h2 className="form__title">Twoja Lista Leków</h2>
                <p className="form__description">Uzupełnij podane pola</p>
                <form onSubmit={handleSubmit}>
                    <div className="form__field">
                        <label>Imię</label>
                        <input
                            type="text"
                            className="form__input"
                            name="name"
                            value={localPatient.name}
                            placeholder="Bartosz"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__field">
                        <label>Nazwisko</label>
                        <input
                            type="text"
                            className="form__input"
                            name="surname"
                            value={localPatient.surname}
                            placeholder="Futera"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__field">
                        <label>Wiek</label>
                        <input
                            type="text"
                            className="form__input"
                            name="age"
                            value={localPatient.age}
                            placeholder="18"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__field">
                        <label>Wybierz płeć</label>
                        <select
                            name="sex"
                            className="form__input"
                            value={localPatient.sex}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="Mężczyzna">Mężczyzna</option>
                            <option value="Kobieta">Kobieta</option>
                        </select>
                    </div>
                    <button type="submit" className="form__input--button">
                        Utwórz listę leków
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Userform;
