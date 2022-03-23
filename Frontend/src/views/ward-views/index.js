import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { WARD_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${WARD_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${WARD_PREFIX_PATH}/add-details`} component={lazy(() => import(`./add-ward-details`))} />
        <Route path={`${WARD_PREFIX_PATH}/update-details`} component={lazy(() => import(`./update-ward-details`))} />

        <Redirect from={`${WARD_PREFIX_PATH}`} to={`${WARD_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);