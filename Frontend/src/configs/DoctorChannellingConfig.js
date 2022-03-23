import { 
  DashboardOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { DOCTOR_CHANNELLING_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${DOCTOR_CHANNELLING_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'reports',
  path: `${DOCTOR_CHANNELLING_PREFIX_PATH}/home`,
  title: 'Reports',
  icon: CopyOutlined,
  breadcrumb: false,
  submenu: []
}]

const doctorChannellingNavigationConfig = [
  ...dashBoardNavTree
]

export default doctorChannellingNavigationConfig;
