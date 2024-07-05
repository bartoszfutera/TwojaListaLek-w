import React, { useState } from 'react';
import { fetchResp } from '../utils/fetchResp';
import './AddDrug.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons/faPills';

const AddDrug = ({ saveDrug }) => {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [morning, setMorning] = useState('');
    const [afternoon, setAfternoon] = useState('');
    const [evening, setEvening] = useState('');
    const [other, setOther] = useState('');
    const [notes, setNotes] = useState('');

    const addDrug = (e) => {
        e.preventDefault();
        setName("");
        setDosage("");
        setMorning("");
        setAfternoon("");
        setEvening("");
        setOther("");
        setNotes("");

        fetch(`http://localhost:4000/drugs`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                dosage,
                morning,
                afternoon,
                evening,
                other,
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
                            type="text"
                            value={morning}
                            onChange={(e) => setMorning(e.target.value)}
                            className="add__input"
                        />
                    </div>
                    <div className="add__group">
                        <label className="add__label">Dawkowanie - Popołudnie:</label>
                        <input
                            type="text"
                            value={afternoon}
                            onChange={(e) => setAfternoon(e.target.value)}
                            className="add__input"
                        />
                    </div>
                    <div className="add__group">
                        <label className="add__label">Dawkowanie - Wieczór:</label>
                        <input
                            type="text"
                            value={evening}
                            onChange={(e) => setEvening(e.target.value)}
                            className="add__input"
                        />
                    </div>
                    <div className="add__group">
                        <label className="add__label">Dawkowanie - Inne:</label>
                        <input
                            type="text"
                            value={other}
                            onChange={(e) => setOther(e.target.value)}
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
                    <button type={"submit"} className="add__button">Dodaj Lek</button>
                </form>
            </div>
        </div>

    );
};

export default AddDrug;
