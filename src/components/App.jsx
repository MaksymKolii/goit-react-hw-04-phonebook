import { useState, useEffect } from 'react';
import { GlobalStyle } from './Utils/GlobalStyle';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { Section } from './Section/Section';

// model.id = nanoid(); //=> "V1StGXR8_Z5jdHi6B-myT"

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    // if (
    //   contacts.find(
    //     contact => contact.name === name || contact.number === number
    //   )
    // ) {
    //   alert(`${name} is already in contacts.`);
    //   return;
    // }
    // const newContact = {
    //   id: nanoid(),
    //   name,
    //   number,
    //   // ...data,
    // };

    // setContacts(prevContacts => [newContact, ...prevContacts]);

    const newContact = {
      id: nanoid(),
      name,
      number,
      // ...data,
    };
    if (
      contacts.find(
        ({ name, number }) =>
          // name.toLowerCase() === newContact.name.toLowerCase();
          name === newContact.name || number === newContact.number
      )
    ) {
      return window.alert(`${newContact.name} is alredy in contacts!`);
    }
    setContacts(prevContacts => [newContact, ...prevContacts]);

    // isNameExist
    //   ? window.alert(`${newContact.name} is alredy in contacts!`)
    //   : setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  // deleteContact = iD => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== iD),
  //   }));
  // };
  const deleteContact = iD => {
    setContacts(prevContacts => prevContacts.filter(({ id }) => id !== iD));
  };

  // onFilterChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  const onFilterChange = ev => {
    setFilter(ev.target.value);
  };

  // getFilteredContacts = () => {
  //   const { filter, contacts } = this.state;

  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filter.toLowerCase())
  //   );
  // };
  const getFilteredContacts = () => {
    // const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  // showContactsOptions = () => {
  //   const { filter, contacts } = this.state;
  //   return filter ? getFilteredContacts() : contacts;
  // };
  const showContactsOptions = () => {
    // const { filter, contacts } = this.state;
    return filter ? getFilteredContacts() : contacts;
  };
  // console.log('Render component');
  // const { filter } = this.state;

  // const options = filter ? this.getFilteredContacts() : contacts;
  const options = showContactsOptions();
  return (
    <>
      <Section>
        <h1>Phonebook</h1>
        <ContactForm addUser={addContact}></ContactForm>
      </Section>
      <Section>
        <h2>Contacts</h2>
        <Filter filtered={filter} filterChange={onFilterChange}></Filter>
        <ContactList
          options={options}
          onClickDelete={deleteContact}
        ></ContactList>
      </Section>

      <GlobalStyle />
    </>
  );
}
