import { 
  DashboardOutlined,
  InfoCircleOutlined,
  LineChartOutlined
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
  path: `${MORTUARY_PREFIX_PATH}/info`,
  title: 'Corpse Information',
  icon: InfoCircleOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'stats',
  path: `${MORTUARY_PREFIX_PATH}/stats`,
  title: 'Stats',
  icon: LineChartOutlined,
  breadcrumb: false,
  submenu: []
}]

const mortuaryNavigationConfig = [
  ...dashBoardNavTree
]

export default mortuaryNavigationConfig;
