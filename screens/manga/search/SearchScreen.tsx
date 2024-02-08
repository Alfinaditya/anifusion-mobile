import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign, Feather } from '@expo/vector-icons';
import db from '../../../lib/db';
import useMangaStore from '../MangaStore';
import { MangaStackParamList } from '../../../stacks/MangaStack';
import { cn } from '../../../utils/tw';

interface Search {
	id: number;
	query: string;
	type: 'MANGA';
}

type Props = NativeStackScreenProps<MangaStackParamList, 'MangaSearch'>;
const SearchScreen: React.FC<Props> = ({ navigation }) => {
	const setQuery = useMangaStore((state) => state.setQuery);
	const query = useMangaStore((state) => state.query);
	const [searchList, setSearchList] = useState<Search[] | undefined>();

	useEffect(() => {
		initTable();
		fetchSearch();
	}, []);

	async function initTable() {
		await db.transactionAsync(async (tx) => {
			await tx.executeSqlAsync(
				'CREATE TABLE IF NOT EXISTS search (id INTEGER PRIMARY KEY AUTOINCREMENT, query TEXT NOT NULL, type varchar(20) NOT NULL)',
				[]
			);
		});
	}
	async function fetchSearch() {
		const readOnly = true;
		await db.transactionAsync(async (tx) => {
			const result = await tx.executeSqlAsync(
				'SELECT * FROM search where type = (?)',
				['MANGA']
			);
			setSearchList(result.rows as any);
		}, readOnly);
	}
	async function handleSubmit(val: string) {
		await db.transactionAsync(async (tx) => {
			const result = await tx.executeSqlAsync(
				'INSERT INTO search (query, type) VALUES (?, ?)',
				[val, 'MANGA']
			);
		});

		setQuery({ query: val });
		navigation.push('Manga');
	}

	function handleCurrentSearch(val: string) {
		setQuery({ query: val });
		navigation.push('Manga');
	}
	async function handleDeleteSearchResult(id: number) {
		await db.transactionAsync(async (tx) => {
			const result = await tx.executeSqlAsync(
				'DELETE FROM search where id = (?)',
				[id]
			);
			const refetch = await tx.executeSqlAsync(
				'SELECT * FROM search where type = (?)',
				['MANGA']
			);
			setSearchList(refetch.rows as any);
		});
	}

	return (
		<SafeAreaView>
			<View className="px-3">
				<View className={cn('mb-2', 'w-full')}>
					<View className={cn('flex-row items-center', 'mb-4')}>
						<Pressable
							onPress={() => navigation.goBack()}
							className={cn('active:bg-gray-300', 'mr-3')}
						>
							<AntDesign name="arrowleft" size={24} color="black" />
						</Pressable>
						<View className={cn('relative', 'flex-1')}>
							<View
								className={cn(
									'absolute top-[25%] left-1 z-10',
									'flex items-center',
									'pointer-events-none'
								)}
							>
								<Ionicons
									name={'ios-search-outline'}
									size={24}
									color={'#E46295'}
								/>
							</View>
							<TextInput
								className={cn(
									'block',
									'w-full',
									'p-4 pl-10',
									'text-sm text-gray-900',
									'border border-gray-300 rounded-lg',
									'bg-gray-50',
									'focus:ring-main focus:border-main'
								)}
								placeholder="Search Manga"
								defaultValue={query}
								onSubmitEditing={(e) => handleSubmit(e.nativeEvent.text)}
							/>
						</View>
					</View>
					{searchList &&
						searchList.length > 0 &&
						searchList.map((search) => (
							<View
								className={cn('flex-row justify-between', 'mb-2')}
								key={search.id}
							>
								<Pressable
									className="active:bg-gray-200"
									onPress={() => handleCurrentSearch(search.query)}
								>
									<Text>{search.query}</Text>
								</Pressable>
								<Feather
									onPress={() => handleDeleteSearchResult(search.id)}
									name="x"
									size={24}
									color="grey"
								/>
							</View>
						))}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SearchScreen;
