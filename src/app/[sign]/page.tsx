import Login from '@/component/login'
import Signup from '@/component/signup'
import React from 'react'
import '../../style/home.css'
import NotFound from '../not-found'
type Props = {
    params: { sign: string }
}

const Sign = ({ params }: Props) => {
    switch (params.sign) {
        case "login": return <div className='home center'><Login /></div>
        case "signup": return <div className='home center'><Signup /></div>
    }
    return (
        <NotFound />
    )
}

export default Sign