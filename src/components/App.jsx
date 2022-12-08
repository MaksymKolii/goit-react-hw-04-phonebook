import { useState, useEffect } from 'react';
import { GlobalStyle } from './Utils/GlobalStyle';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { Section } from './Section/Section';

// model.id = nanoid(); //=> "V1StGXR8_Z5jdHi6B-myT"

export function App() {
  // state = {
  //   contacts: [
  //     // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  useEffect(() => {
    window.localStorage.setItem('filter', JSON.stringify(filter));
  }, [filter]);

  // componentDidMount() {
  //   const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
  //   console.log(parsedContacts);
  //   if (parsedContacts) {
  //     this.setState({
  //       contacts: parsedContacts,
  //     });
  //   }
  // }

  //! Не делаем Публичным св-вом -(стрелочной ФУ!)
  //* Делать только методом Класса !
  // componentDidUpdate(_, prevState) {
  //   console.log('App componentDidUpdate');

  //   if (this.state.contacts !== prevState.contacts) {
  //     console.log('Обновилось поле Contacts');
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  // addContact = data => {
  //   const newContact = {
  //     id: nanoid(),
  //     ...data,
  //   };
  //   const isNameExist = this.state.contacts.find(({ name, number }) => {
  //     // name.toLowerCase() === newContact.name.toLowerCase();
  //     return (
  //       name.toLowerCase() === newContact.name.toLowerCase() ||
  //       number === newContact.number
  //     );
  //   });

  //   isNameExist
  //     ? window.alert(`${newContact.name} is alredy in contacts!`)
  //     : this.setState(prevState => ({
  //         contacts: [newContact, ...prevState.contacts],
  //       }));
  // };
  const addContact = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };
    const isNameExist = contacts.find(({ name, number }) => {
      // name.toLowerCase() === newContact.name.toLowerCase();
      return (
        name.toLowerCase() === newContact.name.toLowerCase() ||
        number === newContact.number
      );
    });

    isNameExist
      ? window.alert(`${newContact.name} is alredy in contacts!`)
      : setContacts(prevContacts => [newContact, ...prevContacts]);
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
    const { name, value } = ev.target;

    switch (name) {
      case 'name':
        setFilter.name(value);
        break;
      case 'number':
        setFilter.number(value);
        break;
      default:
        return;
    }
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
