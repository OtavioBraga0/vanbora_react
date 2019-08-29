import React, {Component} from "react";
import {StyleSheet, View, Text, ScrollView, Button, FlatList} from "react-native";
import FirebaseService from "../../service/FirebaseService";

export default class ListagemAlunosScreen extends Component {
    state = {
        dataList: null,
    }

    static navigationOptions = {
        title: "Grupo",
    };

    getUpdateList(){
        console.log("getUpdateList")
        FirebaseService.getDataWithChild('grupo-aluno', 'grupoId', this.props.navigation.getParam("grupoId"), dataIn => {
            dataIn.forEach(usuario => {                
                FirebaseService.getDataWithKey(
                    'usuario', 
                    usuario.alunoId, 
                    dataIn => {
                        this.setState({ dataList: this.state.dataList.concat(dataIn)})
                    });
            });
        });
    }

    componentDidMount() {
        this.setState({dataList: []})
        FirebaseService.getDataWithChild('grupo-aluno', 'grupoId', this.props.navigation.getParam("grupoId"), dataIn => {
            console.log("getDataWithChild")
            dataIn.forEach(usuario => {                
                FirebaseService.getDataWithKey(
                    'usuario', 
                    usuario.alunoId, 
                    dataIn => {
                        console.log(this.state.dataList.length);
                        if(this.state.dataList.length > dataIn.length && this.state.dataList.length > 0){
                            this.getUpdateList();
                        } else {
                            this.setState({ dataList: this.state.dataList.concat(dataIn)})
                        }
                    });
            });
        });
    };

    render(){
        const {dataList} = this.state;
        const {navigate} = this.props.navigation;
        
        return(
            <View>
                <Button
                    title="Adicionar Aluno"
                    onPress={() => navigate("CadastroAluno", {grupoId: this.props.navigation.getParam("grupoId")})}
                />
                <ScrollView>
                    <View style={styles.fullWidth}>
                        <FlatList 
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(usuario) => usuario.key}
                            data={dataList} 
                            renderItem={({item}) => {
                                return <Text style={styles.textStyle}>{item.nome} - {item.key}</Text>
                            }}
                        />
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
    item: {backgroundColor: '#c7c7c7', borderRadius: 20}

});