import { useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import MovieCategories from "./MovieCategories";

export default function HomeTabs() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "First", title: "Now playing" },
    { key: "Second", title: "Up coming" },
    { key: "Third", title: "Top rated" },
    { key: "Fourth", title: "Popular" },
  ]);

  const NowPlayingRoute = () => (
    <View style={styles.tabContent}>
      <MovieCategories categoryType={'now_playing'} />
    </View>
  );

  const UpComingRoute = () => (
    <View style={styles.tabContent}>
      <MovieCategories categoryType={'upcoming'} />
    </View>
  );

  const TopRatedRoute = () => (
    <View style={styles.tabContent}>
      <MovieCategories categoryType={'top_rated'} />
    </View>
  );

  const PopularRoute = () => (
    <View style={styles.tabContent}>
      <MovieCategories categoryType={'popular'} />
    </View>
  );

  const renderScene = SceneMap({
    First: NowPlayingRoute,
    Second: UpComingRoute,
    Third: TopRatedRoute,
    Fourth: PopularRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={styles.tab}
      indicatorStyle={styles.tabIndicatorStyle}
      tabStyle={styles.tabStyle}
      scrollEnabled={true}
      gap={10}
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={styles.tabView}
        pagerStyle={styles.pagerStyle}
        lazy
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  tabView: {
    flex: 1,
  },
  tab: {
    backgroundColor: "transparent",
  },
  tabIndicatorStyle: {
    backgroundColor: "#3A3F47",
    height: 3,
  },

  tabStyle: {
    width: "auto",
    minHeight: 30,
    padding: 0,
  },
  pagerStyle: {
    paddingVertical: 20,
  },
  tabContent: {
    flex: 1,
  },
});
