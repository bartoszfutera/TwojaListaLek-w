import React from 'react';
import "./userform.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrescription } from '@fortawesome/free-solid-svg-icons'

const Userform = () => {
    return (
        <main className="main container">
            <FontAwesomeIcon icon={faPrescription} className="logo" size="5x"  />
                <div className="form">
                    <h2 className="form__title">Twoja Lista Leków</h2>
                    <p className="form__description">Uzupełnij podane pola</p>
                    <form>
                        <div className="form__field">
                            <label>Imię</label>
                            <input type="text" className="form__input" id="name" placeholder="Bartosz"/>
                        </div>
                        <div className="form__field">
                            <label>Nazwisko</label>
                            <input type="text" className="form__input" id="surname" placeholder="Futera"/>
                        </div>
                        <div className="form__field">
                            <label>Wybierz płeć</label>
                            <select>
                                <option value="">Mężczyzna</option>
                                <option value="">Kobieta</option>
                            </select>
                        </div>

                        <button type="submit" className="form__input--button">Utwórz listę leków</button>

                    </form>
                </div>

        </main>
    )
};

export default Userform;