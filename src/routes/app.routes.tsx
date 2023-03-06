import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Detail } from '../screens/Detail'

import { Home } from '../screens/Home'
import { Search } from '../screens/Search'

const { Navigator, Screen, Group} = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Group>
      <Screen name='Home' component={Home} />
      <Screen name='Search' component={Search}/>
      <Screen name='Detail' component={Detail}/>
      </Group>
    </Navigator>
  )
}