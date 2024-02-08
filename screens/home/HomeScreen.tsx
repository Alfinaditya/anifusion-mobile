import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UpcomingAnime from './UpcomingAnime';
import { ScrollView } from 'react-native';
import CompletedAnime from './CompletedAnime';
import UpcomingManga from './UpcomingManga';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CompletedManga from './CompletedManga';
import { NavigatorScreenParams } from '@react-navigation/native';
import { AnimeStackParamList } from '../../stacks/AnimeStack';
import { MangaStackParamList } from '../../stacks/MangaStack';
// import UpcomingManga from './UpcomingManga';

type RootStackParamList = {
	HomeStack: undefined;
	AnimeStack: NavigatorScreenParams<AnimeStackParamList>;
	MangaStack: NavigatorScreenParams<MangaStackParamList>;
};
type Props = NativeStackScreenProps<RootStackParamList, 'HomeStack'>;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
	// console.log(navigation.);
	return (
		<SafeAreaView>
			<ScrollView
				contentContainerStyle={{
					paddingBottom: 90,
				}}
				className="h-screen"
			>
				<UpcomingAnime navigation={navigation} route={route} />
				<CompletedAnime navigation={navigation} route={route} />
				<UpcomingManga navigation={navigation} route={route} />
				<CompletedManga navigation={navigation} route={route} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
