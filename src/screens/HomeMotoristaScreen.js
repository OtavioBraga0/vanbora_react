import React, { Component } from "react";
import { StyleSheet, View, Button, Text, ScrollView, AsyncStorage, TouchableOpacity } from "react-native";
import FirebaseService from "../service/FirebaseService";
import { FontAwesome } from "@expo/vector-icons";

export default class HomeMotoristaScreen extends Component {
    state = {
        dataList: null,
    };

    static navigationOptions = ({ navigation }) => {
        perfil = () => {
            navigation.navigate("Perfil")
        }

        return {
            title: 'Home - Motorista',
            headerRight: (
                <TouchableOpacity onPress={() => perfil()} style={{marginRight: 30}}>
                    <FontAwesome name="user" size={30}/>
                </TouchableOpacity>
            ),
        };
    };

    async componentDidMount() {
        const key = await AsyncStorage.getItem("@Usuario:key");
        FirebaseService.getDataWithChild('grupo', 'motoristaId', key, dataIn => this.setState({dataList: dataIn}));
    };

    render() {
        const {dataList} = this.state;
        const {navigate} = this.props.navigation;

        return(
            <View>
                <Button
                    title="Criar Grupo"
                    onPress={() => navigate("CadastroGrupo")}
                />
                <ScrollView>
                    <View style={styles.fullWidth}>
                        {
                            dataList && dataList.map(
                                (item, index) => {
                                    return (
                                        <View style={[styles.margin10, styles.item]} key={index}>
                                            <TouchableOpacity onPress={() => navigate("Grupo", {grupoId: item.key})}>
                                                <View style={{padding:10}}>
                                                    <Text style={styles.listItemHeader}> Nome </Text>
                                                    <Text style={styles.listItemText}> {item.nome} </Text>

                                                    <Text style={styles.listItemHeader}> Período </Text>
                                                    <Text style={styles.listItemText}> {item.periodo} </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }
                            )
                        }
    
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    margin10: {margin: 10},
    fullWidth: {flex: 1},
    header: {alignItems: 'flex-start', justifyContent: 'flex-start', height: 60, paddingTop: 20, paddingBottom: 20, flexDirection: 'row'},
    listItemText: {fontSize: 20, color: '#000000', marginBottom:10},
    listItemHeader: {fontSize: 10, color: '#000000'},
    item: {backgroundColor: '#c7c7c7', borderRadius: 20},
});