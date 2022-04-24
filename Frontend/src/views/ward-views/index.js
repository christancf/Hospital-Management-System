import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { WARD_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${WARD_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${WARD_PREFIX_PATH}/details/add`} component={lazy(() => import(`./add-ward-details`))} />
        <Route path={`${WARD_PREFIX_PATH}/details/edit`} component={lazy(() => import(`./update-ward-details`))} />
        <Route path={`${WARD_PREFIX_PATH}/nurse/details`} component={lazy(() => import(`./assigned-nurse-details`))} />
        <Route path={`${WARD_PREFIX_PATH}/nurse/assign`} component={lazy(() => import(`./assign-nurses`))} />
        <Route path={`${WARD_PREFIX_PATH}/stats`} component={lazy(() => import(`./stats`))} />

        <Redirect from={`${WARD_PREFIX_PATH}`} to={`${WARD_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);