import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';


const DataSet = (dataQuery) => {
  const DataProvider = graphql(dataQuery, {
    options: props => ({
      variables: {
        pageSize: props.dataSet.state.global.pageSize,
        cursor: props.dataSet.state.global.cursor,
        filters: props.dataSet.state.global.filters,
        sorts: props.dataSet.state.global.sorts,
      },
    }),
  });

  const DataWrapper = (component) => {
    const WithData = DataProvider(component);

    class _DataSet extends Component {
      constructor(props) {
        super(props);
        this.state = {
          global: {
            pageSize: props.globalInit.pageSize,
            cursor: props.globalInit.cursor,
            sorts: props.globalInit.sorts,
            filters: props.globalInit.filters,
          },
          local: {
            pageSize: props.localInit.pageSize,
            cursor: props.localInit.cursor,
            sorts: props.localInit.sorts,
            filters: props.localInit.filters,
            selected: props.localInit.selected,
          },
        };

        // Set a Property with a Value
        this.set = (value, property, scope) => this.setState((prevState) => {
          const nextState = prevState;
          nextState[scope][property] = value;
          return nextState;
        });

        // Change a Property by Value
        this.delta = (value, property, scope) => this.setState((prevState) => {
          const nextState = prevState;
          nextState[scope][property] = prevState[scope][property] + value;
          return nextState;
        });

        // Append a Value to a State Array
        this.concat = (value, property, scope) => this.setState((prevState) => {
          const nextState = prevState;
          nextState[scope][property] = prevState[scope][property].concat(value);
          return nextState;
        });

        // Remove a Value from a State Array
        this.remove = (value, property, scope) => this.setState((prevState) => {
          const nextState = prevState;
          nextState[scope][property] =
            prevState[scope][property].findIndex(item => item === value) > -1 ?
              prevState[scope][property].filter(item => item !== value) :
              prevState[scope][property];
          return nextState;
        });

        this.process = data => this.sort(this.filter(data));
        this.sort = (data) => {
          if (this.state.local.sorts.length === 0) {
            return data;
          }
          return data; // [...data].sort()
        };
        this.filter = (data) => {
          if (this.state.local.filters.length === 0) {
            return data;
          }
          let output = [];
          this.state.local.filters.forEach((filter) => {
            output = output.concat(data.filter(item => filter.expression(item)));
          });
          return output;
        };
      }
      render() {
        return (
          <WithData
            { ...this.props }
            dataSet={ {
              state: this.state,
              set: (value, property, scope) => this.set(value, property, scope),
              delta: (value, property, scope) => this.set(value, property, scope),
              concat: (value, property, scope) => this.set(value, property, scope),
              remove: (value, property, scope) => this.set(value, property, scope),
            } }
          />
        );
      }
    }
    _DataSet.propTypes = {
      globalInit: PropTypes.shape({
        pageSize: PropTypes.number,
        cursor: PropTypes.number,
        filters: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          expression: PropTypes.func,
        })),
        sorts: PropTypes.arrayOf(PropTypes.shape({
          field: PropTypes.string,
          order: PropTypes.oneOf(['ASC', 'DSC']),
        })),
        filterable: PropTypes.oneOf(['none', 'single', 'multi']),
        sortable: PropTypes.oneOf(['none', 'single', 'multi']),
      }),
      localInit: PropTypes.shape({
        pageSize: PropTypes.number,
        cursor: PropTypes.number,
        filters: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          expression: PropTypes.func,
        })),
        sorts: PropTypes.arrayOf(PropTypes.shape({
          field: PropTypes.string,
          order: PropTypes.oneOf(['ASC', 'DSC']),
        })),
        selected: PropTypes.arrayOf(PropTypes.object),
        filterable: PropTypes.oneOf(['none', 'single', 'multi']),
        sortable: PropTypes.oneOf(['none', 'single', 'multi']),
        selectable: PropTypes.oneOf(['none', 'single', 'multi']),
      }),
    };
    _DataSet.defaultProps = {
      globalInit: {
        pageSize: 25,
        cursor: 0,
        filters: [],
        sorts: [],
        selected: [],
        filterable: 'none',
        sortable: 'none',
      },
      localInit: {
        pageSize: 25,
        cursor: 0,
        filters: [],
        sorts: [],
        selected: [],
        filterable: 'none',
        sortable: 'none',
        selectable: 'none',
      },
    };

    return _DataSet;
  };

  return DataWrapper;
};

export default DataSet;
