import axios from 'axios'
import react, { useEffect } from 'react'
import { auth } from '../_actions/user_action'
import { useDispatch } from 'react-redux'
// import { response } from 'express' 왜 자동임포트인지..

export default function (SpecificComponent, option, adminRoute = null){
    //option 파라미터 설명
    //null 아무나 출입가능한 페이지 , true 로그인 유저만 가능한 페이지 , false 로그인 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props){
        const dispatch = useDispatch()
        useEffect(() => {
                dispatch(auth()).then(response => {
                    console.log(response)

                    //비 로그인
                    if(!response.payload.isAuth){
                        if(option){
                            props.history.push('/login')
                        }
                    }else{
                        //로그인된 상태
                        if(adminRoute && !response.payload.isAdmin ){
                        props.history.push('/')
                        }else{
                            if(option === false)
                            props.history.push('/')
                        }
                    }
                })
                //axios.get('/api/users/auth') 로도 할수있지만 리덕스 연습
        }, [])
        return (
            <SpecificComponent {...props}/>
        )
    }
    return AuthenticationCheck 
}