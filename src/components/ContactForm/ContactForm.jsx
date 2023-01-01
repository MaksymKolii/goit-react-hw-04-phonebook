// import { useState } from 'react';
import { Form, Label, Input, Button, Div } from './ContactForm.styled';
import * as yup from 'yup';

import { useFormik } from 'formik';
import PropTypes from 'prop-types';

export function ContactForm({ addUser }) {
  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');
  // const contactFormObj = { name, number };

  // const handleChange = ev => {
  //   const { name, value } = ev.target;

  //   switch (name) {
  //     case 'name':
  //       setName(value);
  //       break;
  //     case 'number':
  //       setNumber(value);
  //       break;
  //     default:
  //       return;
  //   }
  // };

  // const reset = () => {
  //   setName('');
  //   setNumber('');
  // };

  // const handleSubmit = evt => {
  //   evt.preventDefault();
  //   addUser(contactFormObj);
  //   //* addUser(name, number);
  //   reset();
  // };

  const nameTemplates =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

  const phoneTemplates =
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      number: '',
    },

    validationSchema: yup.object().shape({
      name: yup
        .string()
        .min(3)
        .matches(nameTemplates, 'Invalid first, or last name')
        .max(35, 'Must be 35 characters or less')
        .required('Required'),
      number: yup
        .string()
        .matches(phoneTemplates, 'Phone number is not valid')
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      addUser(values);
      // console.log(values);
      resetForm();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Label htmlFor="Name">
        Name{' '}
        <Input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Enter name"
        />
      </Label>

      {formik.touched.name && formik.errors.name ? (
        <Div>{formik.errors.name}</Div>
      ) : null}
      <Label htmlFor="Number">
        Number
        <Input
          id="number"
          name="number"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.number}
          placeholder="Enter number"
        />
      </Label>

      {formik.touched.number && formik.errors.number ? (
        <Div>{formik.errors.number}</Div>
      ) : null}
      <Button type="submit">Add contact</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onSubmit: PropTypes.func,
};
