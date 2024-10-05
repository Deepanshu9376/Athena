import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import WebView from "react-native-webview";

const VideoPlayerScreen = ({ route }) => {
  const { videoUrl } = route.params;
  const [error, setError] = useState(false);

  const embedUrl = videoUrl.replace("watch?v=", "embed/") + "?controls=1&modestbranding=1&rel=0&showinfo=0";

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>An error occurred while playing the video. Please try again later.</Text>
      ) : (
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          source={{ uri: videoUrl }}
          style={styles.webview}
          onError={() => setError(true)} // Handle WebView errors
        />
      )}
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
  errorText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
