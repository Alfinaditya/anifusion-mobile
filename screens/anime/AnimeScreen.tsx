import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
import {
	Button,
	Dimensions,
	FlatList,
	Image,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimeStackParamList } from '../../stacks/AnimeStack';
import { useQuery } from '@tanstack/react-query';
import Animes, { Anime } from '../../types/animes';
import { apiUrl } from '../../lib/consts';
import { cn } from '../../utils/tw';
import Ionicons from '@expo/vector-icons/Ionicons';
import useAnimeStore from './AnimeStore';
import setDefaultProps from 'react-native-simple-default-props';
import font from '../../utils/font';
const defaultText = {
	style: [{ fontFamily: font.quicksand.regular }],
};
setDefaultProps(Text, defaultText);

type Props = NativeStackScreenProps<AnimeStackParamList, 'Anime'>;
const AnimeScreen: React.FC<Props> = ({ navigation, route }) => {
	const query = useAnimeStore((state) => state.query);
	const filterParams = useAnimeStore((state) => state.filterParams);

	const filterParamsValue: Record<string, any> = {
		status: filterParams.status,
		type: filterParams.type,
		rating: filterParams.rating,
		order_by: filterParams.orderBy,
		sort: filterParams.sort,
	};
	const queryParamsValue: Record<string, any> = {
		q: query,
	};

	const filterUrlParams = new URLSearchParams(filterParamsValue);
	const cleanedFilterUrlParams = removeEmptyParams(
		Object.fromEntries(filterUrlParams)
	);
	const convertedFilterParams = new URLSearchParams(
		cleanedFilterUrlParams
	).toString();

	const queryUrlParams = new URLSearchParams(queryParamsValue);
	const cleanedQueryUrlParams = removeEmptyParams(
		Object.fromEntries(queryUrlParams)
	);
	const convertedQueryParams = new URLSearchParams(
		cleanedQueryUrlParams
	).toString();

	const API_URL = `${apiUrl}/anime?${convertedQueryParams}&${convertedFilterParams}`;
	const {
		isLoading,
		error,
		data: animes,
	} = useQuery<Animes, Error>({
		queryKey: ['animes'],
		queryFn: () => fetch(API_URL).then((res) => res.json()),
	});

	const flatListRef = useRef<FlatList<Anime> | null>(null);

	const renderItem = ({ item }: { item: Anime }) => (
		<TouchableOpacity
			onPress={() => navigation.push('AnimeDetails', { id: item.mal_id })}
			className={cn('bg-blue-500 rounded-lg', 'justify-center', 'm-2')}
		>
			<Image
				resizeMode="cover"
				width={190}
				height={190}
				style={{ width: '100%' }}
				source={{
					uri: item.images.jpg.image_url,
				}}
			/>
			<View className="mt-2 w-[46vw]">
				<Text numberOfLines={2} className="text-xs">
					{item.title}
				</Text>
				{item.year && <Text>{item.year}</Text>}
				<View className="flex-row items-center">
					<Ionicons color={'#E46295'} name="ios-star-outline" size={24} />
					<Text className="ml-2">{item.score ? item.score : '-'}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
	function removeEmptyParams(params: Record<string, any>) {
		for (const key in params) {
			if (
				params[key] === undefined ||
				params[key] === '' ||
				params[key] === null
			) {
				delete params[key];
			}
		}
		return params;
	}

	if (isLoading) return <Text>Loading</Text>;

	if (error) return <Text>{error.message}</Text>;

	return (
		<SafeAreaView>
			<View className="mb-2">
				{/* <Text className={cn('text-sm font-medium text-gray-900 sr-only')}>
					Search
				</Text> */}

				<View className={`relative`}>
					<View
						className={`absolute top-[25%] left-1 flex items-center pointer-events-none z-10`}
					>
						<Ionicons name={'ios-search-outline'} size={24} color={'#E46295'} />
					</View>
					<TextInput
						className={`block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
						placeholder="Search Anime"
						defaultValue={query}
						onPressIn={() => navigation.push('Search')}
					/>
				</View>
			</View>
			<Pressable
				onPress={() => navigation.push('Filter')}
				className="bg-main flex-row items-center w-min self-start rounded mb-2 p-1 h-7"
			>
				<Ionicons name="ios-filter-outline" color={'white'} size={24} />
				<Text className="ml-2 text-white">Filter</Text>
			</Pressable>

			{animes.data.length > 0 ? (
				<View style={{ backgroundColor: 'green' }}>
					<FlatList
						ref={flatListRef}
						data={animes.data}
						renderItem={renderItem}
						keyExtractor={(item) => item.mal_id.toString()}
						numColumns={2}
					/>
				</View>
			) : (
				<Text className="text-center">No Completed Anime</Text>
			)}
		</SafeAreaView>
	);
};

export default AnimeScreen;
