import { useStore } from 'effector-react';
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { createCostFx } from '../../../api/costsClient';
import { $totalPrice, createCost } from "../../../context/costs";
import { ICost } from "../../../types/cost.interface";
import { countTotalPrice } from '../../../utils/arrayUtils';
import { getAuthDataFromLS, handleAlertMsg } from '../../../utils/auth';
import { validationInputs } from '../../../utils/validation';
import Spinner from "../../spinner/spinner";
import './costsHeader.css';

interface ICostsHeaderProps {
  costs: ICost[];
}

export function CostsHeader({ costs }: ICostsHeaderProps): JSX.Element {
  const [spinner, setSpinner] = useState(false);
  const textRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const totalPrice = useStore($totalPrice);

  useEffect(() => {
    countTotalPrice(costs);
  }, [costs])

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpinner(true);

    const textInputValue = textRef.current.value;
    const priceInputValue = priceRef.current.value;
    const dateInputValue = dateRef.current.value;

    if(!validationInputs(
      textRef,
      priceRef,
      dateRef
    )) {
      setSpinner(false);
      return;
    }

    const authData = getAuthDataFromLS();

    const cost = await createCostFx({
      url: '/costs',
      cost: {
        text: textInputValue,
        price: parseInt(priceInputValue),
        date: dateInputValue
      },
      token: authData!.accessToken
    })

    if(!cost) {
      setSpinner(false);
      return;
    }

    setSpinner(false);
    createCost(cost);
    handleAlertMsg({ alertStatus: 'warning', alertText: 'Success cost created!' })
  }

  return (
    <div className="costs-header">
      <form onSubmit={formSubmit} className="d-flex mb-3">
        <div className="form-item">
          <span className="mb-3">Where is spent:</span>
          <input ref={textRef} type="text" className="form-control" />
        </div>
        <div className="form-item">
          <span className="mb-3">How much is spent:</span>
          <input ref={priceRef} type="text" className="form-control" />
        </div>
        <div className="form-item">
          <span className="mb-3">when it was spent:</span>
          <input ref={dateRef} type="date" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary auth-btn">
          {spinner ? <Spinner top={5} left={20} /> : "Add"}
        </button>
      </form>
      <div style={{ textAlign: 'end', marginBottom: 10 }}>
        total:
        <span> {isNaN(totalPrice) ? 0 : parseInt(String(totalPrice))}</span>
        $
      </div>
    </div>
  )
}
