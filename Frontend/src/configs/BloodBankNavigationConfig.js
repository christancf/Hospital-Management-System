import { 
  DashboardOutlined,
  FormOutlined 
} from '@ant-design/icons';
import { BLOODBANK_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${BLOODBANK_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'report',
  path: `${BLOODBANK_PREFIX_PATH}/home`,
  title: 'report',
  icon: FormOutlined,
  breadcrumb: false,
  submenu: []
}]

const bloodBankNavigationConfig = [
  ...dashBoardNavTree
]

export default bloodBankNavigationConfig;
