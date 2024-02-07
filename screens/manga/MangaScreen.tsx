import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
	FlatList,
	Image,
	Pressable,
	Text,
	TextInput,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInfiniteQuery } from '@tanstack/react-query';
import Animes, { Anime } from '../../types/animes';
import { apiUrl } from '../../lib/consts';
import { cn } from '../../utils/tw';
import Ionicons from '@expo/vector-icons/Ionicons';
import setDefaultProps from 'react-native-simple-default-props';
import font from '../../utils/font';
import { randomUUID } from 'expo-crypto';
import { Skeleton } from 'moti/skeleton';
import axios from 'axios';
import useMangaStore from './MangaStore';
import { MangaStackParamList } from '../../stacks/MangaStack';

const defaultText = {
	style: [{ fontFamily: font.quicksand.regular }],
};
setDefaultProps(Text, defaultText);
setDefaultProps(TextInput, defaultText);

type Props = NativeStackScreenProps<MangaStackParamList, 'Manga'>;
const AnimeScreen: React.FC<Props> = ({ navigation, route }) => {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const query = useMangaStore((state) => state.query);
	const filterParams = useMangaStore((state) => state.filterParams);
	const page = useMangaStore((state) => state.page);
	const setPage = useMangaStore((state) => state.setPage);

	const API_URL = `${apiUrl}/manga`;
	async function fetchManga({ pageParam = 1 }) {
		setPage({ page: pageParam });
		const res = await axios.get(API_URL, {
			params: {
				status: filterParams.status,
				type: filterParams.type,
				order_by: filterParams.orderBy,
				sort: filterParams.sort,
				page: pageParam,
				limit: 6,
				q: query,
			},
		});
		return res.data;
	}

	const {
		data: mangas,
		// error,
		fetchNextPage,
		// hasNextPage,
		// isFetching,
		// isFetchingNextPage,
		isLoading,
		refetch,
	} = useInfiniteQuery<Animes, Error>({
		queryKey: [
			'mangas',
			{
				status: filterParams.status,
				type: filterParams.type,
				order_by: filterParams.orderBy,
				sort: filterParams.sort,
				limit: 6,
				page: page,
				q: query,
			},
		],
		queryFn: fetchManga,
		getNextPageParam: (lastPage, pages) => lastPage.pagination.current_page + 1,
	});

	const flatListRef = useRef<FlatList<Anime> | null>(null);
	const flatListRefLoading = useRef<FlatList | null>(null);

	const renderItem = ({ item }: { item: Anime }) => (
		<Pressable
			onPress={() => navigation.push('MangaDetails', { id: item.mal_id })}
			className={cn(
				'rounded-lg',
				'justify-center',
				'mb-4',
				'active:opacity-[0.5]',
				'w-[46vw]'
			)}
		>
			<Image
				resizeMode="cover"
				style={{ width: '100%', height: 190 }}
				source={{
					uri: item.images.jpg.image_url,
				}}
			/>
			<View className="mt-2">
				<Text
					numberOfLines={1}
					style={{ fontFamily: font.quicksand.bold }}
					className="text-xs"
				>
					{item.title}
				</Text>
				<Text className="my-2">{item.year ? item.year : '-'}</Text>
				<View className="flex-row items-center">
					<Ionicons color={'#E46295'} name="ios-star-outline" size={24} />
					<Text
						style={{ fontFamily: font.quicksand.bold }}
						className="ml-2 text-main"
					>
						{item.score ? item.score : '-'}
					</Text>
				</View>
			</View>
		</Pressable>
	);
	const renderItemLoading = () => (
		<View className="w-[46vw] mb-4">
			<View>
				<Skeleton width={'100%'} height={190} colorMode="light" />
			</View>
			<View className="mt-3">
				<Skeleton width={'80%'} height={20} colorMode="light" />
			</View>
			<View className="mt-3">
				<Skeleton width={'45%'} height={20} colorMode="light" />
			</View>
			<View className="mt-3">
				<Skeleton width={'60%'} height={20} colorMode="light" />
			</View>
		</View>
	);

	// if (isLoading) return <Text>Loading</Text>;

	// if (error) return <Text>{error.message}</Text>;
	return (
		<SafeAreaView>
			<View className="justify-center items-center mb-4">
				<View className="w-[95%]">
					<View className={`relative`}>
						<View
							className={`absolute top-[25%] left-1 flex items-center pointer-events-none z-10`}
						>
							<Ionicons
								name={'ios-search-outline'}
								size={24}
								color={'#E46295'}
							/>
						</View>
						<TextInput
							className={`block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
							placeholder="Search Manga"
							defaultValue={query}
							onPressIn={() => navigation.push('MangaSearch')}
						/>
					</View>
				</View>
			</View>
			<View className="justify-center items-center mb-2">
				<View className="w-[95%]">
					<Pressable
						onPress={() => navigation.push('MangaFilter')}
						className={cn(
							'bg-main',
							'active:bg-main/80',
							'flex-row items-center self-start',
							'w-min',
							'rounded',
							'py-2 px-3'
						)}
					>
						<Ionicons name="ios-filter-outline" color={'white'} size={24} />
						<Text
							className="ml-2 text-white"
							style={{ fontFamily: font.quicksand.semiBold }}
						>
							Filter
						</Text>
					</Pressable>
				</View>
			</View>
			<View className="justify-center items-center">
				<View className="w-[95%]">
					{isLoading ? (
						<FlatList
							ref={flatListRefLoading}
							data={new Array(6)}
							renderItem={renderItemLoading}
							// contentContainerStyle={{ paddingBottom: 200 }}
							columnWrapperStyle={{ justifyContent: 'space-between' }}
							keyExtractor={() => randomUUID()}
							numColumns={2}
						/>
					) : (
						<>
							<FlatList
								ref={flatListRef}
								data={mangas && mangas.pages.map((page) => page.data).flat()}
								onRefresh={() => {
									setIsRefreshing(true);
									refetch().then(() => {
										setIsRefreshing(false);
									});
								}}
								refreshing={isRefreshing}
								renderItem={renderItem}
								contentContainerStyle={{ paddingBottom: 200 }}
								columnWrapperStyle={{ justifyContent: 'space-between' }}
								keyExtractor={(item) => item.mal_id.toString()}
								numColumns={2}
								onEndReached={() => fetchNextPage()}
							/>
						</>
					)}
					{/* <View>
						<Text>
							{isFetching && !isFetchingNextPage ? 'Fetching...' : null}
						</Text>
					</View> */}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default AnimeScreen;
