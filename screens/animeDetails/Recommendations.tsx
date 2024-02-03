import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { apiUrl } from '../../lib/consts';
import { FlatList, Pressable, Text } from 'react-native';
import IRecommendations, {
	RecommendationsData,
} from '../../types/recommendations';
import { Image } from 'react-native';
import { View } from 'react-native';
import font from '../../utils/font';
import { Feather } from '@expo/vector-icons';
import { AnimeStackParamList } from '../../stacks/AnimeStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<AnimeStackParamList, 'AnimeDetails'>;
const Recommendations: React.FC<Props & { id: number }> = ({
	id,
	navigation,
}) => {
	const API_URL = `${apiUrl}/anime/${id}/recommendations`;
	const flatListRecommendation = useRef<FlatList<RecommendationsData> | null>(
		null
	);
	const {
		isLoading,
		error,
		data: recommendations,
	} = useQuery<IRecommendations, Error>({
		queryKey: ['recommendation'],
		queryFn: () => fetch(API_URL).then((res) => res.json()),
	});
	if (isLoading) return <Text>Loading</Text>;

	if (error) return <Text>{error.message}</Text>;

	const renderItemCharacter = ({ item }: { item: RecommendationsData }) => (
		<Pressable
			className="active:bg-gray-200"
			onPress={() => navigation.push('AnimeDetails', { id: item.entry.mal_id })}
		>
			<Image
				resizeMode="cover"
				width={200}
				height={300}
				style={{ borderRadius: 10 }}
				source={{
					uri: item.entry.images.jpg.image_url,
				}}
			/>
			<Text
				style={{ fontFamily: font.quicksand.bold }}
				className="w-[200px] mt-3"
			>
				{item.entry.title}
			</Text>
			<View className="flex-row items-center mt-2">
				<Feather name="thumbs-up" size={20} color="#E4629" />
				<Text className="ml-2">{item.votes}</Text>
			</View>
		</Pressable>
	);

	return (
		<FlatList
			ref={flatListRecommendation}
			data={recommendations.data}
			horizontal
			pagingEnabled
			showsHorizontalScrollIndicator={false}
			renderItem={renderItemCharacter}
			ItemSeparatorComponent={() => {
				return (
					<View
						style={{
							height: '100%',
							width: 10,
						}}
					/>
				);
			}}
			keyExtractor={(item) => item.entry.title}
		/>
	);
};

export default Recommendations;
