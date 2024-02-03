import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { AnimeStackParamList } from '../../../stacks/AnimeStack';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '../../../utils/tw';

import useAnimeStore from '../AnimeStore';
import AppBar from '../../../components/AppBar';
import font from '../../../utils/font';

type Props = NativeStackScreenProps<AnimeStackParamList, 'Filter'>;
const types = [
	{
		value: 'tv',
		label: 'TV',
	},
	{
		value: 'movie',
		label: 'Movie',
	},
	{
		value: 'ova',
		label: 'Ova',
	},
	{
		value: 'special',
		label: 'Special',
	},
	{
		value: 'ona',
		label: 'Ona',
	},
	{
		value: 'music',
		label: 'Music',
	},
];

const orderByData = [
	{
		value: 'title',
		label: 'Title',
	},
	{
		value: 'episodes',
		label: 'Episode',
	},
	{
		value: 'score',
		label: 'Score',
	},
	{
		value: 'favorites',
		label: 'Favorite',
	},
	{
		value: 'popularity',
		label: 'Popularity',
	},
];

const ratings = [
	{
		value: 'g',
		label: 'G - All Ages',
	},
	{
		value: 'pg',
		label: 'PG - Children',
	},
	{
		value: 'pg13',
		label: 'PG-13 - Teens 13 or older',
	},
	{
		value: 'r17',
		label: 'R - 17+ (violence & profanity)',
	},
	{
		value: 'r',
		label: 'R+ - Mild Nudity',
	},
	{
		value: 'rx',
		label: 'Rx - Hentai',
	},
];

const statuses = [
	{
		value: 'airing',
		label: 'Airing',
	},
	{
		value: 'complete',
		label: 'Complete',
	},
	{
		value: 'upcoming',
		label: 'Upcoming',
	},
];

const sorts = [
	{
		value: 'desc',
		label: 'Descending',
	},
	{
		value: 'asc',
		label: 'Ascending',
	},
];

interface FilterProps {
	label: string;
	value: string;
}
const FilterScreen: React.FC<Props> = ({ navigation, route }) => {
	const setFilterParams = useAnimeStore((state) => state.setFilterParams);
	const resetFilter = useAnimeStore((state) => state.resetFilter);
	const filterParams = useAnimeStore((state) => state.filterParams);
	const flatListTypeRef = useRef<FlatList<FilterProps> | null>(null);
	const flatListStatusRef = useRef<FlatList<FilterProps> | null>(null);
	const flatListRatingRef = useRef<FlatList<FilterProps> | null>(null);
	const flatListOrderByRef = useRef<FlatList<FilterProps> | null>(null);
	const flatListSortRef = useRef<FlatList<FilterProps> | null>(null);
	const [type, setType] = useState(filterParams.type);
	const [status, setStatus] = useState(filterParams.status);
	const [rating, setRating] = useState(filterParams.rating);
	const [orderBy, setOrderBy] = useState(filterParams.orderBy);
	const [sort, setSort] = useState(filterParams.sort);
	const isReadyToFilter = type || status || rating || orderBy || sort;

	const renderItemType = ({ item }: { item: FilterProps }) => (
		<FilterButton
			isActive={item.value === type}
			activeClassName="bg-secondary"
			onPress={() => setType(item.value)}
			label={item.label}
		/>
	);
	const renderItemStatus = ({ item }: { item: FilterProps }) => (
		<FilterButton
			isActive={item.value === status}
			activeClassName="bg-secondary"
			onPress={() => setStatus(item.value)}
			label={item.label}
		/>
	);
	const renderItemRating = ({ item }: { item: FilterProps }) => (
		<FilterButton
			isActive={item.value === rating}
			activeClassName="bg-secondary"
			onPress={() => setRating(item.value)}
			label={item.label}
		/>
	);
	const renderItemOrderBy = ({ item }: { item: FilterProps }) => (
		<FilterButton
			isActive={item.value === orderBy}
			activeClassName="bg-secondary"
			onPress={() => setOrderBy(item.value)}
			label={item.label}
		/>
	);
	const renderItemSort = ({ item }: { item: FilterProps }) => (
		<FilterButton
			isActive={item.value === sort}
			activeClassName="bg-secondary"
			onPress={() => setSort(item.value)}
			label={item.label}
		/>
	);
	function handleReset() {
		setType('');
		setStatus('');
		setRating('');
		setOrderBy('');
		setSort('');
		resetFilter();
	}
	function handleSubmit() {
		if (isReadyToFilter) {
			setFilterParams({
				type,
				status,
				rating,
				orderBy,
				sort,
			});
			return navigation.push('Anime');
		}
	}
	return (
		<SafeAreaView>
			<View className="mx-3">
				<AppBar
					backAction={() => {
						navigation.goBack();
					}}
					actions={
						<>
							<Pressable
								className="active:bg-gray-300"
								onPress={() => isReadyToFilter && handleReset()}
							>
								<Text
									style={{ fontFamily: 'Quicksand_700Bold' }}
									className={cn(
										'font-bold',
										isReadyToFilter ? 'text-main' : 'text-gray-500'
									)}
								>
									Reset
								</Text>
							</Pressable>
						</>
					}
				/>
			</View>
			<View className="flex-row gap-x-2 mt-5">
				<ScrollView>
					<Text className="mb-4 ml-4">Type</Text>
					<View>
						<FlatList
							ref={flatListTypeRef}
							data={types}
							horizontal
							pagingEnabled
							showsHorizontalScrollIndicator={false}
							renderItem={renderItemType}
							keyExtractor={(item) => item.value}
						/>
					</View>
					<View>
						<Text className="mb-4 ml-4">Status</Text>
						<FlatList
							ref={flatListStatusRef}
							data={statuses}
							horizontal
							pagingEnabled
							showsHorizontalScrollIndicator={false}
							renderItem={renderItemStatus}
							keyExtractor={(item) => item.value}
						/>
					</View>
					<View>
						<Text className="mb-4 ml-4">Rating</Text>
						<FlatList
							ref={flatListRatingRef}
							data={ratings}
							horizontal
							pagingEnabled
							showsHorizontalScrollIndicator={false}
							renderItem={renderItemRating}
							keyExtractor={(item) => item.value}
						/>
					</View>
					<View>
						<Text className="mb-4 ml-4">Order By</Text>
						<FlatList
							ref={flatListOrderByRef}
							data={orderByData}
							horizontal
							pagingEnabled
							showsHorizontalScrollIndicator={false}
							renderItem={renderItemOrderBy}
							keyExtractor={(item) => item.value}
						/>
					</View>
					<View>
						<Text className="mb-4 ml-4">Sort</Text>
						<FlatList
							ref={flatListSortRef}
							data={sorts}
							horizontal
							pagingEnabled
							showsHorizontalScrollIndicator={false}
							renderItem={renderItemSort}
							keyExtractor={(item) => item.value}
						/>
					</View>
				</ScrollView>
			</View>
			<View className="mx-3">
				<Pressable
					onPress={handleSubmit}
					className={cn(
						'w-full mt-10  rounded-xl h-12 px-4 active:bg-main/80 ',
						isReadyToFilter ? 'bg-main' : 'bg-gray-300'
					)}
					disabled={!isReadyToFilter}
				>
					<Text
						style={{ fontFamily: 'Quicksand_700Bold' }}
						className="text-white text-center m-auto"
					>
						Submit
					</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};
const FilterButton: React.FC<{
	label: string;
	onPress: () => void;
	isActive: boolean;
	activeClassName: string;
}> = ({ label, onPress, isActive, activeClassName }) => {
	return (
		<Pressable
			onPress={onPress}
			className={cn(
				'bg-main min-w-[71px] flex-row items-center w-min self-start rounded-full mb-2 h-12 mr-2 px-4 active:bg-main/80',
				isActive && activeClassName
			)}
		>
			<Text
				style={{ fontFamily: font.quicksand.medium }}
				className="text-white text-center m-auto"
			>
				{label}
			</Text>
		</Pressable>
	);
};
export default FilterScreen;
