import { View, Text, Pressable, StyleSheet } from "react-native";

function PrimaryButton({ children, onPress }) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                pressed
                    ? [styles.buttonInnerContainer, styles.pressed]
                    : styles.buttonInnerContainer
                }
                onPress={onPress}
                android_ripple={{ color: "#242D34" }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        marginTop: 20,
        overflow: "hidden",
    },
    buttonInnerContainer: {
        height: 75,
        width: 200,
        backgroundColor: "#50575D",
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        flex: 1,
        color: "white",
        fontSize: 36,
        textAlign: "center",
        textAlignVertical: "center"
    },
    pressed: {
        opacity: 0.75,
    },        
});
