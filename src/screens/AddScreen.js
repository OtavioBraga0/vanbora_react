import React, { useState } from "react";
import FirebaseService from "../../service/FirebaseService";
import { StyleSheet, View, Button, TextInput, Text } from "react-native";

const AddScreen = () => {
    const [temperatura, setTemperatura] = useState("");
    const [umidade, setUmidade] = useState("");
    const [data, setData] = useState("");
    const [cliente, setCliente] = useState("");

    submit = () => {
        const newid = FirebaseService.pushData('van', {
            temperatura,
            umidade,
            data,
            cliente
        });
    };
    return(
        <View>
            <TextInput
                style={styles.input}
                value={temperatura}
                required
                onChangeText={(value) => setTemperatura(value)}/>
            <TextInput
                style={styles.input}
                value={umidade}
                required
                onChangeText={(value) => setUmidade(value)}/>
            <TextInput
                style={styles.input}
                value={data}
                required
                onChangeText={(value) => setData(value)}/>
            <TextInput
                style={styles.input}
                value={cliente}
                required
                onChangeText={(value) => setCliente(value)}/>
            <Button 
                type="button"
                title="Add"
                onPress={() => submit()}
                style={{marginTop: '20px', display: 'inline-block'}} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 10,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "black",
        padding: 5,
    }
});

export default AddScreen;