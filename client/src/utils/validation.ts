import { handleAlertMsg } from './auth';
import { MutableRefObject } from 'react';
export const validationInputs = (
  textInput: MutableRefObject<HTMLInputElement>,
  priceInput: MutableRefObject<HTMLInputElement>,
  dateInput: MutableRefObject<HTMLInputElement>,
) => {
  const textInputValue = textInput.current.value;
  const priceInputValue = textInput.current.value;
  const dateInputValue = textInput.current.value;

  const inputs = [
    textInput.current,
    priceInput.current,
    dateInput.current,
  ];

  const addDangerBorderCondition = () => 
    inputs.forEach(input => 
      input.value.length 
        ? input.classList.remove('border-danger')
        : input.classList.add('border-danger')
    )

  if (!textInputValue || !priceInputValue || !dateInputValue) {
    handleAlertMsg({ alertStatus: 'warning', alertText: 'Enter a number!'})
    addDangerBorderCondition()

    priceInput.current.classList.add('border-danger');
    return false;
  }

  textInput.current.value = '';
  priceInput.current.value = '';
  dateInput.current.value = '';

  inputs.forEach(input => input.classList.remove('border-danger'))

  return true;
}