import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';
import {
  Header,
  Form,
  ButtonForm,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export function SearchBar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const handleInputChange = e => {
    setSearchName(e.currentTarget.value.toLowerCase());
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (searchName.trim() === '') {
      alert('Enter name!');
      return;
    }
    onSubmit(searchName.trim());

    reset();
  };

  const reset = () => {
    setSearchName('');
  };

  return (
    <Header>
      <Form onSubmit={handleFormSubmit}>
        <ButtonForm type="submit">
          <IconContext.Provider value={{ size: '2em' }}>
            <AiOutlineSearch />
          </IconContext.Provider>
          <ButtonLabel>Search</ButtonLabel>
        </ButtonForm>

        <Input
          onChange={handleInputChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
        />
      </Form>
    </Header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
