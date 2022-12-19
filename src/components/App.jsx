import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';
import ContactsForm from './ContactsForm/ContactsForm';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsSaved = JSON.parse(localStorage.getItem('contacts'));
    if (contactsSaved) {
      this.setState({ contacts: contactsSaved });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = number => {
    const searchRepeat = this.state.contacts
      .map(user => user.name.toLowerCase())
      .includes(number.name.toLowerCase());

    if (searchRepeat) {
      alert(`${number.name} is already in contacts`);
    } else {
      const contact = {
        ...number,
        id: nanoid(),
      };
      this.setState(prev => ({ contacts: [...prev.contacts, contact] }));
    }
  };

  getFilteredContact = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  changeFilter = filter => {
    this.setState({ filter });
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { filter } = this.state;
    return (
      <>
        <div>
          <h1
            style={{
              marginBottom: '15px',
              color: '#8f66fd',
              textAlign: 'center',
            }}
          >
            Phonebook
          </h1>
          <ContactsForm addContact={this.addContact} />

          <h2
            style={{
              marginBottom: '15px',
              color: '#8f66fd',
              textAlign: 'center',
            }}
          >
            Contacts
          </h2>
          <Filter value={filter} onChangeFilter={this.changeFilter} />
          <ContactsList
            contacts={this.getFilteredContact()}
            onRemoveContact={this.removeContact}
          />
        </div>
      </>
    );
  }
}

export default App;
