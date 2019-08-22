import React from "react";
import { StyleSheet, View, TextField, Button } from "react-native";

const AddScreen = () => {
    submit = (event) => {
        event.preventDefault();

        const {temperatura} = this;
        const {umidade} = this;
        const {data} = this;
        const {cliente} = this;

        const newid = FirebaseService.pushData('leituras', {
            temperatura,
            umidade,
            data,
            cliente
        });

        this.props.history.push(urls.data.path);

    };

    return(
        <View>
            <form onSubmit={this.submit}>
                <TextField className="input-field"
                    type="text"
                    defaultValue={''}
                    label="Temperatura"
                    required
                    onChange={e => this.temperatura = e.target.value}/>
                <TextField className="input-field"
                    type="text"
                    label="Humidity"
                    defaultValue={''}
                    required
                    onChange={e => this.umidade = e.target.value}/>
                <TextField className="input-field"
                    type="text"
                    label="Date"
                    defaultValue={''}
                    required
                    onChange={e => this.data = e.target.value}/>
                <TextField className="input-field"
                    type="email"
                    label="Client"
                    defaultValue={''}
                    required
                    onChange={e => this.cliente = e.target.value}/>
                <Button type="submit" style={{marginTop: '20px', display: 'inline-block'}}>
                    Add
                </Button>
            </form>
        </View>
    );
}

const styles = StyleSheet.create({});

export default AddScreen;