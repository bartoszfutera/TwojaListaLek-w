import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

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
        <form ref={form} onSubmit={sendEmail}>
            <label>Imię</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Wiadomość</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
        </form>
    );
};
