import { 
  BookOutlined,
  AreaChartOutlined
} from '@ant-design/icons';
import { DOCTOR_CHANNELLING_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'appointments',
  path: `${DOCTOR_CHANNELLING_PREFIX_PATH}/appointments`,
  title: 'Appointments',
  icon: BookOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'reports',
  path: `${DOCTOR_CHANNELLING_PREFIX_PATH}/reports`,
  title: 'Reports',
  icon: AreaChartOutlined,
  breadcrumb: false,
  submenu: []
}]

const doctorChannellingNavigationConfig = [
  ...dashBoardNavTree
]

export default doctorChannellingNavigationConfig;
