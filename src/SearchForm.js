import React from "react";
import { Form } from "react-bootstrap";

const SearchForm = ({ params, onParamChange }) => {
  return (
    <Form.Group className='d-flex'>
      <Form.Control
        className='mr-3'
        name='description'
        value={params.description}
        onChange={onParamChange}
        type='text'
        placeholder='Job Type'
      />
      <Form.Control
        onChange={onParamChange}
        name='location'
        value={params.location}
        type='text'
        placeholder='Location'
      />
    </Form.Group>
  );
};

export default SearchForm;
