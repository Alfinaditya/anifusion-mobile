import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/anime/search/SearchScreen';
import AnimeScreen from '../screens/anime/AnimeScreen';
import FilterScreen from '../screens/anime/filter/FilterScreen';
import AnimeDetailsScreen from '../screens/animeDetails/AnimeDetailsScreen';

export type AnimeStackParamList = {
	Anime: undefined;
	Search: undefined;
	Filter: undefined;
	AnimeDetails: { id: number };
};

const ChildStack = createNativeStackNavigator<AnimeStackParamList>();

const AnimeStack = () => {
	return (
		<ChildStack.Navigator screenOptions={{ headerShown: false }}>
			<ChildStack.Screen name="Anime" component={AnimeScreen} />
			<ChildStack.Screen name="Search" component={SearchScreen} />
			<ChildStack.Screen name="Filter" component={FilterScreen} />
			<ChildStack.Screen name="AnimeDetails" component={AnimeDetailsScreen} />
		</ChildStack.Navigator>
	);
};

export default AnimeStack;
