import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { createAccount } from '../store';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleCreateAccount = () => {
    if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Thông báo', 'Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Thông báo', 'Email không hợp lệ.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Thông báo', 'Mật khẩu phải chứa ít nhất 6 ký tự.');
      return;
    }

    if (fullname.trim() === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập họ và tên.');
      return;
    }

    createAccount(email, password, fullname);
  };

  const handleInputChange = () => {
    if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || password !== confirmPassword || !email.includes('@') || password.length < 6 || fullname.trim() === '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  return (
    <ImageBackground
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../asset/firebase.png")}
          resizeMode="contain"
        >
        </Image>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => { setEmail(text); handleInputChange(); }}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
          left={<TextInput.Icon icon="email"/>}
          mode="outlined"          
        />
        <TextInput
          label="Mật khẩu"
          value={password}
          onChangeText={(text) => { setPassword(text); handleInputChange(); }}
          style={styles.input}
          secureTextEntry
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
          left={<TextInput.Icon icon="lock"/>}
          mode="outlined"          
        />
        <TextInput
          label="Nhập lại mật khẩu"
          value={confirmPassword}
          onChangeText={(text) => { setConfirmPassword(text); handleInputChange(); }}
          style={styles.input}
          secureTextEntry
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
          left={<TextInput.Icon icon="lock-check"/>}
          mode="outlined"          
        />
        <TextInput
          label="Họ và tên"
          value={fullname}
          onChangeText={(text) => { setFullname(text); handleInputChange(); }}
          style={styles.input}
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
          left={<TextInput.Icon icon="account"/>}   
          mode="outlined"       
        />
        <Button mode="contained" onPress={handleCreateAccount} style={styles.button} disabled={isDisabled}>
          Đăng ký
        </Button>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Text>Bạn đã có tài khoản chưa ? </Text>
          <Button
            onPress={() =>
              navigation.navigate("Login")}>
            Đăng nhập
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#af79d1',
    borderRadius: 20,
    elevation: 2,
  },
  logo: {
    height: 200,
    alignSelf: "center",
    justifyContent: "center"
  }
});

export default Register;
