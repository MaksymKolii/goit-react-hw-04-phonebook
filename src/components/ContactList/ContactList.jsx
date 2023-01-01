import React from 'react';

import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';

import { ListUl } from './ContactList.styled';
import { List } from 'components/ContactItem/ContactItem.styled';

export function ContactList({ options, onClickDelete }) {
  return (
    <ListUl>
      {options.map(({ id, name, number }) => {
        return (
          <List key={id}>
            <ContactItem
              id={id}
              name={name}
              number={number}
              onClickDelete={() => onClickDelete(id)}
            ></ContactItem>
          </List>
        );
      })}
    </ListUl>
  );
}

ContactList.propTypes = {
  children: PropTypes.node,
};
