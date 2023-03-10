import { createStackNavigator  } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { Search } from '../screens/Search'
import { Detail } from '../screens/Detail'


const { Navigator, Screen } = createStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="Search" component={Search}/>
      <Screen name="Detail" component={Detail}/>
    </Navigator>
  )
}