import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { AUTH_PREFIX_PATH, FRONTLINE_CHANNELLING_PREFIX_PATH , DOCTOR_CHANNELLING_PREFIX_PATH, BILLING_PREFIX_PATH,
BLOODBANK_PREFIX_PATH, INVENTORY_PREFIX_PATH, MORTUARY_PREFIX_PATH, PATIENT_PREFIX_PATH, STAFF_PREFIX_PATH, WARD_PREFIX_PATH} from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page"/>}>
      <Switch>
        <Route path={`${AUTH_PREFIX_PATH}${FRONTLINE_CHANNELLING_PREFIX_PATH}`} component={lazy(() => import(`./authentication/channelling-frontline-login/views`))} />
        <Route path={`${AUTH_PREFIX_PATH}${DOCTOR_CHANNELLING_PREFIX_PATH}`} component={lazy(() => import(`./authentication/channelling-doctor-login/views`))} />
        <Route path={`${AUTH_PREFIX_PATH}${BILLING_PREFIX_PATH}`} component={lazy(() => import(`./authentication/billing-login/views`))} />
        <Route path={`${AUTH_PREFIX_PATH}${BLOODBANK_PREFIX_PATH}`} component={lazy(() => import(`./authentication/bloodbank-login/views`))} />
        <Route path={`${AUTH_PREFIX_PATH}${INVENTORY_PREFIX_PATH}`} component={lazy(() => import(`./authentication/inventory-lgoin/views`))} />
        <Route path={`${AUTH_PREFIX_PATH}${MORTUARY_PREFIX_PATH}`} component={lazy(() => import(`./authentication/mortuary-login/views`))} />
        <Route path={`${AUTH_PREFIX_PATH}${PATIENT_PREFIX_PATH}`} component={lazy(() => import(`./authentication/patient-login/views`))} />
        <Route path={`${AUTH_PREFIX_PATH}${STAFF_PREFIX_PATH}`} component={lazy(() => import(`./authentication/staff-login/views`))} />
        <Route path={`${AUTH_PREFIX_PATH}${WARD_PREFIX_PATH}`} component={lazy(() => import(`./authentication/ward-login/views`))} />
        <Route path={`${AUTH_PREFIX_PATH}/error-1`} component={lazy(() => import(`./errors/error-page-1`))} />
        <Route path={`${AUTH_PREFIX_PATH}/error-2`} component={lazy(() => import(`./errors/error-page-2`))} />
        <Redirect from={`${AUTH_PREFIX_PATH}`} to={`${AUTH_PREFIX_PATH}/login`} />
      </Switch>
    </Suspense>
  )
}

export default AppViews;

