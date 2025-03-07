// import {
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   Button,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import { Colors } from "@/constants/Colors";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { router, usePathname } from "expo-router";
// import { useEffect, useState, useCallback } from "react";
// import UserCard from "@/components/UserCard";
// import { GetAllUsers } from "@/data/api/user";

// export default function HomeScreen() {
//   const [name, setName] = useState<string>("Oğuz");
//   const [bgColor, setBgColor] = useState("blue");
//   const [users, setUsers] = useState<types.user.UserData[]>([]);
//   const path = usePathname();


//   /// use useCallBack in useEffect for memory optimization
//   useEffect(() => {
//     const getData = async () => {
//       const response = await GetAllUsers();
//       if (response) {
//         setUsers(response);
//       } else {
//         console.error("Error while fetching data");
//       }
//     };
//     getData();
//   }, []);

//   /// use flashlist
//   return (
//     <SafeAreaView>
//       <FlatList
//         data={users}
//         renderItem={({ item }) => <UserCard user={item} />}
//         keyExtractor={(item, index) => item.toString() + index}
//         contentContainerStyle={styles.viewContainer}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   viewContainer: {
//     gap: 12,
//     height: "100%",
//     width: "100%",
//     backgroundColor: 'brown',
//   },
//   closeButton: {
//     position: "absolute",
//     top: "4%",
//     right: "6%",
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 24,
//     backgroundColor: "red",
//     width: 52,
//     alignItems: "center",
//     padding: 8,
//     borderRadius: 8,
//   },
// });
