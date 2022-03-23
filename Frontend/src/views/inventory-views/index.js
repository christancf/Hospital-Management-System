import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { INVENTORY_PREFIX_PATH } from 'configs/AppConfig'

export const InventoryViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${INVENTORY_PREFIX_PATH}/itemlist/medicines/`} component={lazy(() => import(`./medicines`))} />
        <Route path={`${INVENTORY_PREFIX_PATH}/itemlist/surgicalitems`} component={lazy(() => import(`./surgicalitems`))} />
        <Route path={`${INVENTORY_PREFIX_PATH}/itemlist/tools`} component={lazy(() => import(`./tools`))} />
        <Route path={`${INVENTORY_PREFIX_PATH}/inventorylist/`} component={lazy(() => import(`./inventorylist`))} />
        <Redirect from={`${INVENTORY_PREFIX_PATH}`} to={`${INVENTORY_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(InventoryViews);