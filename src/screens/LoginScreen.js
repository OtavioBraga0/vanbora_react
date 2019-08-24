import React from 'react';
import { StyleSheet, View, Button } from "react-native";
import FirebaseService from "../../service/FirebaseService"

const LoginScreen = ({navigation}) => {
    return(
        <View style={styles.view}>
            <Button 
                title="Cadastrar"
                onPress={() => navigation.navigate("Cadastro")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        justifyContent: "center",
    }
});

export default LoginScreen;



