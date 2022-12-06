import React, { Component } from 'react';
import { Form, Label, Input, Button } from './ContactForm.styled';
// import { Formik } from 'formik';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.addUser({ ...this.state });
    console.log(this.state);
    this.reset();
  };

  render() {
    const { name, number } = this.state;
    return (
      // <Formik
      //   initialValues={{ name: '', number: '' }}
      //   validate={values => {
      //     const errors = {};
      //     if (!values.name) {
      //       return (errors.name = 'Required');
      //     }
      //   }}
      //   onSubmit={(values, { setSubmitting }) => {
      //     console.log(values);
      //     setTimeout(() => {
      //       alert(JSON.stringify(values, null, 2));
      //       setSubmitting(false);
      //     }, 400);
      //   }}
      // >
      //   {({
      //     values,
      //     errors,
      //     touched,
      //     handleChange,
      //     handleBlur,
      //     handleSubmit,
      //     isSubmitting,
      //     /* and other goodies */
      //   }) => (
      //     <form onSubmit={handleSubmit}>
      //       <input
      //         type="text"
      //         name="name"
      //         onChange={handleChange}
      //         onBlur={handleBlur}
      //         value={values.name}
      //       />
      //       {errors.name && touched.name && errors.name}
      //       <input
      //         type="tel"
      //         name="number"
      //         onChange={handleChange}
      //         onBlur={handleBlur}
      //         value={values.number}
      //       />
      //       {errors.number && touched.number && errors.number}
      //       <button type="submit" disabled={isSubmitting}>
      //         Submit
      //       </button>
      //     </form>
      //   )}
      // </Formik>

      <Form onSubmit={this.handleSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            value={number}
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onSubmit: PropTypes.func,
};
