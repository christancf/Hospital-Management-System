import { 
  DashboardOutlined,
  StepBackwardOutlined
} from '@ant-design/icons';
import { PATIENT_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${PATIENT_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'test',
  path: `${PATIENT_PREFIX_PATH}/home`,
  title: 'test',
  icon: StepBackwardOutlined,
  breadcrumb: false,
  submenu: []
}]

const patientNavigationConfig = [
  ...dashBoardNavTree
]

export default patientNavigationConfig;
