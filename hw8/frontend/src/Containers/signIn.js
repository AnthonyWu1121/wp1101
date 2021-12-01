import { Input } from "antd";
import { UserOutlined } from '@ant-design/icons';
import Title from "../Components/Title";
import { useState, useEffect } from "react";

const LOCALSTORAGE_KEY = "save-me";

const SignIn = ({setAppMe, setAppSignedIn, displayStatus}) => {
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false)

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [signedIn, me]);

    return (
        <>
            <Title>
                <h1>My Chat Room</h1>
            </Title>
            <Input.Search 
                prefix={<UserOutlined />}
                value={me}
                enterButton='Sign In'
                onChange={(e) => {setMe(e.target.value)}}
                placeholder='Enter your name'
                size='large'
                style={{width: 300, margin: 50}}
                onSearch={(name) => {
                    if (!name) {
                        displayStatus({
                            type: 'error',
                            msg: 'Missing user name',
                        });
                    }else{
                        setSignedIn(true);
                        setAppMe(name);
                        setAppSignedIn(true);
                    }
                }}
            />
        </>
    )
}
export default SignIn;