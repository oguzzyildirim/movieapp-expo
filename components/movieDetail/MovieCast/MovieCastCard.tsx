import { View, Text, StyleSheet } from "react-native";
import { Image } from 'expo-image';

interface MovieCastCardProps {
  profilePath: string;
  name: string;
}

export default function MovieCastCard(props: MovieCastCardProps) {
    const blurhash =
  'LaL;mej[%Mj[~qj[ofj[%MfQM{fQ'
  return (
    <View style={styles.mainContainer}>
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMAGE_ORIGINAL_URL}/${props.profilePath}`,
        }}
        style={styles.image}
        placeholder={{ blurhash }}
        contentFit="cover"
      />
      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    width: 100,
    gap: 8,
    marginBottom: 24,
    marginLeft: '10%',
    //backgroundColor: 'green'
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },

  text: {
    color: "white",
    fontFamily: "Poppins",
    textAlign: 'center',
    fontSize: 14,
  },
});
