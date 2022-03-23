import { 
  DashboardOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { FRONTLINE_CHANNELLING_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${FRONTLINE_CHANNELLING_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'reports',
  path: `${FRONTLINE_CHANNELLING_PREFIX_PATH}/home`,
  title: 'Susith',
  icon: CopyOutlined,
  breadcrumb: false,
  submenu: []
}]

const frontlineChannellingNavigationConfig = [
  ...dashBoardNavTree
]

export default frontlineChannellingNavigationConfig;
