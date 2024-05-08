import { createContext,useContext, useMemo, useReducer } from "react";
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { Alert } from "react-native";

const MyContext= createContext()

MyContext.displayName="My store"

const reducer = (state, action) =>{
    switch(action.type)
    {
        case "USER_LOGIN":
            return {...state, userLogin: action.value}
        case "LOGOUT":
            return {...state,userLogin: null}
        default :{
            throw new Error("Tài khoản không tồn tài")
        }
    }
}

const MyContextControllerProvider =({ children })=>{
    const initialState ={
        userlogin:null,
        jobs:[]
    }
    const [controller, dispatch] = useReducer(reducer, initialState)
    const value = useMemo (()=> [controller,dispatch],[controller,dispatch])
    return(
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}

const useMyContextController =()=>{
    const context = useContext(MyContext)
    if(!context)
    {
        return new Error ("useMyContextProvider phai dat trong MyContextControllerProvider")
    }

    return context
}

const USERS= firestore().collection("USERS")
const JOBS = firestore().collection("JOBS")

const createAccount = (email, password, fullname)=>{
        auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            Alert.alert("Đăng ký tài khoản thành công "+email)
            USERS.doc(email)
            .set(
                {
                    email,
                    password,
                    fullname
                }
            )
        })
        .catch(e=>Alert.alert("Tài khoản tồn tại!"))
    }
const login = (dispatch, email, password, fullname)=>{
        auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
            USERS.doc(email)
            .onSnapshot(u=>{
                if(u.exists)
                {
                    Alert.alert("Đăng nhập thành công: "+u.id)
                    dispatch({type:"USER_LOGIN", value:u.data()})
                }
            })
        })
        .catch(e=>Alert.alert("Sai email hoặc mật khẩu"))
    }
const logout=(dispatch)=>{
        auth().signOut()
        .then(()=>dispatch({type:"LOGOUT"}))
    }

export{
        MyContextControllerProvider,
        useMyContextController,
        createAccount,
        login,
        logout
    }
