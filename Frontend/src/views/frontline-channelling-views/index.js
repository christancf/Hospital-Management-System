import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { FRONTLINE_CHANNELLING_PREFIX_PATH } from 'configs/AppConfig'

export const FrontlineChannellingViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${FRONTLINE_CHANNELLING_PREFIX_PATH}/add`} component={lazy(() => import(`./add-addpointment`))} />
        <Route path={`${FRONTLINE_CHANNELLING_PREFIX_PATH}/list`} component={lazy(() => import(`./view-appointment`))} />
        <Redirect from={`${FRONTLINE_CHANNELLING_PREFIX_PATH}`} to={`${FRONTLINE_CHANNELLING_PREFIX_PATH}/add`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(FrontlineChannellingViews);