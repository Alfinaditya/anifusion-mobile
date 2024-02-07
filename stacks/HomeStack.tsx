import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';

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
		</ChildStack.Navigator>
	);
};

export default HomeStack;
