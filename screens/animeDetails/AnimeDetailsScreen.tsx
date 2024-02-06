import React, { useRef, useState } from 'react';
import {
	FlatList,
	Image,
	Pressable,
	ScrollView,
	Text,
	View,
} from 'react-native';
import { AnimeStackParamList } from '../../stacks/AnimeStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiUrl } from '../../lib/consts';
import { useQuery } from '@tanstack/react-query';
import { AnimeDetails, AnimeGenre } from '../../types/animes';
import YoutubePlayer from 'react-native-youtube-iframe';
import ImageView from 'react-native-image-viewing';
import Characters from './Characters';
import Recommendations from './Recommendations';
import AppBar from '../../components/AppBar';
import { cn } from '../../utils/tw';
import font from '../../utils/font';
import axios from 'axios';
import { Skeleton } from 'moti/skeleton';
import { randomUUID } from 'expo-crypto';

type Props = NativeStackScreenProps<AnimeStackParamList, 'AnimeDetails'>;

const AnimeDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
	const flatListGenre = useRef<FlatList<AnimeGenre> | null>(null);
	const flatListGenreLoading = useRef<FlatList | null>(null);
	const API_URL = `${apiUrl}/anime/${route.params.id}`;
	const [showPreviewImage, setShowPreviewImage] = useState(false);
	const {
		isLoading,
		error,
		data: anime,
	} = useQuery<AnimeDetails, Error>({
		queryKey: [`anime`, route.params.id],
		queryFn: () => axios.get(API_URL).then((res) => res.data),
	});

	if (error) return <Text>{error.message}</Text>;

	const renderItemGenre = ({ item }: { item: AnimeGenre }) => (
		<View className="bg-main flex-1 min-w-[71px] flex-row items-center m-auto self-start rounded-full h-10 mr-2 mt-4 px-4 active:bg-main/80">
			<Text
				style={{ fontFamily: font.quicksand.medium }}
				className="text-white text-center m-auto"
			>
				{item.name}
			</Text>
		</View>
	);
	const renderItemGenreLoading = () => (
		<View className="mb-5 mr-2">
			<Skeleton radius={'round'} width={90} height={40} colorMode="light" />
		</View>
	);

	return (
		<SafeAreaView>
			<ScrollView>
				<View className="justify-center items-center">
					<View className="w-[95%]">
						<View>
							<AppBar
								backAction={() => {
									navigation.goBack();
								}}
							/>
						</View>
						{isLoading ? (
							<>
								<View className="mb-5 mt-5">
									<Skeleton width={'100%'} height={40} colorMode="light" />
								</View>
								<View className="mb-5">
									<Skeleton width={'100%'} height={500} colorMode="light" />
								</View>
								<View className="mb-3">
									<Skeleton width={'100%'} height={70} colorMode="light" />
								</View>
								<View className="justify-center items-center mb-5">
									<Skeleton width={'60%'} height={60} colorMode="light" />
								</View>
								<View className="justify-center items-center mb-5">
									<Skeleton width={'100%'} height={300} colorMode="light" />
								</View>
								<View className="justify-center items-center mb-5">
									<Skeleton width={'100%'} height={30} colorMode="light" />
								</View>
								<View className="mb-5">
									<Skeleton width={'70%'} height={30} colorMode="light" />
								</View>
								<View className="mb-5">
									<Skeleton width={'96%'} height={30} colorMode="light" />
								</View>

								<FlatList
									ref={flatListGenreLoading}
									data={new Array(6)}
									renderItem={renderItemGenreLoading}
									horizontal
									pagingEnabled
									showsHorizontalScrollIndicator={false}
									keyExtractor={() => randomUUID()}
								/>
							</>
						) : (
							<>
								<Text
									style={{ fontFamily: font.quicksand.bold }}
									className={cn(
										'font-medium',
										' text-3xl text-center',
										'mb-5',
										'mt-5'
									)}
								>
									{anime.data.title}
								</Text>
								<ImageView
									images={[{ uri: anime.data.images.jpg.large_image_url }]}
									imageIndex={0}
									visible={showPreviewImage}
									onRequestClose={() => setShowPreviewImage(false)}
								/>
								<Pressable onPress={() => setShowPreviewImage(true)}>
									<Image
										resizeMode="stretch"
										height={500}
										style={{ width: '100%', alignSelf: 'center' }}
										source={{
											uri: anime.data.images.jpg.large_image_url,
										}}
									/>
								</Pressable>
								<View className="bg-main p-4 mt-5 mb-3 rounded-xl">
									<Text
										style={{ fontFamily: font.quicksand.medium }}
										className="text-white text-center text-xl"
									>
										Score
									</Text>
								</View>
								<Text
									style={{ fontFamily: font.quicksand.bold }}
									className={cn('text-center text-4xl', 'mb-5')}
								>
									{anime.data.score}
								</Text>

								<YoutubePlayer
									height={300}
									play={true}
									videoId={anime.data.trailer.youtube_id}
								/>
								<Text>{anime.data.synopsis}</Text>
							</>
						)}
					</View>
				</View>
				{!isLoading && (
					<FlatList
						ref={flatListGenre}
						data={anime.data.genres}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						renderItem={renderItemGenre}
						keyExtractor={(item) => item.name}
					/>
				)}
				<View className="justify-center items-center mt-10 mb-8">
					<View className="w-[95%]">
						<Text
							style={{ fontFamily: font.quicksand.semiBold }}
							className="text-2xl"
							numberOfLines={2}
						>
							Characters
						</Text>
					</View>
				</View>
				<Characters id={route.params.id} />
				<View className="justify-center items-center mt-10 mb-8">
					<View className="w-[95%]">
						<Text
							style={{ fontFamily: font.quicksand.semiBold }}
							className=" text-2xl"
							numberOfLines={2}
						>
							Recommendations
						</Text>
					</View>
				</View>
				<Recommendations
					navigation={navigation}
					route={route}
					id={route.params.id}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AnimeDetailsScreen;
