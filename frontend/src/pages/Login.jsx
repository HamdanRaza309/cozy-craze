import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

function Login() {
    const [currentState, setCurrentState] = useState('Log In');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (currentState === 'Sign Up') {

                const response = await axios.post(backendUrl + 'api/user/register',
                    { name: formData.name, email: formData.email, password: formData.password }
                )

                if (response.data.success) {
                    let t = await response.data.token
                    setToken(t)
                    localStorage.setItem('token', response.data.token)
                    setFormData({ name: '', email: '', password: '' })
                } else {
                    toast.error(response.data.message);
                }

            } else {
                const response = await axios.post(backendUrl + 'api/user/login',
                    { email: formData.email, password: formData.password }
                )

                if (response.data.success) {
                    let t = await response.data.token
                    setToken(t)
                    localStorage.setItem('token', response.data.token)
                    setFormData({ name: '', email: '', password: '' })
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        <div>
            <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
                <div className='inline-flex gap-2 mb-2 mt-10 items-center'>
                    <p className='prata-regular text-3xl'>{currentState}</p>
                    <p className='w-1 sm:w-1 h-[2px] bg-[#414141]'></p>
                    <p className='w-8 sm:w-11 h-[2px] bg-[#414141]'></p>
                </div>
                {currentState === 'Log In' ? null : (
                    <input
                        type="text"
                        name="name"
                        className='w-full px-3 py-2 border border-gray-800'
                        placeholder='Name'
                        value={formData.name}
                        onChange={onChangeHandler}
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Email'
                    value={formData.email}
                    onChange={onChangeHandler}
                    required
                />
                <input
                    type="password"
                    name="password"
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Password'
                    value={formData.password}
                    onChange={onChangeHandler}
                    required
                />
                <div className='w-full flex justify-between text-sm mt-[-8px]'>
                    <p className='cursor-pointer'>Forget password?</p>
                    {currentState === 'Log In'
                        ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
                        : <p onClick={() => setCurrentState('Log In')} className='cursor-pointer'>Login here</p>
                    }
                </div>
                <button className='bg-black text-white my-8 px-8 py-3 text-sm active:bg-gray-700'>
                    {currentState === 'Log In' ? 'Sign In' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}

export default Login;
