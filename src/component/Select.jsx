import React, {useCallback, useEffect, useRef, useState} from "react"
import Select from 'react-select'

const SelectComponent = (props) => {
  const {onChange, state, value} = props;

  const options = [
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'}
  ]

  return (
    <Select
      components={{IndicatorSeparator: () => null}}
      options={options}
      isSearchable={false}
      value = {
        options.filter(option =>
          option.value === value)
      }
      onChange={(e) => onChange(state, e.value)}
    >
    </Select>
  );
};

export default SelectComponent;
