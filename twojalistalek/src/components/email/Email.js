import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./Email.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from "@fortawesome/free-solid-svg-icons";
export const Email = () => {
    const form = useRef();


    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm('service_1m1g4wt', 'template_t4evmd8', form.current, {
                publicKey: 'EGDS33PbghlKQUwE6',
            })
            .then(
                (response) => {
                    console.log('SUCCESS!',response.status, response.text);
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <form className="email__form" ref={form} onSubmit={sendEmail}>
            <FontAwesomeIcon icon={faFileSignature} size="4x" />
            <label className="email__label">Imię</label>
            <input className="email__input" type="text" name="user_name" />
            <label className="email__label">Email</label>
            <input className="email__input" type="email" name="user_email" />
            <label className="email__label">Wiadomość</label>
            <textarea className="email__textarea" name="message" />
            <input className="email__button" type="submit" value="Wyślij" />
        </form>
    );
};
