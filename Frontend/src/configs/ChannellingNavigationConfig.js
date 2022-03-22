import { 
  DashboardOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { CHANNELLING_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${CHANNELLING_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'reports',
  path: `${CHANNELLING_PREFIX_PATH}/home`,
  title: 'reports',
  icon: CopyOutlined,
  breadcrumb: false,
  submenu: []
}]

const channellingNavigationConfig = [
  ...dashBoardNavTree
]

export default channellingNavigationConfig;
