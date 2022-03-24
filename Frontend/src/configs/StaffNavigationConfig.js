import { 
  DashboardOutlined
} from '@ant-design/icons';
import { STAFF_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${STAFF_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'add-staff-member',
  path: `${STAFF_PREFIX_PATH}/add-staff-member`,
  title: 'Add Staff Member',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
}]

const staffNavigationConfig = [
  ...dashBoardNavTree
]

export default staffNavigationConfig;
