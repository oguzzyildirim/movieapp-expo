import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import {
  TabView,
  SceneMap,
  TabBar,
} from "react-native-tab-view";
import MovieAbout from "../MovieDetail/MovieAbout";
import MovieCast from "../MovieDetail/MovieCast/MovieCast";

interface MovieDetailTabsProps {
  movieID: string;
  description: string;
  isMovieDetailLoaded: boolean;
}  

export default function MovieDetailTabs(props: MovieDetailTabsProps) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "First", title: "About Movie" },
    { key: "Second", title: "Reviews" },
    { key: "Third", title: "Cast" },
  ]);

  const AboutRoute = () => <MovieAbout description={props.description} />;

  const ReviewsRoute = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No reviews yet</Text>
    </View>
  );

  const CastRoute = () => (
    <MovieCast movieID={props.movieID} />
  );

  const renderScene = SceneMap({
    First: AboutRoute,
    Second: ReviewsRoute,
    Third: CastRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={styles.tab}
      indicatorStyle={styles.tabIndicatorStyle}
      labelStyle={styles.tabLabelStyle}
    />
  );

  if (!props.isMovieDetailLoaded) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Loading movie details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={styles.tabView}
        pagerStyle={{paddingVertical: 28}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView: {
    flex: 1,
  },
  tab: {
    backgroundColor: "clear",
  },
  tabIndicatorStyle: {
    backgroundColor: "#3A3F47",
    height: 3,
  },
  tabLabelStyle: {
    color: "white",
    fontWeight: "bold",
  },
  emptyContainer: {
  },
  emptyText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Poppins",
  },
});
