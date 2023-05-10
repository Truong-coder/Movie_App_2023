import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import {VideoPlayer} from './VideoPlayer';

export const VideoModal = ({playing, onClose, movieVideos}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={playing}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.background}>
          <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
            <VideoPlayer videoKey={movieVideos} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: '90%',
    height: '80%',
  },
});

export default VideoModal;
