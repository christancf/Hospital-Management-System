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
  key: 'display-staff-details',
  path: `${STAFF_PREFIX_PATH}/display-staff-details`,
  title: 'Display Staff Details',
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
},
{
  key: 'update-staff-details',
  path: `${STAFF_PREFIX_PATH}/update-staff-details`,
  title: 'Update Staff Details',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'staff-resignation',
  path: `${STAFF_PREFIX_PATH}/staff-resignation`,
  title: 'Staff Resignation',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'staff-attendance',
  path: `${STAFF_PREFIX_PATH}/staff-attendance`,
  title: 'Staff Attendance',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'staff-salary-bonuses',
  path: `${STAFF_PREFIX_PATH}/staff-salary-bonuses`,
  title: 'Staff Salary Extensions',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'calculate-total-salary',
  path: `${STAFF_PREFIX_PATH}/calculate-total-salary`,
  title: 'Calculate Total Salary',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
}]

const staffNavigationConfig = [
  ...dashBoardNavTree
]

export default staffNavigationConfig;
