import { View, Text, StyleSheet } from "react-native";

interface UserCardProps {
  user: types.user.UserData;
}

export default function UserCard(props: UserCardProps) {

return ( 
    <View style={styles.mainContainer}>
      <Text style={styles.text}>
        {props.user.ID}
      </Text>
      <Text style={styles.text}>
        {props.user.Name}
      </Text>
      <Text style={styles.text}>
        {props.user.Surname}
      </Text>
      <Text style={styles.text}>
        {props.user.Age}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 24,
    backgroundColor: 'brown',
  },
})