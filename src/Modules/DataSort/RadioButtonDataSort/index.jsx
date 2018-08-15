import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'rmwc/Radio';


const RadioButtonDataSort = (props) => {
  const name = Math.random().toString(36).substr(2, 10);
  const radioButtons = props.sortsAvailable.map((sort, i) => (
    <Radio
      label={ sort.label }
      key={ sort.label }
      value={ i }
      name={ name }
      onChange={ evt => console.log(evt.target.value) }
    />
  ));
  return <div className={ props.className }>{ radioButtons }</div>;
};
RadioButtonDataSort.propTypes = {
  sortsAvailable: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortsEnabled: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortAdd: PropTypes.func.isRequired,
  sortRemove: PropTypes.func.isRequired,
  className: PropTypes.string,
};
RadioButtonDataSort.defaultProps = {
  className: '',
};

export default RadioButtonDataSort;
