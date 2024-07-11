import React, {useEffect, useState,} from 'react';
import "./userform.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrescription } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const Userform = ({ setPatient }) => {

    const getFormLocalPatient = () => {
        const storedLocalPatient = localStorage.getItem("form");
        if (!storedLocalPatient) return {
            name:"",
            surname:"",
            age:"",
            sex:""
        };
        return JSON.parse(storedLocalPatient)
    }

    const [localPatient, setLocalPatient] = useState(getFormLocalPatient);


    useEffect(() => {
        localStorage.setItem("form",JSON.stringify(localPatient))
    }, [localPatient]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!localPatient.name || !localPatient.surname || !localPatient.age   || !localPatient.sex) {
            toast.error('Uzupełnij wszystkie pola', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (localPatient.age < 1 || localPatient.age > 125) {
            toast.error('Wpisz wiek z zakresu od 1 do 125', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        setPatient(localPatient);
        navigate('/Druglist');
    };



    return (
        <main className="main container">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="form">
                <h2 className="form__title">Twoja Lista Leków</h2>
                <p className="form__description">Uzupełnij podane pola</p>
                <form onSubmit={handleSubmit}>
                    <FontAwesomeIcon icon={faPrescription} className="logo" size="5x" />
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
                            type="number"
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
