import React, { useRef } from 'react';
import ICharacters, { CharacterData } from '../../types/characters';
import { useQuery } from '@tanstack/react-query';
import { apiUrl } from '../../lib/consts';
import { FlatList, Image, Text, View } from 'react-native';
import font from '../../utils/font';

const Characters: React.FC<{ id: number }> = ({ id }) => {
	const API_URL = `${apiUrl}/anime/${id}/characters`;
	const flatListCharacter = useRef<FlatList<CharacterData> | null>(null);
	const {
		isLoading,
		error,
		data: characters,
	} = useQuery<ICharacters, Error>({
		queryKey: ['character'],
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
	if (isLoading) return <Text>Loading</Text>;

	if (error) return <Text>{error.message}</Text>;
	return (
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
			keyExtractor={(item) => item.character.name}
		/>
	);
};

export default Characters;
