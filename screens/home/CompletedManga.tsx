import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { apiUrl } from '../../lib/consts';
import { cn } from '../../utils/tw';
import Mangas from '../../types/mangas';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeStackParamList } from '../../stacks/HomeStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Skeleton } from 'moti/skeleton';
import font from '../../utils/font';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;
const CompletedManga: React.FC<Props> = ({ navigation, route }) => {
	const {
		isLoading,
		error,
		data: mangas,
	} = useQuery<Mangas, Error>({
		queryKey: ['completedManga'],
		queryFn: () =>
			axios
				.get(`${apiUrl}/manga?status=complete&limit=15`)
				.then((res) => res.data),
	});

	if (error) return <Text>{error.message}</Text>;

	return (
		<View className="justify-center items-center">
			<View className="w-[95%]">
				<Text
					style={{ fontFamily: font.quicksand.bold }}
					className="text-2xl mb-4"
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
						{mangas && mangas.data.length > 0 ? (
							<View className="flex-row flex-wrap justify-between">
								{mangas.data.map((manga) => (
									<Pressable
										key={manga.mal_id}
										onPress={() =>
											navigation.push('AnimeDetails', { id: manga.mal_id })
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
										<View className="mt-2 ">
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
							<Text className="text-center">No Completed Anime</Text>
						)}
					</>
				)}
			</View>
		</View>
	);
};

export default CompletedManga;
