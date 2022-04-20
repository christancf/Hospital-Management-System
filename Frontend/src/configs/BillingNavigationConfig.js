import { 
  DashboardOutlined,
  CopyOutlined,ReadOutlined,FileAddOutlined
} from '@ant-design/icons';
import { BILLING_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [
{
  key: 'Bill List',
  path: `${BILLING_PREFIX_PATH}/billlist`,
  title: 'Bill List',
  icon: CopyOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'Add Transaction',
  path: `${BILLING_PREFIX_PATH}/transactions`,
  title: 'Add Transaction',
  icon: FileAddOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'Total Bill',
  path: `${BILLING_PREFIX_PATH}/totalbills`,
  title: 'Total Bill ',
  icon: ReadOutlined,
  breadcrumb: false,
  submenu: []
}
]
const billingNavigationConfig = [
  ...dashBoardNavTree
]

export default billingNavigationConfig;
