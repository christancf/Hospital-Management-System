import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { BILLING_PREFIX_PATH } from 'configs/AppConfig'

export const BillingViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${BILLING_PREFIX_PATH}/transactions`} component={lazy(() => import(`./addtransaction`))} />
        <Route path={`${BILLING_PREFIX_PATH}/billlist`} component={lazy(() => import(`./Bill-List`))} />
        <Route path={`${BILLING_PREFIX_PATH}/totalbills`} component={lazy(() => import(`./total-bill`))} />
        <Route path={`${BILLING_PREFIX_PATH}/stats`} component={lazy(() => import(`./stats`))} />
        <Redirect from={`${BILLING_PREFIX_PATH}`} to={`${BILLING_PREFIX_PATH}/transactions`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(BillingViews);