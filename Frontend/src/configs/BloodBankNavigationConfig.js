import { 
  DashboardOutlined,
  FormOutlined 
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
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'addBloodBag',
    path: `${BLOODBANK_PREFIX_PATH}/add-details`,
    title: 'Add Blood Bag',
    icon: FormOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'disposalBloodBag',
    path: `${BLOODBANK_PREFIX_PATH}/disposal-bag`,
    title: 'Disposal Of Blood Bag',
    icon: FormOutlined,
    breadcrumb: false,
    submenu: []
  }]
}]

const bloodBankNavigationConfig = [
  ...dashBoardNavTree
]

export default bloodBankNavigationConfig;
