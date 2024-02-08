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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Skeleton } from 'moti/skeleton';
import { randomUUID } from 'expo-crypto';
import { MangaStackParamList } from '../../stacks/MangaStack';
import { cn } from '../../utils/tw';

type Props = NativeStackScreenProps<MangaStackParamList, 'MangaDetails'>;
const Recommendations: React.FC<Props & { id: number }> = ({
	id,
	navigation,
}) => {
	const API_URL = `${apiUrl}/manga/${id}/recommendations`;
	const flatListRecommendation = useRef<FlatList<RecommendationsData> | null>(
		null
	);
	const flatListRecommendationLoading = useRef<FlatList | null>(null);
	const {
		isLoading,
		error,
		data: recommendations,
	} = useQuery<IRecommendations, Error>({
		queryKey: ['recommendation', id],
		queryFn: () => fetch(API_URL).then((res) => res.json()),
	});

	if (error) return <Text>{error.message}</Text>;

	const renderItemCharacter = ({ item }: { item: RecommendationsData }) => (
		<Pressable
			className="active:opacity-[0.5]"
			onPress={() => navigation.push('MangaDetails', { id: item.entry.mal_id })}
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
				className={cn('w-[200px]', 'mt-3')}
			>
				{item.entry.title}
			</Text>
			<View className={cn('flex-row items-center', 'mt-2')}>
				<MaterialCommunityIcons
					name="thumb-up-outline"
					size={24}
					color="#E46295"
				/>
				<Text className="ml-2">{item.votes}</Text>
			</View>
		</Pressable>
	);

	const renderItemCharacterLoading = () => (
		<View>
			<View>
				<Skeleton width={200} height={300} colorMode="light" />
			</View>
			<View className="mt-4 mb-3">
				<Skeleton width={180} height={30} colorMode="light" />
			</View>
			<View>
				<Skeleton width={80} height={30} colorMode="light" />
			</View>
		</View>
	);

	return (
		<>
			{isLoading ? (
				<FlatList
					ref={flatListRecommendationLoading}
					data={new Array(6)}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					renderItem={renderItemCharacterLoading}
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
					keyExtractor={() => randomUUID()}
				/>
			) : (
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
					keyExtractor={() => randomUUID()}
				/>
			)}
		</>
	);
};

export default Recommendations;
