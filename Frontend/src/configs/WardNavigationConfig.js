import { 
  DashboardOutlined
} from '@ant-design/icons';
import { WARD_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [
  {
    key: 'dashboard',
    path: `${WARD_PREFIX_PATH}/home`,
    title: 'dashboard',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'assigned-nurse-details',
        path: `${WARD_PREFIX_PATH}/nurse/details`,
        title: 'Assigned Nurse Details',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'assign nurse',
        path: `${WARD_PREFIX_PATH}/nurse/assign`,
        title: 'Assign Nurse',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'ward-details',
        path: `${WARD_PREFIX_PATH}/details`,
        title: 'ward details',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'add-ward-details',
            path: `${WARD_PREFIX_PATH}/details/add`,
            title: 'Add Details',
            icon: '',
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'update-ward-details',
            path: `${WARD_PREFIX_PATH}/details/edit`,
            title: 'Update Details',
            icon: '',
            breadcrumb: false,
            submenu: []
          }
        ]
      },
      {
        key: 'stats',
        path: `${WARD_PREFIX_PATH}/stats`,
        title: 'Stats',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: []
      }
    ]
  }
]

const wardNavigationConfig = [
  ...dashBoardNavTree
]

export default wardNavigationConfig;
