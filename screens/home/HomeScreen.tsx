import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UpcomingAnime from './UpcomingAnime';
import { Dimensions, Pressable, ScrollView } from 'react-native';
import CompletedAnime from './CompletedAnime';
import CompletedManga from './CompletedManga';
import { Text } from 'react-native';
// import UpcomingManga from './UpcomingManga';

const { width } = Dimensions.get('window');
const itemWidth = width / 2.1; // Adjust as needed
const HomeScreen: React.FC = () => {
	return (
		<SafeAreaView>
			<ScrollView>
				{/* <UpcomingAnime width={itemWidth} />
        <CompletedAnime width={itemWidth} /> */}
				{/* <UpcomingManga width={itemWidth} /> */}
				{/* <CompletedManga width={itemWidth} /> */}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
