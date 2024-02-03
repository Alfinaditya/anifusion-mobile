import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import Animes, { Anime } from '../../types/animes';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { apiUrl } from '../../lib/consts';
import { cn } from '../../utils/tw';

interface Props {
  width: number;
}

const CompletedAnime: React.FC<Props> = ({ width }) => {
  const {
    isLoading,
    error,
    data: animes,
  } = useQuery<Animes, Error>({
    queryKey: ['completedAnime'],
    queryFn: () =>
      fetch(`${apiUrl}/anime?status=complete&limit=15`).then((res) =>
        res.json()
      ),
  });
  const flatListRef = useRef<FlatList<Anime> | null>(null);

  const renderItem = ({ item }: { item: Anime }) => (
    <TouchableOpacity className={cn('items-center')} style={{ width: width }}>
      <Image
        resizeMode="cover"
        width={150}
        height={180}
        source={{
          uri: item.images.jpg.image_url,
        }}
      />
      <View className="mt-2 w-[150px]">
        <Text numberOfLines={2} className="text-xs">
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) return <Text>Loading</Text>;

  if (error) return <Text>{error.message}</Text>;
  return (
    <>
      <Text className="ml-3 mb-4">Completed Anime</Text>
      {animes.data.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={animes.data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.mal_id.toString()}
        />
      ) : (
        <Text className="text-center">No Completed Anime</Text>
      )}
    </>
  );
};

export default CompletedAnime;
