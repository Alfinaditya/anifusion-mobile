import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MangaScreen from '../screens/manga/MangaScreen';
import FilterScreen from '../screens/manga/filter/FilterScreen';
import SearchScreen from '../screens/manga/search/SearchScreen';
import MangaDetailsScreen from '../screens/manga-details/MangaDetailsScreen';

export type MangaStackParamList = {
	Manga: undefined;
	MangaSearch: undefined;
	MangaFilter: undefined;
	MangaDetails: { id: number };
};

const ChildStack = createNativeStackNavigator<MangaStackParamList>();

const MangaStack = () => {
	return (
		<ChildStack.Navigator screenOptions={{ headerShown: false }}>
			<ChildStack.Screen name="Manga" component={MangaScreen} />
			<ChildStack.Screen name="MangaFilter" component={FilterScreen} />
			<ChildStack.Screen name="MangaSearch" component={SearchScreen} />
			<ChildStack.Screen name="MangaDetails" component={MangaDetailsScreen} />
		</ChildStack.Navigator>
	);
};

export default MangaStack;
