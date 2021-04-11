import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import { List, Divider, Avatar } from 'react-native-paper';
import { NavigationEvents } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export default class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            users: []
        }
        this.callApi = this.callApi.bind(this)
    }

    callApi() {
        return fetch('http://vps-f48cdbb3.vps.ovh.net:5000/user')
        .then((res) =>
            res.json()
        )
        .then((resJson) =>
            this.setState({
                isLoading: false,
                users: resJson
            })
        )
    }


    /*componentDidMount() {
        return fetch('http://192.168.1.51:5000/user')
        .then((res) =>
            res.json()
        )
        .then((resJson) =>
            this.setState({
                isLoading: false,
                users: resJson
            })
        )
    }*/
    
    render() {
        if (this.props.navigation.addListener('focus', () => {
            this.callApi();
        }));

        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {this.state.users.map((user, i) => (
                    <View key={user.id}style={{ minWidth: 360}}>
                        <List.Item
                            left={props => <Avatar.Image source={{uri: user.avatar}}/>}
                            title={user.name}
                            description={`Doit boire encore : ${user.shot} shots`}
                            onPress={() => this.props.navigation.navigate('User', {user})}
                        />
                        <Divider/>                        
                    </View>
                ))}
            </View>
        )
    }
}
/*
function test {
    useFocusEffect(
        React.useCallback(() => {
            alert('Screen was focused');
            // Do something when the screen is focused
            return () => {
                alert('Screen was unfocused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
                };
        }, [])
    );
}

const Users = ({navigation}) => {
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            Alert.alert("refreshed");
        });
        return unsubscribe;
    }, [navigation]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {this.state.users.map((user, i) => (
                    <View key={user.id}style={{ minWidth: 360}}>
                        <List.Item
                            left={props => <Avatar.Image source={{uri: user.avatar}}/>}
                            title={user.name}
                            description={`Doit boire encore : ${user.shot} shots`}
                            onPress={() => this.props.navigation.navigate('User', {user})}
                        />
                        <Divider/>                        
                    </View>
                ))}
            </View>
    );
}

export default Users;*/