import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MangaScreen from '../screens/manga/MangaScreen';
import MangaDetailsScreen from '../screens/mangaDetails/MangaDetailsScreen';

type MangaStackParamList = {
  Manga: undefined;
  Search: undefined;
  MangaDetails: { id: string };
};

const ChildStack = createNativeStackNavigator<MangaStackParamList>();

const MangaStack = () => {
  return (
    <ChildStack.Navigator screenOptions={{ headerShown: false }}>
      <ChildStack.Screen name="Manga" component={MangaScreen} />
      <ChildStack.Screen name="MangaDetails" component={MangaDetailsScreen} />
    </ChildStack.Navigator>
  );
};

export default MangaStack;
