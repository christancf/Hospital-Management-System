import { 
  UnorderedListOutlined,
  DashboardOutlined,
  StepBackwardOutlined,
  PlusOutlined,
  EditOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import { PATIENT_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'patientlist',
  path: `${PATIENT_PREFIX_PATH}/patientlist`,
  title: 'Patient List',
  icon: UnorderedListOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'admittance',
  path: `${PATIENT_PREFIX_PATH}/admittance`,
  title: 'Admittance',
  icon: PlusOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'update',
  path: `${PATIENT_PREFIX_PATH}/update`,
  title: 'Update Patient List',
  icon: EditOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'stats',
  path: `${PATIENT_PREFIX_PATH}/stats`,
  title: 'Patient Statistics',
  icon: LineChartOutlined,
  breadcrumb: false,
  submenu: []
}
]

const patientNavigationConfig = [
  ...dashBoardNavTree
]

export default patientNavigationConfig;
