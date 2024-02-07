import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/anime/search/SearchScreen';
import AnimeScreen from '../screens/anime/AnimeScreen';
import FilterScreen from '../screens/anime/filter/FilterScreen';
import AnimeDetailsScreen from '../screens/anime-details/AnimeDetailsScreen';

export type AnimeStackParamList = {
	Anime: undefined;
	AnimeSearch: undefined;
	AnimeFilter: undefined;
	AnimeDetails: { id: number };
};

const ChildStack = createNativeStackNavigator<AnimeStackParamList>();

const AnimeStack = () => {
	return (
		<ChildStack.Navigator screenOptions={{ headerShown: false }}>
			<ChildStack.Screen name="Anime" component={AnimeScreen} />
			<ChildStack.Screen name="AnimeSearch" component={SearchScreen} />
			<ChildStack.Screen name="AnimeFilter" component={FilterScreen} />
			<ChildStack.Screen name="AnimeDetails" component={AnimeDetailsScreen} />
		</ChildStack.Navigator>
	);
};

export default AnimeStack;
