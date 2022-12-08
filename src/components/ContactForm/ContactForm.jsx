// import React, { Component } from 'react';
import { useState } from 'react';
import { Form, Label, Input, Button } from './ContactForm.styled';
// import { Formik } from 'formik';
import PropTypes from 'prop-types';

export function ContactForm({ addUser }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contactFormObj = { name, number };

  // state = {
  //   name: '',
  //   number: '',
  // };

  // const handleChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value,
  //   });
  // };
  const handleChange = ev => {
    const { name, value } = ev.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  // const reset = () => {
  //   this.setState({ name: '', number: '' });
  // };

  const reset = () => {
    setName('');
    setNumber('');
  };

  // const handleSubmit = evt => {
  //   evt.preventDefault();
  //   this.props.addUser({ ...this.state });
  //   console.log(this.state);
  //   this.reset();
  // };

  const handleSubmit = evt => {
    evt.preventDefault();
    addUser(...{ contactFormObj });

    reset();
  };
  // const { name, number } = this.state;
  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onSubmit: PropTypes.func,
};
