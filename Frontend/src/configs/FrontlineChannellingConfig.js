import { 
  BookOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons';
import { FRONTLINE_CHANNELLING_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'addappointment',
  path: `${FRONTLINE_CHANNELLING_PREFIX_PATH}/add`,
  title: 'Add Appointment',
  icon: AppstoreAddOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'currentappointments',
  path: `${FRONTLINE_CHANNELLING_PREFIX_PATH}/list`,
  title: 'Current Appointments',
  icon: BookOutlined,
  breadcrumb: false,
  submenu: []
}]

const frontlineChannellingNavigationConfig = [
  ...dashBoardNavTree
]

export default frontlineChannellingNavigationConfig;
