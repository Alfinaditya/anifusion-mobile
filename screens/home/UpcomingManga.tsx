import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { apiUrl } from '../../lib/consts';
import { cn } from '../../utils/tw';
import Mangas, { Manga } from '../../types/mangas';

interface Props {
  width: number;
}

const UpcomingManga: React.FC<Props> = ({ width }) => {
  const {
    isLoading,
    error,
    data: mangas,
  } = useQuery<Mangas, Error>({
    queryKey: ['upcomingManga'],
    queryFn: () =>
      fetch(`${apiUrl}/manga?status=upcoming&limit=15`).then((res) =>
        res.json()
      ),
  });
  const flatListRef = useRef<FlatList<Manga> | null>(null);

  const renderItem = ({ item }: { item: Manga }) => (
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
  // console.log(mangas);
  return (
    <>
      <Text className="ml-3 mb-4">Upcoming Manga</Text>
      {mangas.data.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={mangas.data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.mal_id.toString()}
        />
      ) : (
        <Text className="text-center">No Upcoming Manga</Text>
      )}
    </>
  );
};

export default UpcomingManga;
