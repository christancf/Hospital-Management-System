import { 
  DashboardOutlined,
  CopyOutlined,ReadOutlined,FileAddOutlined
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
  key: 'transaction-details',
  title: 'transaction Details',
  breadcrumb: false,
  submenu: [{
    key: 'Add Transaction',
    path: `${BILLING_PREFIX_PATH}/add-details`,
    title: 'Add Transaction',
    icon: FileAddOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'Billing List',
    path: `${BILLING_PREFIX_PATH}/list details`,
    title: 'Billing List',
    icon: CopyOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'Total Bill',
    path: `${BILLING_PREFIX_PATH}/bill details`,
    title: 'Total Bill ',
    icon: ReadOutlined,
    breadcrumb: false,
    submenu: []
  }]
}]
const billingNavigationConfig = [
  ...dashBoardNavTree
]

export default billingNavigationConfig;
