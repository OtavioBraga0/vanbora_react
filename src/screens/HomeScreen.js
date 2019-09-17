import React, { useState } from 'react';
import {ScrollView, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import FirebaseService from "../../service/FirebaseService";

const HomeScreen = ({navigation}) => {
    const {dataList, setDataList} = useState();

    const init = async () => {
        const key = await AsyncStorage.getItem("@Usuario:key")
              
        if (key !== null) {
            FirebaseService.getDataWithKey('usuario', key, dataIn => {
                let nav = "Cadastro";
                
                if(dataIn.length != 0) {
                    if (dataIn[0].tipo == 'aluno') {
                        nav = "HomeAluno";
                    } else if (dataIn[0].tipo == 'motorista') {                        
                        nav = "HomeMotorista";                    
                    }
                }
                
                navigation.replace(nav)        
            });
        } else {
            navigation.replace("Cadastro");
        } 
    };

    init();
    return (
        <View>
            <ScrollView style={styles.margin10}>
                <View style={styles.header}><Text>React-Native App</Text></View>
                <View style={styles.fullWidth}>
                    {
                        dataList && dataList.map(
                            (item, index) => {
                                return (
                                    <View style={[styles.margin10, styles.item]} key={index} >
                                        <View style={{padding:10}}>
                                            <Text style={styles.listItemHeader}> Nome </Text>
                                            <Text style={styles.listItemText}> {item.nome} </Text>
                                            
                                            <Text style={styles.listItemHeader}> Telefone </Text>
                                            <Text style={styles.listItemText}> {item.telefone} </Text>
                                            
                                            <Text style={styles.listItemHeader}> Tipo </Text>
                                            <Text style={styles.listItemText}> {item.tipo} </Text>
                                        </View>
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

const styles = StyleSheet.create({
    margin10: {margin: 10},
    fullWidth: {flex: 1},
    header: { alignItems: 'flex-start',justifyContent: 'flex-start',height: 60,paddingTop: 20,paddingBottom: 20,flexDirection: 'row'},
    listItemText: {fontSize: 20, color: '#000000', marginBottom:10},
    listItemHeader: {fontSize: 10, color: '#000000'},
    item: {backgroundColor: '#c7c7c7', borderRadius: 20}
});

export default HomeScreen;