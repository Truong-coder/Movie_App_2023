import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

export const VideoPlayer = ({video}) => {
  const webViewRef = useRef(null);

  const onWebViewLoad = () => {
    webViewRef.current.injectJavaScript(`
      document.querySelector('video').play();
    `);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.video}
        source={{
          uri: `https://www.youtube.com/embed/${video.key}?playsinline=1`,
        }}
        allowsInlineMediaPlayback
        onLoad={onWebViewLoad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
});
