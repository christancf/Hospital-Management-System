import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { STAFF_PREFIX_PATH } from 'configs/AppConfig'

export const StaffViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${STAFF_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${STAFF_PREFIX_PATH}/add-staff-member`} component={lazy(() => import(`./add-staff-member`))} />
        <Redirect from={`${STAFF_PREFIX_PATH}`} to={`${STAFF_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(StaffViews);