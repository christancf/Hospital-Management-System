import { 
  DashboardOutlined,
  CopyOutlined,
  ContainerOutlined
} from '@ant-design/icons';
import { INVENTORY_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${INVENTORY_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},

{
  key: 'inventory',
  path: `${INVENTORY_PREFIX_PATH}/inventory`,
  title: 'Inventory',
  icon:CopyOutlined ,
  breadcrumb: false,
  submenu: [{
    key: 'itemlist',
    path: `${INVENTORY_PREFIX_PATH}/itemlist`,
    title: 'Item list',
    icon:ContainerOutlined ,
    breadcrumb: false,
    submenu: [{
      key: 'medicines',
      path: `${INVENTORY_PREFIX_PATH}/medicines`,
      title: 'Medicines',
      icon:ContainerOutlined ,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'surgicalitems',
      path: `${INVENTORY_PREFIX_PATH}/surgicalitems`,
      title: 'Surgical Items',
      icon:ContainerOutlined ,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'tools',
      path: `${INVENTORY_PREFIX_PATH}/tools`,
      title: 'Tools',
      icon:ContainerOutlined ,
      breadcrumb: false,
      submenu: []
    }]
  },
  {
    key: 'inventorylist',
    path: `${INVENTORY_PREFIX_PATH}/inventorylist`,
    title: 'Inventory list',
    icon:CopyOutlined ,
    breadcrumb: false,
    submenu: []
  }]
}]

const inventroyNavigationConfig = [
  ...dashBoardNavTree
]

export default inventroyNavigationConfig;
