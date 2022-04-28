import { NativeModules } from "react-native";

let segmentClient;

export function getClient() {
  // Bail out early if we already have a client or there is no native module
  if (segmentClient || !NativeModules.AnalyticsReactNative) {
    return segmentClient;
  }

  // Use inline require to avoid loading the module if the native module isn't available
  const { createClient } = require("@segment/analytics-react-native").default;
  segmentClient = createClient({
    writeKey: "SEGMENT_API_KEY",
  });
}

export function identify(options) {
  const client = getClient();

  // Bail out and log info if we don't have a Segment client available (in Expo Go)
  if (!client) {
    console.log(
      `[analytics] identify called with options: ${JSON.stringify(options)}`
    );
    return;
  }

  return client.identify(options);
}
