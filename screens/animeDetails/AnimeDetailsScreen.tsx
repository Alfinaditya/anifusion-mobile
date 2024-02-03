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
import { Anime, AnimeDetails, AnimeGenre } from '../../types/animes';
import YoutubePlayer from 'react-native-youtube-iframe';
import ImageView from 'react-native-image-viewing';
import Characters from './Characters';
import Recommendations from './Recommendations';
import AppBar from '../../components/AppBar';
import { cn } from '../../utils/tw';
import font from '../../utils/font';

type Props = NativeStackScreenProps<AnimeStackParamList, 'AnimeDetails'>;

const AnimeDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
	const flatListGenre = useRef<FlatList<AnimeGenre> | null>(null);
	const API_URL = `${apiUrl}/anime/${route.params.id}`;
	const [showPreviewImage, setShowPreviewImage] = useState(false);
	const {
		isLoading,
		error,
		data: anime,
	} = useQuery<AnimeDetails, Error>({
		queryKey: ['anime'],
		queryFn: () => fetch(API_URL).then((res) => res.json()),
	});
	if (isLoading) return <Text>Loading</Text>;

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
	console.log(anime);
	return (
		<SafeAreaView>
			<ScrollView>
				<View className="mx-3 mb-3">
					<AppBar
						backAction={() => {
							navigation.navigate('Anime');
						}}
					/>
				</View>
				<Text
					style={{ fontFamily: font.quicksand.bold }}
					className={cn('font-medium', ' text-3xl text-center', 'mb-5')}
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
						style={{ width: '95%', alignSelf: 'center' }}
						source={{
							uri: anime.data.images.jpg.large_image_url,
						}}
					/>
				</Pressable>
				<View className="bg-main p-4 mt-2 mx-3 rounded-xl">
					<Text
						style={{ fontFamily: font.quicksand.medium }}
						className="text-white text-center text-xl"
					>
						Score
					</Text>
				</View>
				<Text
					style={{ fontFamily: font.quicksand.bold }}
					className={cn('text-center text-4xl', 'mt-3', 'mb-5')}
				>
					{anime.data.score}
				</Text>

				<YoutubePlayer
					height={300}
					play={true}
					videoId={anime.data.trailer.youtube_id}
				/>
				<Text className="mx-2">{anime.data.synopsis}</Text>
				<FlatList
					ref={flatListGenre}
					data={anime.data.genres}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					renderItem={renderItemGenre}
					keyExtractor={(item) => item.name}
				/>
				<Text
					style={{ fontFamily: font.quicksand.semiBold }}
					className="mt-10 mb-8 ml-2 text-2xl"
					numberOfLines={2}
				>
					Characters
				</Text>
				<Characters id={route.params.id} />
				<Text
					style={{ fontFamily: font.quicksand.semiBold }}
					className="mt-10 mb-8 ml-2 text-2xl"
					numberOfLines={2}
				>
					Recommendations
				</Text>
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
