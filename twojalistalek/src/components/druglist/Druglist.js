import React, { useEffect, useState } from 'react';
import './Druglist.scss';
import { fetchResp } from '../utils/fetchResp';
import AddDrug from './AddDrug';
import Drug from './Drug';
import { Email } from "../email/Email";
import ReactPaginate from 'react-paginate';

const Druglist = ({ patient }) => {
    const [drugs, setDrugs] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 3; // Liczba leków na stronie


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

    const pageCount = Math.ceil(drugs.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    const displayDrugs = drugs
        .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage)
        .map((drug) => (
            <Drug key={drug.id} drug={drug} editDrug={editDrug} deleteDrug={deleteDrug} />
        ));

    const handlePrint = () => {
            window.print();
    };

    return (
        <div className="package">
            <div className="package__patient">
                <p>Imię: {patient.name}</p>
                <p>Nazwisko: {patient.surname}</p>
                <p>Wiek: {patient.age}</p>
                <p>Płeć: {patient.sex}</p>

                <div className="package__email">
                    <Email />
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
