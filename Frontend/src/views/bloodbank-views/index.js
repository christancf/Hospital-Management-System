import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { BLOODBANK_PREFIX_PATH } from 'configs/AppConfig'

export const BloodBankView = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${BLOODBANK_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Redirect from={`${BLOODBANK_PREFIX_PATH}`} to={`${BLOODBANK_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(BloodBankView);