import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import Animes, { Anime } from '../../types/animes';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { apiUrl } from '../../lib/consts';
import { cn } from '../../utils/tw';
import axios from 'axios';
import font from '../../utils/font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Skeleton } from 'moti/skeleton';
import useAnimeStore from '../anime/AnimeStore';
import { AnimeStackParamList } from '../../stacks/AnimeStack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { MangaStackParamList } from '../../stacks/MangaStack';
// import { RootStackParamList } from '../../App';
type RootStackParamList = {
	HomeStack: undefined;
	AnimeStack: NavigatorScreenParams<AnimeStackParamList>;
	MangaStack: NavigatorScreenParams<MangaStackParamList>;
};
type Props = NativeStackScreenProps<RootStackParamList, 'HomeStack'>;
const UpcomingAnime: React.FC<Props> = ({ navigation, route }) => {
	const setFilterParams = useAnimeStore((state) => state.setFilterParams);
	const setPage = useAnimeStore((state) => state.setPage);
	const setQuery = useAnimeStore((state) => state.setQuery);
	const {
		isLoading,
		error,
		data: animes,
	} = useQuery<Animes, Error>({
		queryKey: ['upcomingAnime'],
		queryFn: () =>
			axios
				.get(`${apiUrl}/anime?status=upcoming&limit=6`)
				.then((res) => res.data),
	});

	if (error) return <Text>{error.message}</Text>;

	return (
		<View className={cn('justify-center items-center', 'mb-14')}>
			<View className="w-[95%]">
				<View className={cn('flex-row items-center justify-between', 'mb-4')}>
					<Text
						style={{ fontFamily: font.quicksand.bold }}
						className="text-2xl"
						numberOfLines={2}
					>
						<Text
							style={{ fontFamily: font.quicksand.bold }}
							className="text-2xl text-main"
						>
							Upcoming{' '}
						</Text>
						Anime
					</Text>
					<Pressable
						onPress={() => {
							setFilterParams({
								orderBy: '',
								rating: '',
								sort: '',
								status: 'upcoming',
								type: '',
							});
							setQuery({ query: '' });
							setPage({ page: 1 });
							navigation.navigate('AnimeStack', {
								screen: 'Anime',
							});
						}}
						className="active:bg-gray-300"
					>
						<Text
							style={{ fontFamily: font.quicksand.medium }}
							className="text-main"
						>
							See All
						</Text>
					</Pressable>
				</View>
				{isLoading ? (
					<View className="flex-row flex-wrap justify-between">
						{Array.from(Array(6).keys()).map((i) => (
							<View key={i} className={cn('w-[46vw]', 'mb-4')}>
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
						))}
					</View>
				) : (
					<>
						{animes && animes.data.length > 0 ? (
							<View className="flex-row flex-wrap justify-between">
								{animes.data.map((anime) => (
									<Pressable
										key={anime.mal_id}
										onPress={() =>
											navigation.navigate('AnimeStack', {
												screen: 'AnimeDetails',
												params: { id: anime.mal_id },
											})
										}
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
												uri: anime.images.jpg.image_url,
											}}
										/>
										<View className="mt-2">
											<Text
												numberOfLines={1}
												style={{ fontFamily: font.quicksand.bold }}
												className="text-xs"
											>
												{anime.title}
											</Text>
											<Text className="my-2">
												{anime.year ? anime.year : '-'}
											</Text>
											<View className="flex-row items-center">
												<Ionicons
													color={'#E46295'}
													name="ios-star-outline"
													size={24}
												/>
												<Text
													style={{ fontFamily: font.quicksand.bold }}
													className={cn('ml-2', 'text-main')}
												>
													{anime.score ? anime.score : '-'}
												</Text>
											</View>
										</View>
									</Pressable>
								))}
							</View>
						) : (
							<Text className="text-center">No Upcoming Anime</Text>
						)}
					</>
				)}
			</View>
		</View>
	);
};

export default UpcomingAnime;
