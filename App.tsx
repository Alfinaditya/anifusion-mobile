import './global.css';
import { StyleSheet } from 'react-native';
// import HomeScreen from './screens/home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimeStack from './stacks/AnimeStack';
import MangaStack from './stacks/MangaStack';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
	useFonts,
	Quicksand_300Light,
	Quicksand_400Regular,
	Quicksand_500Medium,
	Quicksand_600SemiBold,
	Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import HomeStack from './stacks/HomeStack';

export type RootStackParamList = {
	HomeStack: undefined;
	MangaStack: undefined;
	AnimeStack: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const queryClient = new QueryClient();
// import SearchContext from './models/Search';
// const { RealmProvider } = SearchContext;

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		Quicksand_300Light,
		Quicksand_400Regular,
		Quicksand_500Medium,
		Quicksand_600SemiBold,
		Quicksand_700Bold,
	});
	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<>
			<StatusBar style="auto" />
			<NavigationContainer>
				<QueryClientProvider client={queryClient}>
					<Tab.Navigator
						screenOptions={({ route }) => ({
							tabBarIcon: ({ focused, color, size }) => {
								let iconName = '';
								switch (route.name) {
									case 'HomeStack':
										iconName = focused ? 'ios-home' : 'ios-home-outline';
										break;
									case 'AnimeStack':
										iconName = focused ? 'ios-film' : 'ios-film-outline';
										break;
									case 'MangaStack':
										iconName = focused ? 'ios-book' : 'ios-book-outline';
										break;
									default:
										break;
								}
								return (
									<Ionicons name={iconName as any} size={size} color={color} />
								);
							},
							tabBarActiveTintColor: '#E46295',
							headerShown: false,
						})}
					>
						<Tab.Screen
							options={{ tabBarLabel: 'Home' }}
							name="HomeStack"
							component={HomeStack}
						/>
						<Tab.Screen
							options={{ tabBarLabel: 'Anime' }}
							name="AnimeStack"
							component={AnimeStack}
						/>
						<Tab.Screen
							options={{ tabBarLabel: 'Manga' }}
							name="MangaStack"
							component={MangaStack}
						/>
					</Tab.Navigator>
				</QueryClientProvider>
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
