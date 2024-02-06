import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import AnimeDetailsScreen from '../screens/animeDetails/AnimeDetailsScreen';
import MangaDetailsScreen from '../screens/mangaDetails/MangaDetailsScreen';

export type HomeStackParamList = {
	Home: undefined;
	AnimeDetails: { id: number };
	MangaDetails: { id: number };
};

const ChildStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
	return (
		<ChildStack.Navigator screenOptions={{ headerShown: false }}>
			{/* Fix Later */}
			<ChildStack.Screen name="Home" component={HomeScreen as any} />
			<ChildStack.Screen name="AnimeDetails" component={AnimeDetailsScreen} />
			<ChildStack.Screen name="MangaDetails" component={MangaDetailsScreen} />
		</ChildStack.Navigator>
	);
};

export default HomeStack;
