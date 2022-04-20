import { 
  DashboardOutlined,
  TeamOutlined,
  UserAddOutlined,
  EditOutlined,
  UserDeleteOutlined,
  ScheduleOutlined,
  TransactionOutlined,
  AccountBookOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH, STAFF_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'staff-management',
  title: 'Staff Management',
  breadcrumb: false,
  submenu: [
    {
      key: 'display-staff-details',
      path: `${STAFF_PREFIX_PATH}/display-staff-details`,
      title: 'Display Staff Details',
      icon: TeamOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'add-staff-member',
      path: `${STAFF_PREFIX_PATH}/add-staff-member`,
      title: 'Add Staff Member',
      icon: UserAddOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'update-staff-details',
      path: `${STAFF_PREFIX_PATH}/update-staff-details`,
      title: 'Edit Staff Details',
      icon: EditOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'staff-resignation',
      path: `${STAFF_PREFIX_PATH}/staff-resignation`,
      title: 'Staff Resignation',
      icon: UserDeleteOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'staff-attendance',
      path: `${STAFF_PREFIX_PATH}/staff-attendance`,
      title: 'Staff Attendance',
      icon: ScheduleOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'staff-salary-bonuses',
      path: `${STAFF_PREFIX_PATH}/staff-salary-bonuses`,
      title: 'Staff Salary Bonuses',
      icon: TransactionOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'calculate-total-salary',
      path: `${STAFF_PREFIX_PATH}/calculate-total-salary`,
      title: 'Calculate Total Salary',
      icon: AccountBookOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'staff-reports',
      path: `${STAFF_PREFIX_PATH}/staff-reports`,
      title: 'Staff Reports',
      icon: LineChartOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
},
]

const staffNavigationConfig = [
  ...dashBoardNavTree
]

export default staffNavigationConfig;
