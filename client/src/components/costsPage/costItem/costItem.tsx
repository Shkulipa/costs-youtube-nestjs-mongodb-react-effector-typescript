import React, { MutableRefObject, useRef, useState } from "react";
import { deleteCostFx, updateCostFx } from "../../../api/costsClient";
import { removeCost, updateCost } from "../../../context/costs";
import { ICost } from "../../../types/cost.interface"
import { formatDate } from "../../../utils/arrayUtils";
import { getAuthDataFromLS, handleAlertMsg } from "../../../utils/auth";
import { validationInputs } from "../../../utils/validation";
import Spinner from "../../spinner/spinner";
import "./costItem.css";

interface ICostItem {
  cost: ICost;
  index: number;
}

export function CostItem({ cost, index }: ICostItem) {
  const [edit, setEdit] = useState(false);
  const [deleteSpinner, setDeleteSpinner] = useState(false);
  const [editSpinner, setEditSpinner] = useState(false);
  const [newText, setNewText] = useState(cost.text);
  const [newPrice, setNewPrice] = useState(String(cost.price));
  const [newDate, setNewDate] = useState(cost.date);
  const textRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => 
    setNewText(event.target.value);
  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => 
    setNewPrice(event.target.value);
  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => 
    setNewDate(event.target.value);

  const allowEdit = () => {
    setEdit(true);
  }

  const cancelEdit = () => {
    setEditSpinner(false);
    setEdit(false);
  }

  const handleEditCost = async () => {
    setEditSpinner(true);

    if(
      newText === cost.text &&
      +newPrice === +cost.price &&
      newDate === cost.date
    ) {
      setEditSpinner(false)
      setEdit(false)
      return;
    }

    if(!validationInputs(textRef, priceRef, dateRef)) {
      setEditSpinner(false);
      return;
    }

    setEdit(false);
    
    const authData = getAuthDataFromLS();

    const updatedCost = await updateCostFx({
      url: '/costs',
      token: authData!.accessToken,
      cost: { text: newText, price: +newPrice, date: newDate },
      id: cost._id as string
    })

    if(!updatedCost) {
      setEditSpinner(false);
      return;
    }

    setEditSpinner(false);
    updateCost(updatedCost);
    handleAlertMsg({ alertText: "success updated", alertStatus: 'success' });
  }

  const deleteCost = async () => {
    setDeleteSpinner(true);

    const authData = getAuthDataFromLS();

    await deleteCostFx({
      url: '/costs',
      token: authData!.accessToken,
      id: cost._id as string
    })

    setDeleteSpinner(false);
    removeCost(cost._id as string);
    handleAlertMsg({ alertText: 'Success deleted!', alertStatus: 'success' })
  }


  return (
    <li
      className="cost-item list-group-item d-flex justify-content-between align-items-center"
      id={cost._id as string}
    >
      <div className="cost-item-left">
        <span>{index} Shop</span>
        {
          edit 
            ? <input
                ref={textRef}
                onChange={handleChangeText}
                value={newText}
                type="text" 
                className="form-control cost-item-shop-input"
              />
            : <span>"{cost.text}"</span>
        }
        {
          edit 
            ? <input
                ref={priceRef}
                onChange={handleChangeDate}
                value={new Date(newDate).toISOString().split('T')[0]}
                type="text" 
                className="form-control cost-item-date-input"
              />
            : <span className="cost-date">Date {formatDate(cost.date as string)}</span>
        }
      </div>
      <div className="cost-item-right d-flex align-items-center">
        {
          edit
            ? <input
                ref={dateRef}
                onChange={handleChangePrice}
                value={newPrice}
                type="text" 
                className="form-control cost-item-price-input"
              />
            : <span style={{ marginRight: '10px' }}>Price {cost.price}</span>
        }
        {
          edit 
            ? <div className="btn-block__inner">
              <button className="btn btn-primary btn-edit" onClick={handleEditCost}>
                {editSpinner ? <Spinner top={5} left={7} /> : "Save"}
              </button>
              <button className="btn btn-danger btn-cancel" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
            : <button className="btn btn-primary btn-edit" onClick={allowEdit}>Edit</button>
        }
        <button className="btn btn-danger btn-delete" onClick={deleteCost}>
          {deleteSpinner ? <Spinner top={5} left={7} /> : <span>&times;</span>}
        </button>
      </div>
    </li>
  )
}
