import axios from 'axios';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { CounterValue } from 'src/components/counter value';
import { Loader } from 'src/components/loader';
import { MAX_VALUE } from 'src/modules/counter/constants';
import { checkMax } from 'src/modules/counter/helper';
import 'src/modules/counter/styles.css';
async function getCounterValue() {
  return await axios.get(
    'https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json'
  );
}
async function updateCounterValue(value: number) {
  return await axios.put(
    ' https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json',
    { counter: value }
  );
}
export const Counter = () => {
  const [value, setValue] = useState<string | number>(1);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setValue(event.target.value);
      debouncedUpdate(0);
    } else {
      const newValue = checkMax(Number(event.target.value));
      !(Number(value) === newValue) && debouncedUpdate(newValue);
      setValue(newValue);
    }
  };
  const [loader, setLoader] = useState(false);

  const updateValue = (value: number) => {
    setLoader(true);
    updateCounterValue(value)
      .then(() => {
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };
  const debouncedUpdate = useCallback(debounce(updateValue, 500), []);
  const add = () => {
    if (Number(value) === MAX_VALUE) return;
    setValue((prev) => {
      const newValue = Number(prev) + 1;
      debouncedUpdate(newValue);
      return newValue;
    });
  };
  const subtract = () => {
    if (Number(value) === -MAX_VALUE) return;
    setValue((prev) => {
      const newValue = Number(prev) - 1;
      debouncedUpdate(newValue);
      return newValue;
    });
  };
  useEffect(() => {
    getCounterValue().then((value) => {
      if (
        !(value.data?.counter === undefined || value.data?.counter === null)
      ) {
        setValue(value.data.counter);
      }
    });
  }, []);
  return (
    <div className="counter-wrapper">
      <div style={{ height: '20px', marginTop: '10px' }}>
        {loader && <Loader />}
      </div>
      <div className="counter">
        <div className="subtract" onClick={subtract}>
          -
        </div>
        <div className="value">
          <input
            type="number"
            className="value-input"
            value={value}
            onChange={onChange}
          />
        </div>
        <div className="add" onClick={add}>
          +
        </div>
      </div>
      <CounterValue value={value} />
    </div>
  );
};
