import { 
  DashboardOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { MORTUARY_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${MORTUARY_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'report',
  path: `${MORTUARY_PREFIX_PATH}/home`,
  title: 'report',
  icon: CopyOutlined,
  breadcrumb: false,
  submenu: []
}]

const mortuaryNavigationConfig = [
  ...dashBoardNavTree
]

export default mortuaryNavigationConfig;
