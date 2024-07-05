import React, { useState } from 'react';
import { fetchResp } from '../utils/fetchResp';
import "./Drug.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons/faSquareCheck';

const Drug = ({ drug, editDrug, deleteDrug }) => {
    const [name, setName] = useState(drug.name);
    const [dosage, setDosage] = useState(drug.dosage);
    const [morning, setMorning] = useState(drug.morning);
    const [afternoon, setAfternoon] = useState(drug.afternoon);
    const [evening, setEvening] = useState(drug.evening);
    const [other, setOther] = useState(drug.other);
    const [notes, setNotes] = useState(drug.notes);
    const [isEdited, setIsEdited] = useState(false);

    const patchDrug = (e) => {
        e.preventDefault();

        if (
            name === '' ||
            dosage === '' ||
            morning === '' ||
            afternoon === '' ||
            evening === '' ||
            other === '' ||
            notes === ''
        ) {
            return alert('Pola nie mogą być puste.');
        }

        fetch(`http://localhost:4000/drugs/${drug.id}`, {
            method: 'PATCH',
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
            .then((data) => {
                editDrug({
                    id: data.id,
                    name: data.name,
                    dosage: data.dosage,
                    morning: data.morning,
                    afternoon: data.afternoon,
                    evening: data.evening,
                    other: data.other,
                    notes: data.notes,
                });
                setIsEdited(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDeleteDrug = (e) => {
        e.preventDefault();

        fetch(`http://localhost:4000/drugs/${drug.id}`, {
            method: 'DELETE',
        })
            .then(fetchResp)
            .then((data) => deleteDrug(drug.id))
            .catch((err) => console.log(err));
    };

    return (
    <div className="drug__container">
        <table className="drug__table">
            <thead className="drug__thead">
                <tr>
                    <th className="drug__th">Nazwa leku</th>
                    <th className="drug__th">Dawka</th>
                    <th className="drug__th">Dawkowanie - Rano</th>
                    <th className="drug__th">Dawkowanie - Południe</th>
                    <th className="drug__th">Dawkowanie - Wieczór</th>
                    <th className="drug__th">Dawkowanie inne</th>
                    <th className="drug__th">Notatnik pacjenta</th>
                    <th className="drug__th"></th>
                </tr>
            </thead>

            <tbody className="drug__tbody">
            <tr>
                <td className="drug__td">{drug.name}</td>
                <td className="drug__td">{drug.dosage}</td>
                <td className="drug__td">{drug.morning}</td>
                <td className="drug__td">{drug.afternoon}</td>
                <td className="drug__td">{drug.evening}</td>
                <td className="drug__td">{drug.other}</td>
                <td className="drug__td">{drug.notes}</td>
                <td className="drug__td">

            {isEdited ? (
                <form onSubmit={patchDrug}>
                    <label>
                        Nazwa leku
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label>
                        Dawka
                        <input
                            type="text"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                        />
                    </label>

                    <label>
                        Rano
                        <input
                            type="text"
                            value={morning}
                            onChange={(e) => setMorning(e.target.value)}
                        />
                    </label>

                    <label>
                        Południe
                        <input
                            type="text"
                            value={afternoon}
                            onChange={(e) => setAfternoon(e.target.value)}
                        />
                    </label>

                    <label>
                        Wieczór
                        <input
                            type="text"
                            value={evening}
                            onChange={(e) => setEvening(e.target.value)}
                        />
                    </label>

                    <label>
                        Inne dawkowanie
                        <input
                            type="text"
                            value={other}
                            onChange={(e) => setOther(e.target.value)}
                        />
                    </label>

                    <label>
                        Notatnik pacjenta
                        <input
                            type="text"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </label>

                    <FontAwesomeIcon icon={faSquareCheck}
                                     size="2x"
                                     cursor="pointer"
                                     onClick={patchDrug}/>
                </form>
            ) : (
                <FontAwesomeIcon icon={faPenToSquare}
                                 size="2x"
                                 cursor="pointer"
                                 onClick={(e) => setIsEdited(true)}
                                 type="button"/>

            )}
                    <FontAwesomeIcon icon={faTrash}
                                 onClick={handleDeleteDrug}
                                 cursor="pointer"
                                 size="2x"
                                 type="submit"/>

            </td>
            </tr>
            </tbody>
        </table>
    </div>
    );
};

export default Drug;
