import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Animes, { Anime } from '../../types/animes';
import { Image, Pressable, Text, View } from 'react-native';
import { apiUrl } from '../../lib/consts';
import { cn } from '../../utils/tw';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import font from '../../utils/font';
import { Skeleton } from 'moti/skeleton';
import { NavigatorScreenParams } from '@react-navigation/native';
import { AnimeStackParamList } from '../../stacks/AnimeStack';
import { MangaStackParamList } from '../../stacks/MangaStack';
import useAnimeStore from '../anime/AnimeStore';

type RootStackParamList = {
	HomeStack: undefined;
	AnimeStack: NavigatorScreenParams<AnimeStackParamList>;
	MangaStack: NavigatorScreenParams<MangaStackParamList>;
};

type Props = NativeStackScreenProps<RootStackParamList, 'HomeStack'>;
const CompletedAnime: React.FC<Props> = ({ navigation, route }) => {
	const setFilterParams = useAnimeStore((state) => state.setFilterParams);
	const setPage = useAnimeStore((state) => state.setPage);
	const setQuery = useAnimeStore((state) => state.setQuery);
	const {
		isLoading,
		error,
		data: animes,
	} = useQuery<Animes, Error>({
		queryKey: ['completedAnime'],
		queryFn: () =>
			axios
				.get(`${apiUrl}/anime?status=complete&limit=6`)
				.then((res) => res.data),
	});

	if (error) return <Text>{error.message}</Text>;

	return (
		<View className="justify-center items-center mb-14">
			<View className="w-[95%]">
				<View className="flex-row items-center justify-between mb-4">
					<Text
						style={{ fontFamily: font.quicksand.bold }}
						className="text-2xl "
						numberOfLines={2}
					>
						<Text
							style={{ fontFamily: font.quicksand.bold }}
							className="text-2xl text-main"
						>
							Completed{' '}
						</Text>
						Anime
					</Text>
					<Pressable
						onPress={() => {
							setFilterParams({
								orderBy: '',
								sort: '',
								rating: '',
								status: 'complete',
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
							<View key={i} className="w-[46vw] mb-4">
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
										<View className="mt-2 ">
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
													className="ml-2 text-main"
												>
													{anime.score ? anime.score : '-'}
												</Text>
											</View>
										</View>
									</Pressable>
								))}
							</View>
						) : (
							<Text className="text-center">No Completed Anime</Text>
						)}
					</>
				)}
			</View>
		</View>
	);
};

export default CompletedAnime;
