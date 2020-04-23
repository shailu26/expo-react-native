import React from "react";
import {AntDesign, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {
    View,
    Text,
    TextInput,
    Image,
    AsyncStorage,
    KeyboardAvoidingView,
    StatusBar
} from "react-native";
import {Container, Content, Form} from "native-base";
import {Snackbar} from "react-native-paper";
import styles from './login-style';
import {AuthContext} from "../../context/context";
import userService from '../../../services/user-service/user-service';

export default class Login extends React.Component {
    static contextType = AuthContext;
    handleFocus = (stateVariable) => {
        let detail = {};
        detail[stateVariable] = true;
        this.setState(detail);
    };

    handleBlur = (stateVariable) => {
        let detail = {};
        detail[stateVariable] = false;
        this.setState(detail);
    };
    constructor(props) {
        super();
        this.state = {
            email: "",
            password: "",
            error: null,
            isEmailFocused: false,
            isPasswordFocused: false
        };
        this._userApi = new userService();
    }

    handleLogin = async () => {
        this
            ._userApi
            .login({email: this.state.email, password: this.state.password})
            .then(async({data}) => {
                try {
                    for (let key in data.result) {
                        await AsyncStorage.setItem(key, data.result[key]);
                    }
                    await AsyncStorage.setItem("token", data.token);
                    this.context.signIn(data.token);
                } catch (e) {
                    console.log({e});
                }
            })
            .catch((err) => {
                if (err && err.response && err.response.data) {
                    let error = err.response.data;
                    if (error.status === 401 || error.status === 404) {
                        this.setState({error: error.errorMessage});
                    } else {
                        this.setState({error: "Login Failed"});
                    }
                } else {
                    this.setState({error: "Login Failed"});
                }
            });
    };

    _onDismissSnackBar = () => {
        this.setState({error: null});
    };
    render() {
        const {email, password, error} = this.state;
        return (
            <KeyboardAvoidingView
                behavior="null"
                style={{
                flex: 1
            }}>
                <Container style={styles.wrapper}>
                    <View style={{
                        flex: 1
                    }}>
                        <StatusBar barStyle="light-content"/>
                        <Image style={styles.backgroundImage}></Image>

                        <View style={styles.loginView}>
                            <Content style={styles.scrollViewWrapper}>
                                <Text style={styles.loginHeader}>Sign In</Text>
                                <Text
                                    style={{
                                    fontSize: 15,
                                    paddingLeft: 20,
                                    paddingBottom: 17,
                                    color: "grey"
                                }}>
                                    Sign In with Social Media
                                </Text>
                                <View>
                                    <AntDesign
                                        name="linkedin-square"
                                        size={60}
                                        color="black"
                                        style={styles.linkedinLogo}/>
                                </View>
                                <Form style={styles.form}>
                                    <View style={styles.formItem}>
                                        <Text style={styles.formLabel}>Email</Text>
                                        <View
                                            style={{
                                            flexDirection: "row",
                                            position: "relative"
                                        }}>
                                            <MaterialCommunityIcons
                                                name="email-outline"
                                                size={20}
                                                color={this.state.isEmailFocused
                                                ? "blue"
                                                : "black"}
                                                style={{
                                                position: "absolute",
                                                left: 1,
                                                top: 5
                                            }}/>
                                            <TextInput
                                                style={this.state.isEmailFocused
                                                ? styles.formInputEmailFocused
                                                : styles.formInput}
                                                onFocus={() => this.handleFocus("isEmailFocused")}
                                                onBlur={() => this.handleBlur("isEmailFocused")}
                                                onChangeText={(email) => this.setState({email})}
                                                value={email}
                                                returnKeyType="next"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                onSubmitEditing={() => this.passwordInput.focus()}
                                                returnKeyType="go"/>
                                        </View>
                                    </View>
                                    <View style={styles.formItem}>
                                        <Text style={styles.formLabel}>Password</Text>
                                        <View
                                            style={{
                                            flexDirection: "row",
                                            position: "relative"
                                        }}>
                                            <MaterialIcons
                                                name={this.state.isPasswordFocused
                                                ? "lock-outline"
                                                : "lock-open"}
                                                size={20}
                                                color={this.state.isPasswordFocused
                                                ? "blue"
                                                : "black"}
                                                style={{
                                                position: "absolute",
                                                left: 1,
                                                top: 5
                                            }}/>
                                            <TextInput
                                                secureTextEntry={true}
                                                style={this.state.isPasswordFocused
                                                ? styles.formInputPasswordFocused
                                                : styles.formInput}
                                                onFocus={() => this.handleFocus("isPasswordFocused")}
                                                onBlur={() => this.handleBlur("isPasswordFocused")}
                                                onChangeText={(password) => this.setState({password})}
                                                value={password}
                                                ref={(input) => this.passwordInput = input}/>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        marginTop: 10,
                                        justifyContent: "center"
                                    }}>
                                        <Text
                                            style={[
                                            styles.signInBtn, !this.state.email.length || !this.state.password.length
                                                ? styles.disabledSignIn
                                                : ""
                                        ]}
                                            onPress={() => this.state.email.length && this.state.password.length && this.handleLogin()}>
                                            Sign In
                                        </Text>
                                    </View>
                                </Form>
                            </Content>
                        </View>
                    </View>
                    <Snackbar visible={error} duration={5000} onDismiss={this._onDismissSnackBar}>
                        {error}
                    </Snackbar>
                </Container>
            </KeyboardAvoidingView>
        );
    }
}
