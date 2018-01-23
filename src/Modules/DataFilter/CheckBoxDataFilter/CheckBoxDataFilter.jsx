import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'rmwc';


const filterGet = (label, filters) => (filters.findIndex(x => x.id === label) > -1);

const CheckBoxDataFilter = (props) => {
  const labels = [];
  const checkBoxes = [];

  const filterChange = (label) => {
    const expression = x => props.accessor(x) === label;
    const index = props.filters.findIndex(x => x.id === label);
    if (index > -1) {
      props.filterRemove(props.filters[index]);
    } else {
      props.filterAdd({ id: label, expression });
    }
  };

  // Generate All Labels from Given DataSet Property
  props.data.forEach(datum =>
    labels.push(props.accessor(datum)));

  // Generate the UI Elements
  [...new Set(labels)].forEach((label) => {
    checkBoxes.push(<Checkbox
      key={ label }
      label={ label }
      theme={ props.theme }
      className={ props.checkBoxClassName }
      checked={ filterGet(
        label,
        props.filters,
      ) }
      onChange={ () => filterChange(label) }
    />);
  });
  return <div className={ props.className }>{ checkBoxes }</div>;
};
CheckBoxDataFilter.propTypes = {
  accessor: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterAdd: PropTypes.func.isRequired,
  filterRemove: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  checkBoxClassName: PropTypes.string,
  theme: PropTypes.arrayOf(PropTypes.string),
};
CheckBoxDataFilter.defaultProps = {
  className: '',
  checkBoxClassName: '',
  theme: '',
};

export default CheckBoxDataFilter;
