import React, { useState,useEffect } from 'react';
import { fetchResp } from '../utils/fetchResp';
import './AddDrug.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons/faPills';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddDrug = ({ saveDrug }) => {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [morning, setMorning] = useState('');
    const [afternoon, setAfternoon] = useState('');
    const [evening, setEvening] = useState('');
    const [total, setTotal] = useState('');
    const [notes, setNotes] = useState('');


    useEffect(() => {
        setTotal(Number(morning) + Number(afternoon) + Number(evening));
    }, [morning, afternoon, evening]);

    const addDrug = (e) => {
        e.preventDefault();


        if (!name || !notes || !dosage || morning === '' || afternoon === '' || evening === '' || Number(morning) < 0 || Number(afternoon) < 0 || Number(evening) < 0) {
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

        setName("");
        setDosage("");
        setMorning("");
        setAfternoon("");
        setEvening("");
        setTotal("");
        setNotes("");



        fetch(`http://localhost:4000/drugs`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                dosage,
                morning,
                afternoon,
                evening,
                total,
                notes,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(fetchResp)
            .then((drug) => saveDrug(drug))
            .catch((err) => console.log(err));
    };

    return (
        <div className="add">
            <div className="form__add">
                <form onSubmit={addDrug}>
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
                    <div className="add__group">
                        <FontAwesomeIcon icon={faPills} className="add__logo" size="4x" />
                        <label className="add__label">Nazwa leku:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="add__input"
                        />
                    </div>
                    <div className="add__group">
                        <label className="add__label">Dawka:</label>
                        <input
                            type="text"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            className="add__input"
                        />
                    </div>
                    <div className="add__group">
                        <label className="add__label">Dawkowanie - Rano:</label>
                        <input
                            type="number"
                            value={morning}
                            onChange={(e) => setMorning(e.target.value)}
                            className="add__input"
                        />
                    </div>
                    <div className="add__group">
                        <label className="add__label">Dawkowanie - Popołudnie:</label>
                        <input
                            type="number"
                            value={afternoon}
                            onChange={(e) => setAfternoon(e.target.value)}
                            className="add__input"
                        />
                    </div>
                    <div className="add__group">
                        <label className="add__label">Dawkowanie - Wieczór:</label>
                        <input
                            type="number"
                            value={evening}
                            onChange={(e) => setEvening(e.target.value)}
                            className="add__input"
                        />
                    </div>
                    <div className="add__group">
                        <label className="add__label">Dzienna porcja tabletek</label>
                        <input
                            type="number"
                            value={total}
                            readOnly
                            // onChange={(e)=>setTotal(e.target.value)}
                            className="add__input"
                        />
                    </div>
                    <div className="add__group">
                        <label className="add__label">Notatnik pacjenta:</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="textarea"
                        />
                    </div>
                    <button type="submit" className="add__button">Dodaj Lek</button>
                </form>
            </div>
        </div>

    );
};

export default AddDrug;
