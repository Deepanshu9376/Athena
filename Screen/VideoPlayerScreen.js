import React from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

const VideoPlayerScreen = ({ route }) => {
  const { videoUrl } = route.params;

  return (
    <View style={styles.container}>
        <WebView javaScriptEnabled={true} domStorageEnabled={true} source={{ uri: videoUrl }}/>
    </View>
  );
};

export default VideoPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
