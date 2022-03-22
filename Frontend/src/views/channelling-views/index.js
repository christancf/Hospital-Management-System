import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { CHANNELLING_PREFIX_PATH } from 'configs/AppConfig'

export const ChannellingViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${CHANNELLING_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Redirect from={`${CHANNELLING_PREFIX_PATH}`} to={`${CHANNELLING_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(ChannellingViews);