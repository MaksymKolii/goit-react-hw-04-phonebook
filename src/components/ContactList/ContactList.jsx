import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';

import { List } from './ContactList.styled';

export class ContactList extends Component {
  render() {
    return this.props.options.map(({ id, name, number }) => {
      return (
        <List key={id}>
          <ContactItem
            id={id}
            name={name}
            number={number}
            onClickDelete={() => this.props.onClickDelete(id)}
          ></ContactItem>
        </List>
      );
    });
  }
}

ContactList.propTypes = {
  children: PropTypes.node,
};
