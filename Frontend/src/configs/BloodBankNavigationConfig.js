import { 
  DashboardOutlined,
  FormOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { BLOODBANK_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${BLOODBANK_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'bloodBank',
  title: 'Blood Bank',
  breadcrumb: false,
  submenu: [{
    key: 'bloodInformation',
    path: `${BLOODBANK_PREFIX_PATH}/bags-informations`,
    title: 'Blood Information',
    icon: UnorderedListOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'addBloodBag',
    path: `${BLOODBANK_PREFIX_PATH}/add-details`,
    title: 'Add Blood Bag',
    icon: PlusOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'disposalBloodBag',
    path: `${BLOODBANK_PREFIX_PATH}/disposal-bloodbags`,
    title: 'Disposal Of Blood Bag',
    icon: ExclamationCircleOutlined,
    breadcrumb: false,
    submenu: []
  }]
}]

const bloodBankNavigationConfig = [
  ...dashBoardNavTree
]

export default bloodBankNavigationConfig;
