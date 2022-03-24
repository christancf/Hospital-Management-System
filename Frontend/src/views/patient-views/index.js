import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { PATIENT_PREFIX_PATH } from 'configs/AppConfig'

export const PatientViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${PATIENT_PREFIX_PATH}/patientlist`} component={lazy(() => import(`./patientlist`))} />
        <Route path={`${PATIENT_PREFIX_PATH}/update`} component={lazy(() => import(`./update`))} />
        <Route path={`${PATIENT_PREFIX_PATH}/admittance`} component={lazy(() => import(`./admittance`))} />
        <Route path={`${PATIENT_PREFIX_PATH}/stats`} component={lazy(() => import(`./stats`))} />
        <Redirect from={`${PATIENT_PREFIX_PATH}`} to={`${PATIENT_PREFIX_PATH}/patientlist`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(PatientViews);