import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { INVENTORY_PREFIX_PATH } from 'configs/AppConfig'

export const InventoryViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${INVENTORY_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Redirect from={`${INVENTORY_PREFIX_PATH}`} to={`${INVENTORY_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(InventoryViews);