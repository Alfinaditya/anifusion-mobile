import React, { useRef } from 'react';
import ICharacters, { CharacterData } from '../../types/characters';
import { useQuery } from '@tanstack/react-query';
import { apiUrl } from '../../lib/consts';
import { FlatList, Image, Text, View } from 'react-native';
import font from '../../utils/font';
import { Skeleton } from 'moti/skeleton';
import { randomUUID } from 'expo-crypto';

const Characters: React.FC<{ id: number }> = ({ id }) => {
	const API_URL = `${apiUrl}/anime/${id}/characters`;
	const flatListCharacter = useRef<FlatList<CharacterData> | null>(null);
	const flatListCharacterLoading = useRef<FlatList | null>(null);
	const {
		isLoading,
		error,
		data: characters,
	} = useQuery<ICharacters, Error>({
		queryKey: ['character', id],
		queryFn: () => fetch(API_URL).then((res) => res.json()),
	});
	const renderItemCharacter = ({ item }: { item: CharacterData }) => (
		<View>
			<Image
				resizeMode="cover"
				width={200}
				height={300}
				style={{ borderRadius: 10 }}
				source={{
					uri: item.character.images.jpg.image_url,
				}}
			/>
			<Text
				style={{ fontFamily: font.quicksand.bold }}
				className="w-[200px] mt-3"
			>
				{item.character.name}
			</Text>
			<Text>{item.role}</Text>
		</View>
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

	if (error) return <Text>{error.message}</Text>;
	return (
		<>
			{isLoading ? (
				<FlatList
					ref={flatListCharacterLoading}
					data={new Array(4)}
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
					ref={flatListCharacter}
					data={characters.data}
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

export default Characters;
