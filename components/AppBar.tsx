import React, { ReactElement } from 'react';
import { Pressable, Text } from 'react-native';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
	backAction: () => void;
	actions?: ReactElement;
}

const AppBar: React.FC<Props> = ({ backAction, actions }) => {
	return (
		<View className="flex-row justify-between items-center">
			<Pressable
				onPress={backAction}
				className="flex-row items-center active:bg-gray-300"
			>
				<MaterialIcons name="arrow-back-ios" size={24} color="black" />
				<Text>Back</Text>
			</Pressable>
			<View>{actions}</View>
		</View>
	);
};

export default AppBar;
