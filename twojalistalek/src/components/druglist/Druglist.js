import React, { useEffect, useState } from 'react';
import './Druglist.scss';
import { fetchResp } from '../utils/fetchResp';
import AddDrug from './AddDrug';
import Drug from './Drug';
import ReactPaginate from 'react-paginate';
import {useNavigate} from "react-router-dom";


const Druglist = ({ patient }) => {
    const [drugs, setDrugs] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const drugsPerPage = 4; // Liczba leków na stronie


    useEffect(() => {
        fetch(`http://localhost:4000/drugs`)
            .then(fetchResp)
            .then((data) => setDrugs(data))
            .catch((err) => console.log(err));
    }, []);

    const saveDrug = (drug) => {
        setDrugs((state) => [...state, drug]);
    };

    const editDrug = ({ id, name, dosage, morning, afternoon, evening, total, notes }) => {
        setDrugs((state) =>
            state.map((drug) => (drug.id === id ? { ...drug, name, dosage, morning, afternoon, evening, total, notes } : drug))
        );
    };

    const deleteDrug = (id) => {
        setDrugs((state) => state.filter((drug) => drug.id !== id));
    };

    const pageCount = Math.ceil(drugs.length / drugsPerPage);

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    const displayDrugs = drugs
        .slice(pageNumber * drugsPerPage, (pageNumber + 1) * drugsPerPage)
        .map((drug) => (
            <Drug key={drug.id} drug={drug} editDrug={editDrug} deleteDrug={deleteDrug} />
        ));

    const handlePrint = () => {
            window.print();
    };


    const navigateToEmail = useNavigate();
    const handleNavigateToEmail = () => {
        navigateToEmail('/Druglist/Email')
    }

    return (
        <div className="package">
            <div className="package__patient">
                <p>Imię: {patient.name}</p>
                <p>Nazwisko: {patient.surname}</p>
                <p>Wiek: {patient.age}</p>
                <p>Płeć: {patient.sex}</p>

                <div className="package__patient__email">
                    <div>Jeśli masz pytanie, kliknij w przycisk poniżej</div>
                    <button onClick={handleNavigateToEmail}>Zadaj pytanie</button>
                </div>

                <button className="print-button" onClick={handlePrint}>Drukuj listę leków</button>

            </div>

            <AddDrug saveDrug={saveDrug} />

            {drugs.length > 0 ? (
                <div className="drugs__container">
                    {displayDrugs}

                        <ReactPaginate
                            previousLabel='Poprzednia'
                            nextLabel='Następna'
                            breakLabel='...'
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            renderOnZeroPageCount={null}
                        />

                    </div>
                ) : (
                    <p className="no__drugs">Brak leków do wyświetlenia</p>
                )}
            </div>
        );
    };

export default Druglist;
