import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import FirebaseService from "../service/FirebaseService";

const styles = StyleSheet.create({
    margin10: { margin: 10 },
    fullWidth: { flex: 1 },
    header: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 60,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row'
    },
    listItemText: { fontSize: 20, color: '#000000', marginBottom: 10 },
    listItemHeader: { fontSize: 10, color: '#000000' },
    item: { backgroundColor: '#c7c7c7', borderRadius: 20 }

});

export default class HomeScreen extends React.Component {
    navigation = this.props.navigation;

    debug = true;

    async componentDidMount() {
        const key = await AsyncStorage.getItem("@Usuario:key")

        if (!this.debug) {
            if (key !== null) {
                FirebaseService.getDataWithKey('usuario', key, dataIn => {
                    let nav = "Cadastro";

                    if (dataIn.length != 0) {
                        if (dataIn[0].tipo == 'aluno') {
                            nav = "HomeAluno";
                        } else if (dataIn[0].tipo == 'motorista') {
                            nav = "HomeMotorista";
                        }
                    }

                    this.navigation.replace(nav)
                });
            } else {
                await AsyncStorage.setItem("@Usuario:key", key);
                this.navigation.replace("Cadastro");
            }
        }
    };

    async loginDebug(key) {
        await AsyncStorage.setItem("@Usuario:key", key);
        FirebaseService.getDataWithKey('usuario', key, dataIn => {

            if (dataIn.length != 0) {
                if (dataIn[0].tipo == 'aluno') {
                    nav = "HomeAluno";
                } else if (dataIn[0].tipo == 'motorista') {
                    nav = "HomeMotorista";
                }
            }

            this.navigation.replace(nav)
        });
    }

    render() {
        return (
            <View>
                <ScrollView style={styles.margin10}>
                    <View style={styles.header}><Text>React-Native App</Text></View>
                    <Button title="Aluno DEBUG" onPress={() => this.loginDebug("-Lpewiw7I6Rn7czFHdER")} />
                    <Button title="Motorista DEBUG" onPress={() => this.loginDebug("-LpewcZqNmmYm1j2xbsi")} />
                    <Button title="Cadastro DEBUG" onPress={() => this.navigation.navigate("Cadastro")} />
                </ScrollView>
            </View>
        );
    }
}
