import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Appbar, Button, TextInput } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import { logout, useMyContextController} from '../store'

const Jobs = ({navigation}) => {
    const [newJob,setNewJob] = useState("")
    const [joBs, setjoBs] = useState("")
    const cJoBs = firestore().collection("JOBS")
    const [controller,dispatch]=useMyContextController()
    const {userLogin}=controller
    
    useEffect(()=>{
        if(userLogin==null)
            navigation.navigate("Login")
    },[navigation,userLogin])

    const handleLogout=()=>{
        logout(dispatch)
    }
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>
            <Button
                onPress={handleLogout}
            >LogOut</Button>
        })
    })
    const addNewJob = ()=>{
        cJoBs.add({
            title:newJob,
        })
        .then(()=>Alert.alert("Thêm dữ liệu"))
        .catch(e=>Alert.alert(e.message))
    }
    useEffect(()=>{
        cJoBs.onSnapshot(
            listJoBs=>{
                var result = []
                listJoBs.forEach(
                    job => {
                        const {title, complete} = job.data()
                        result.push({
                            id:job.id,
                            title,
                        })
                    }
                )
                setjoBs(result)
            }
        )
    },[])
    const renderItem = ({item})=>{
        const {id,title}=item
        return(
            <Text style={styles.jobs}>{title}</Text>
        )
    }
    return (
    <View style={{flex:1}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput 
        style={{width:300}}
        label="Job mới"
        value={newJob} 
        onChangeText={setNewJob} 
        /> 
        <Button
        mode="contained-tonal"
        onPress={addNewJob}
        >
            Thêm
        </Button>
      </View>
        <Appbar>
            <Appbar.Content title="Danh Sách Job"/>
        </Appbar>
        <FlatList
            data={joBs}
            keyExtractor={item=>item.id}
            renderItem={renderItem}
        />

    </View>
    )
}

export default Jobs

const styles = StyleSheet.create({
    jobs:{
        fontSize:20,
        borderBottomWidth:1,
        padding:10
    }
})