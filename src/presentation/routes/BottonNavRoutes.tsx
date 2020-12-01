import MenuBookIcon from '@material-ui/icons/RestaurantMenuOutlined'
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined'
import SearchIcon from '@material-ui/icons/SearchOutlined'
import PersonIcon from '@material-ui/icons/PersonOutline'

const BottonNavRoutes = [
  {
    label: 'Cardápio',
    icon: <MenuBookIcon />,
    destination: '/main/menu'
  },
  {
    label: 'Buscar',
    icon: <SearchIcon />,
    destination: '/main/search'
  },
  {
    label: 'Pedidos',
    icon: <ReceiptIcon />,
    destination: '/main/orders'
  },
  {
    label: 'Perfil',
    icon: <PersonIcon />,
    destination: '/main/profile'
  }
]

export function getNavIndex(pathName: string): number {
  const index = BottonNavRoutes.findIndex(item => item.destination === pathName)
  return index >= 0 ? index : 0
}

export default BottonNavRoutes
