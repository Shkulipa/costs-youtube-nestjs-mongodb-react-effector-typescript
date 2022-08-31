import { useStore } from 'effector-react';
import { useEffect, useMemo, useRef, useState } from "react";
import { getCostFx } from "../../api/costsClient";
import { $costs, setCosts } from "../../context/costs";
import { getAuthDataFromLS } from "../../utils/auth";
import Spinner from "../spinner/spinner";
import { CostsHeader } from "./costsHeader/costsHeader";
import { CostsList } from './costsList/costsList';

export function CostsPage(): JSX.Element {
  const [spinner, setSpinner] = useState(false);
  const store = useStore($costs);
  const shouldLoadCosts = useRef<boolean>(true);

  useEffect(() => {
    if(shouldLoadCosts) {
      shouldLoadCosts.current = false;
      handleGetCosts();
    }
  }, [])

  /**
   * more correct variant: https://share.effector.dev/NBhCiDCN
   * get status loading from Fx func
   */
  const handleGetCosts = async () => {
    setSpinner(true);
    const authData = getAuthDataFromLS(); 
    
    const costs = await getCostFx({
      url: '/costs',
      token: authData!.accessToken
    });

    setSpinner(false);
    setCosts(costs);
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>Keeping track of my expenses </h2>
      {useMemo(() => <CostsHeader costs={store} />, [store])}
      <div style={{ position: 'relative' }}>
        {spinner && <Spinner top={0} left={0} />}
        {useMemo(() => <CostsList costs={store}/>, [store])}
        {(!spinner && !store.length) && <h2>List is empty</h2>}
      </div>
    </div>
  )
}
