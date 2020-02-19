import React, { Component } from 'react'
import { StatusBar, Keyboard, ActivityIndicator } from 'react-native'
import { 
    Container, 
    Form, 
    Input, 
    SubmitButton, 
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

export default class index extends Component {

    state = {
        newUser: '',
        users:[],
        loading: false,
    };

    handleAddUser = async () => {

        this.setState({ loading: true });

        const response = await api.get(`/users/${this.state.newUser}`);
        const data = {
            name: response.data.name,
            login: response.data.login,
            bio:response.data.bio,
            avatar: response.data.avatar_url
        };

        this.setState({
            users:[...this.state.users,data],
            newUser: '',
            loading : false,
        });

        Keyboard.dismiss();

    }

    render() {

        const { users, newUser } = this.state;

        return (  
            <Container>
                <StatusBar barStyle='light-content' backgroundColor="#7159c1"/> 

                <Form>
                    <Input 
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar Usuário"
                        value={newUser}
                        onChangeText={text => this.setState({ newUser : text })}
                        returnKeyType="send"
                        onSubmitEditing={this.handleAddUser}
                    />
                    <SubmitButton loading={this.state.loading} onPress={this.handleAddUser}>
                       {this.state.loading ? (
                            <ActivityIndicator/>  ) : ( <Icon name="add" size={20} color="#FFF"/> )} 
                       
                    </SubmitButton>
                </Form>    

                <List 
                    data={users}
                    keyExtractor={user => user.login}
                    renderItem={({item}) => (
                        <User>
                            <Avatar source={{uri: item.avatar}}/>
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>

                            <ProfileButton onPress={() => {}}>
                                <ProfileButtonText>Ver perfil</ProfileButtonText>

                            </ProfileButton>
                        </User>
                    )}
                />

            </Container>
                
        )
    }

    
    static navigationOptions ={
        title:'Usuários',
        tabBarLabel: 'Main',
        headerTitleAlign: 'center',
        headerBackTitleVisible: 'false',
        headerTitleStyle:{
            fontSize: 14
        },
        headerStyle:{
            backgroundColor: '#7159c1'
        },
        headerTintColor: '#FFF'

}

}
