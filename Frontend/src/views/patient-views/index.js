import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { PATIENT_PREFIX_PATH } from 'configs/AppConfig'

export const PatientViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${PATIENT_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Redirect from={`${PATIENT_PREFIX_PATH}`} to={`${PATIENT_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(PatientViews);