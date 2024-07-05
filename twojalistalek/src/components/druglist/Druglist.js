import React, { useEffect, useState } from 'react';
import './Druglist.scss';
import { fetchResp } from '../utils/fetchResp';
import AddDrug from './AddDrug';
import Drug from './Drug';


const Druglist = ({patient}) => {
    const [drugs, setDrugs] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:4000/drugs`)
            .then(fetchResp)
            .then((data) => setDrugs(data))
            .catch((err) => console.log(err));
    }, []);



    const saveDrug = (drug) => {
        setDrugs((state) => [...state, drug]);
    };

    const editDrug = ({ id, name, dosage, morning, afternoon, evening, other, notes }) => {
        setDrugs((state) =>
            state.map((drug) => (drug.id === id ? { ...drug, name, dosage, morning, afternoon, evening, other, notes } : drug))
        );
    };

    const deleteDrug = (id) => {
        setDrugs((state) => state.filter((drug) => drug.id !== id));
    };

    return (
        <div className="package">
            <div className="package__patient">
                <p>Imię: {patient.name}</p>
                <p>Nazwisko:{patient.surname}</p>
                <p>Wiek:{patient.age}</p>
                <p>Płeć:{patient.sex}</p>

                <div className="package__email">
                   <label>Wpisz swój adres email</label>
                    <input type='text' placeholder="Wpisz swój adres email"></input>
                </div>

            </div>

            <AddDrug saveDrug={saveDrug} />
            {drugs && (
                <table>
                    {drugs.map((drug) => (
                        <Drug key={drug.id} drug={drug} editDrug={editDrug} deleteDrug={deleteDrug} />
                    ))}
                </table>
            )}
        </div>
    );
};

export default Druglist;
