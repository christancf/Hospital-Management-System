import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { BLOODBANK_PREFIX_PATH } from 'configs/AppConfig'

export const BloodBankView = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${BLOODBANK_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${BLOODBANK_PREFIX_PATH}/add-details`} component={lazy(() => import(`./add-blood-bag`))} />
        <Route path={`${BLOODBANK_PREFIX_PATH}/update-details`} component={lazy(() => import(`./update-blood-bag`))} />
        <Route path={`${BLOODBANK_PREFIX_PATH}/bags-informations`} component={lazy(() => import(`./blood-bags-informations`))} />
        
        <Redirect from={`${BLOODBANK_PREFIX_PATH}`} to={`${BLOODBANK_PREFIX_PATH}/home`} />
        
      </Switch>
    </Suspense>
  )
}

export default React.memo(BloodBankView);