import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { apiUrl } from '../../lib/consts';
import { cn } from '../../utils/tw';
import Mangas from '../../types/mangas';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Skeleton } from 'moti/skeleton';
import font from '../../utils/font';
import { NavigatorScreenParams } from '@react-navigation/native';
import { AnimeStackParamList } from '../../stacks/AnimeStack';
import { MangaStackParamList } from '../../stacks/MangaStack';
import useMangaStore from '../manga/MangaStore';

type RootStackParamList = {
	HomeStack: undefined;
	AnimeStack: NavigatorScreenParams<AnimeStackParamList>;
	MangaStack: NavigatorScreenParams<MangaStackParamList>;
};
type Props = NativeStackScreenProps<RootStackParamList, 'HomeStack'>;
const UpcomingManga: React.FC<Props> = ({ navigation, route }) => {
	const setFilterParams = useMangaStore((state) => state.setFilterParams);
	const setPage = useMangaStore((state) => state.setPage);
	const setQuery = useMangaStore((state) => state.setQuery);
	const {
		isLoading,
		error,
		data: mangas,
	} = useQuery<Mangas, Error>({
		queryKey: ['completedManga'],
		queryFn: () =>
			axios
				.get(`${apiUrl}/manga?status=complete&limit=6`)
				.then((res) => res.data),
	});

	if (error) return <Text>{error.message}</Text>;

	return (
		<View className={cn('justify-center items-center', 'mb-14')}>
			<View className="w-[95%]">
				<View className={cn('flex-row items-center justify-between', 'mb-4')}>
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
						Manga
					</Text>
					<Pressable
						onPress={() => {
							setFilterParams({
								orderBy: '',
								sort: '',
								status: 'complete',
								type: '',
							});
							setQuery({ query: '' });
							setPage({ page: 1 });
							navigation.navigate('MangaStack', {
								screen: 'Manga',
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
						{mangas && mangas.data.length > 0 ? (
							<View className="flex-row flex-wrap justify-between">
								{mangas.data.map((manga) => (
									<Pressable
										key={manga.mal_id}
										onPress={() =>
											navigation.navigate('MangaStack', {
												screen: 'MangaDetails',
												params: { id: manga.mal_id },
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
												uri: manga.images.jpg.image_url,
											}}
										/>
										<View className="mt-2">
											<Text
												numberOfLines={1}
												style={{ fontFamily: font.quicksand.bold }}
												className="text-xs"
											>
												{manga.title}
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
													{manga.score ? manga.score : '-'}
												</Text>
											</View>
										</View>
									</Pressable>
								))}
							</View>
						) : (
							<Text className="text-center">No Completed Manga</Text>
						)}
					</>
				)}
			</View>
		</View>
	);
};

export default UpcomingManga;
