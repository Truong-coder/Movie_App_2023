import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {MovieTrailers, VideoKey} from '../../types/MoviesDB';
import YoutubeIframe from 'react-native-youtube-iframe';

export const VideoPlayer = ({videoKey}) => {

  console.log('Video key: ', videoKey);

  // Video Player
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  // const renderItem = ({item}: {item: VideoKey}) => {
  //   // const key = item.key;
  //   // console.log('key:', key);

  //   return (
  //     // <YoutubeIframe
  //     //   height={250}
  //     //   play={playing}
  //     //   videoId={item.key}
  //     //   onChangeState={onStateChange}
  //     // />
  //     <YoutubePlayer
  //     height={300}
  //     play={playing}
  //     videoId={item.key}
  //     onChangeState={onStateChange}
  //   />
  //   );
  // };

  return (
    <View>
      {/* <FlatList
        data={[videoKey]} // wrap videoKey in an array
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
      /> */}
      <YoutubeIframe
        height={250}
        play={playing}
        videoId={videoKey}
        webViewProps={{androidLayerType: 'hardware'}}
        onChangeState={onStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoPlayer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
