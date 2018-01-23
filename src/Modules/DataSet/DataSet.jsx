import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';


const DataSet = (dataQuery) => {
  const DataProvider = graphql(dataQuery, {
    options: props => ({
      variables: {
        pageSize: props.global.state.pageSize,
        cursor: props.global.state.cursor,
        filters: props.global.state.filters,
        sorts: props.global.state.sorts,
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
        /*
        this.resetState = () => this.setState({
          pageSize: this.props.globalInit.pageSize,
          cursor: this.props.globalInit.cursor,
          sorts: this.props.globalInit.sorts,
          filters: this.props.globalInit.filters,
        });
        */
        this.pageSizeSet = (pageSize, scope) => this.setState({ [scope]: { pageSize } });
        this.cursorSet = cursor => this.setState({ global: { cursor } });
        this.cursorIncrement = inc => this.setState(prevState =>
          ({ cursor: prevState.cursor + inc }));
        this.cursorDecrement = dec => this.setState(prevState =>
          ({ cursor: prevState.cursor - dec }));
        this.sortAdd = sort => this.setState(prevState =>
          ({ sorts: prevState.sorts.concat(sort) }));
        this.sortRemove = sort => this.setState(prevState =>
          ({
            sorts: prevState.sorts.indexOf(sort) > -1 ?
              prevState.sorts.filter(item => item !== sort) :
              prevState.sorts,
          }));
        this.filterAdd = (filter, scope) => this.setState(prevState =>
          ({ [scope]: { filters: prevState[scope].filters.concat(filter) } }));
        this.filterRemove = (filter, scope) => this.setState(prevState =>
          ({
            [scope]: {
              filters: prevState[scope].filters.findIndex(item => item.id === filter.id) > -1 ?
                prevState[scope].filters.filter(item => item.id !== filter.id) :
                prevState[scope].filters,
            },
          }));
        this.selectAdd = select => this.setState(prevState =>
          ({ selected: prevState.selected.concat(select) }));
        this.selectRemove = select => this.setState(prevState =>
          ({
            selected: prevState.selected.indexOf(select) > -1 ?
              prevState.selected.filter(item => item !== select) :
              prevState.selected,
          }));
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
            global={ {
              state: this.state.global,
              reset: () => this.reset,
              pageSizeSet: size => this.pageSizeSet(size),
              pageSizeReset: () => this.pageSizeReset,
              cursorSet: position => this.cursorSet(position),
              cursorReset: () => this.cursorReset,
              cursorIncrement: inc => this.cursorIncrement(inc),
              cursorDecrement: dec => this.cursorDecrement(dec),
              sortAdd: sort => this.sortAdd(sort),
              sortRemove: sort => this.sortRemove(sort),
              sortReset: () => this.sortReset,
              filterAdd: filter => this.filterAdd(filter),
              filterRemove: filter => this.filterRemove(filter),
              filterReset: () => this.filterReset,
              } }
            local={ {
              state: this.state.local,
              reset: () => this.reset,
              pageSizeSet: size => this.pageSizeSet(size),
              pageSizeReset: () => this.pageSizeReset,
              cursorSet: position => this.cursorSet(position),
              cursorReset: () => this.cursorReset,
              cursorIncrement: inc => this.cursorIncrement(inc),
              cursorDecrement: dec => this.cursorDecrement(dec),
              sortAdd: sort => this.sortAdd(sort),
              sortRemove: sort => this.sortRemove(sort),
              sortReset: () => this.sortReset,
              filterAdd: filter => this.filterAdd(filter, 'local'),
              filterRemove: filter => this.filterRemove(filter, 'local'),
              filterReset: () => this.filterReset,
              process: data => this.process(data),
            } }
          ><Component />
          </WithData>
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
