import { 
  DashboardOutlined
} from '@ant-design/icons';
import { WARD_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${WARD_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'ward-details',
  title: 'Ward Details',
  breadcrumb: false,
  submenu: [{
    key: 'add-ward-details',
    path: `${WARD_PREFIX_PATH}/add-details`,
    title: 'Add Details',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'update-ward-details',
    path: `${WARD_PREFIX_PATH}/update-details`,
    title: 'Update Details',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: []
  }]
}]

const wardNavigationConfig = [
  ...dashBoardNavTree
]

export default wardNavigationConfig;
