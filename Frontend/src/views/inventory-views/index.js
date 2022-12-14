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
        <Route path={`${INVENTORY_PREFIX_PATH}/home`} component={lazy(() => import(`./inventorylist/`))} />
        <Route path={`${INVENTORY_PREFIX_PATH}/itemlist/additem/`} component={lazy(() => import(`./additem`))} />
        <Route path={`${INVENTORY_PREFIX_PATH}/itemlist/update-details`} component={lazy(() => import(`./update-item`))} />
        <Route path={`${INVENTORY_PREFIX_PATH}/inventorylist/add`} component={lazy(() => import(`./addinventoryitem`))} />
        <Route path={`${INVENTORY_PREFIX_PATH}/stat`} component={lazy(() => import(`./stats`))} />

        <Redirect from={`${INVENTORY_PREFIX_PATH}`} to={`${INVENTORY_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(InventoryViews);