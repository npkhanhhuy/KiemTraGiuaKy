import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import { Button, HelperText, Icon, Text, TextInput } from "react-native-paper";
import { login, useMyContextController } from "../store";

const Login = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {userLogin}=controller

  useEffect(() => {
    if (userLogin != null) {
      navigation.navigate('Jobs');
    }
    //console.log(userLogin);
  }, [ navigation,userLogin]);

  const handleLogin = () => {
    if (!email.includes('@')) {
      return;
    }
    login(dispatch, email, password);
  };

  const isDisabled = email.trim() === '' || password.trim() === ''|| !email.includes('@');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', alignSelf: 'center', marginBottom: 30 }}>
        Đăng nhập
      </Text>
      <Image
        style={myStyle.logo}
        source={require("../asset/firebase.png")}
        resizeMode="contain"
      />
      <View>
        <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          margin: 10,
        }}
        left={<TextInput.Icon icon="email"/>}
        mode="outlined"
      />
      </View>
      <View>
        <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={{
          margin: 10,
        }}
        left={<TextInput.Icon icon="lock"/>}
        right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
        mode="outlined"
      />
      </View>

      <HelperText type="error">

      </HelperText>
      <Button
        mode="contained-tonal"
        onPress={handleLogin}
        style={{
          margin: 10,
          padding: 5,
          backgroundColor: '#af79d1',
        }}
        labelStyle={{
          fontSize: 20
        }}
        disabled={isDisabled}
      >
        Đăng nhập
      </Button>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <Text>Chưa có tài khoản ? </Text>
        <Button
          onPress={() =>
            navigation.navigate("Register")}>
          Đăng ký
        </Button>
      </View>
    </View>
  );
};

export default Login;

const myStyle = StyleSheet.create({
  logo: {
    alignSelf: "center",
    justifyContent: "center"
  }
});
