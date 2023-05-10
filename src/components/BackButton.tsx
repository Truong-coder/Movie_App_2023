import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const BackButton = () => {
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    navigation.dispatch(CommonActions.goBack());
  }, [navigation]);

  return (
    <TouchableOpacity style={{ marginTop: 30}} onPress={handlePress}>
      <Ionicons name="arrow-back-outline" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default BackButton;
