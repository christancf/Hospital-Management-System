import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { MORTUARY_PREFIX_PATH } from 'configs/AppConfig'

export const MortuaryViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${MORTUARY_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${MORTUARY_PREFIX_PATH}/info`} component={lazy(() => import(`./info`))} />
        <Route path={`${MORTUARY_PREFIX_PATH}/stats`} component={lazy(() => import(`./stats`))} />
         {/* for testing  */}
        <Route path={`${MORTUARY_PREFIX_PATH}/add`} component={lazy(() => import(`./add-corpse`))} />
        <Redirect from={`${MORTUARY_PREFIX_PATH}`} to={`${MORTUARY_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(MortuaryViews);