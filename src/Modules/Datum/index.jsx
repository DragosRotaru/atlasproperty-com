import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

const Datum = (readQuery) => {
/*
  const DeleteProvider = graphql(deleteMutation, {
    skip: typeof deleteMutation === 'undefined',
    name: 'deleteMutation',
  });

  const UpdateProvider = graphql(updateMutation, {
    skip: typeof updateMutation === 'undefined',
    name: 'updateMutation',
  });
*/
  const DataProvider = graphql(readQuery, {
    skip: typeof readQuery === 'undefined',
    options: props => ({
      variables: {
        id: props.id,
      },
    }),
  });

  const DataWrapper = (component) => {
    const WithData = DataProvider(component);

    class _Datum extends Component {
      render() {
        const id = (typeof this.props.id === 'undefined' ? this.props.match.params.id : this.props.id);
        /*
        if (typeof id === 'undefined') {
          this.props.createMutation({ variables: { id } }).then(data => (
            <WithData
              { ...this.props }
              id={ data[datumName][0].id }
            />)).catch((error) => {
            console.log('there was an error sending the query', error);
          });
        }
        */
        return (<WithData { ...this.props } id={ id }><Component /></WithData>);
      }
    }
    _Datum.propTypes = {
    //   createMutation: PropTypes.func.isRequired,
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
    /*
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
    */
    return _Datum;
  };

  return DataWrapper;
};

export default Datum;
