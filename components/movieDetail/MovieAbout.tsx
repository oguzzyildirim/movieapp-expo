import { View, Text, StyleSheet } from "react-native";

interface AboutTabProps {
    description: string
}

export default function About(props: AboutTabProps) {
    return (
        <View>
            <Text style={styles.text}>
            {props.description ?? "-"}
            </Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontFamily: 'Poppins',
        textAlign: 'left',
        fontSize: 14,
    }
})