import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { DOCTOR_CHANNELLING_PREFIX_PATH } from 'configs/AppConfig'

export const DoctorChannellingViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${DOCTOR_CHANNELLING_PREFIX_PATH}/list`} component={lazy(() => import(`./view-appointment`))} />
        <Route path={`${DOCTOR_CHANNELLING_PREFIX_PATH}/reports`} component={lazy(() => import(`./reports`))} />
        <Redirect from={`${DOCTOR_CHANNELLING_PREFIX_PATH}`} to={`${DOCTOR_CHANNELLING_PREFIX_PATH}/list`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(DoctorChannellingViews);