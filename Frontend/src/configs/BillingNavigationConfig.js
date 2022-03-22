import { 
  DashboardOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { BILLING_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${BILLING_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'reports',
  path: `${BILLING_PREFIX_PATH}/home`,
  title: 'reports',
  icon: CopyOutlined,
  breadcrumb: false,
  submenu: []
}]

const billingNavigationConfig = [
  ...dashBoardNavTree
]

export default billingNavigationConfig;
