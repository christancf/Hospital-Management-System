import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { STAFF_PREFIX_PATH } from 'configs/AppConfig'

export const StaffViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${STAFF_PREFIX_PATH}/add-staff-member`} component={lazy(() => import(`./add-staff-member`))} />
        <Route path={`${STAFF_PREFIX_PATH}/update-staff-details`} component={lazy(() => import(`./update-staff-details`))} />
        <Route path={`${STAFF_PREFIX_PATH}/display-staff-details`} component={lazy(() => import(`./display-staff-details`))} />
        <Route path={`${STAFF_PREFIX_PATH}/staff-attendance`} component={lazy(() => import(`./staff-attendance`))} />
        <Route path={`${STAFF_PREFIX_PATH}/staff-resignation`} component={lazy(() => import(`./staff-resignation`))} />
        <Route path={`${STAFF_PREFIX_PATH}/staff-salary-bonuses`} component={lazy(() => import(`./staff-salary-bonuses`))} />
        <Route path={`${STAFF_PREFIX_PATH}/calculate-total-salary`} component={lazy(() => import(`./calculate-total-salary`))} />
        <Route path={`${STAFF_PREFIX_PATH}/staff-reports`} component={lazy(() => import(`./staff-reports`))} />
        <Redirect from={`${STAFF_PREFIX_PATH}`} to={`${STAFF_PREFIX_PATH}/display-staff-details`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(StaffViews);