import { 
  DashboardOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { INVENTORY_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${INVENTORY_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'report',
  path: `${INVENTORY_PREFIX_PATH}/home`,
  title: 'report',
  icon:CopyOutlined ,
  breadcrumb: false,
  submenu: []
}]

const inventroyNavigationConfig = [
  ...dashBoardNavTree
]

export default inventroyNavigationConfig;
