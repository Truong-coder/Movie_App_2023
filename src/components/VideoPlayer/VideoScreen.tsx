import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import VideoModal from './VideoModal';

export const VideoScreen = movieVideos => {
  const [playing, setPlaying] = useState(false);
//   const [videoKey, setVideoKey] = useState('');

//   const handlePlay = videoId => {
//     setPlaying(true);
//     setVideoKey(videoId);
//   };

//   const handleStateChange = state => {
//     if (state === 'ended') {
//       setPlaying(false);
//     }
//   };

  const handleClose = () => {
    setPlaying(false);
    // setVideoKey('');
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Play Video 1" onPress={() => handlePlay('UJZx8MayWxk')} />
      <Button title="Play Video 2" onPress={() => handlePlay('ThseAPVAtMQ')} /> */}
      {/* Add more buttons to play other videos */}
      <VideoModal
        playing={playing}
        onClose={handleClose}
        movieVideos={movieVideos}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VideoScreen;
