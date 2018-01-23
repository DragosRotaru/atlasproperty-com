// This HOC takes the router parameter and maps it to the id prop
// for the purpose of decoupling

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { graphql } from 'react-apollo';

function Datum(component, datumName, createMutation, readQuery, updateMutation, deleteMutation) {
  const DatumWithDeleteMutation = graphql(deleteMutation, {
    skip: typeof deleteMutation === 'undefined',
    name: 'deleteMutation',
  })(component);

  const DatumWithUpdateDeleteMutation = graphql(updateMutation, {
    skip: typeof updateMutation === 'undefined',
    name: 'updateMutation',
  })(DatumWithDeleteMutation);

  const DatumWithReadUpdateDeleteMutation = graphql(readQuery, {
    skip: typeof readQuery === 'undefined',
  })(DatumWithUpdateDeleteMutation);

  class _Datum extends Component {
    render() {
      const id = typeof this.props.id === 'undefined' ? this.props.params.id : this.props.id;
      if (typeof id === 'undefined') {
        this.props.createMutation({ variables: { id } }).then(data => (
          <DatumWithReadUpdateDeleteMutation
            { ...this.props }
            id={ data[datumName][0].id }
          />)).catch((error) => {
          console.log('there was an error sending the query', error);
        });
      }
      return (<DatumWithReadUpdateDeleteMutation { ...this.props } id={ id } />);
    }
  }
  _Datum.propTypes = {
    createMutation: PropTypes.func.isRequired,
    id: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  };
  _Datum.defaultProps = {
    id: undefined,
    params: {
      id: undefined,
    },
  };
  const DatumWithCreateMutation = graphql(createMutation, {
    skip: props => (typeof createMutation === 'undefined' && (typeof props.id !== 'undefined' || typeof props.params.id !== 'undefined')),
    name: 'createMutation',
    options: props => ({
      variables: {
        id: (typeof props.id !== 'undefined' ? props.id : props.params.id),
      },
    }),
  })(_Datum);

  return DatumWithCreateMutation;
}

export default Datum;
