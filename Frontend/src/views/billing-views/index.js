import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { BILLING_PREFIX_PATH } from 'configs/AppConfig'

export const BillingViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${BILLING_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Redirect from={`${BILLING_PREFIX_PATH}`} to={`${BILLING_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(BillingViews);