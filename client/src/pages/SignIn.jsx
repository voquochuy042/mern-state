import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await fetch('/v1/auth/signin', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success === false) {
                setIsLoading(false)
                setError(data.message)
                return
            }
            setIsLoading(false)
            setError(null)
            navigate('/')
        } catch (error) {
            setIsLoading(false)
            setError(error.message)
        }
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form className='flex flex-col gap-4'>
                <input type="text" placeholder='Email' className='border p-3 rounded-lg' id='email'
                    onChange={handleChange} />
                <input type="text" placeholder='Password' className='border p-3 rounded-lg' id='password'
                    onChange={handleChange} />
                <button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase'>
                    {isLoading ? 'Loading' : 'Sign In'}
                </button>
                <button className='bg-red-700 text-white p-3 rounded-lg uppercase'>Continue with google</button>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
            <div className='flex flex-row gap-2 mt-5'>
                <p>Dont have an account?</p>
                <Link to='/sign-up'>
                    <p className='text-blue-700'>Sign up</p>
                </Link>
            </div>
        </div>

    )
}
