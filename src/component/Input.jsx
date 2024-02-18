import React, {useCallback, useEffect, useRef, useState} from "react"


const InputComponent = (props) => {
  const {onChange, state, value} = props;

  return (
    <input type={'text'} placeholder={'Type here'} value={value} onChange={(e) => onChange(state, e.target.value)} />
  );
};

export default InputComponent;
