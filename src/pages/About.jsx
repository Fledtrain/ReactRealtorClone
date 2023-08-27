import React from 'react'

const About = () => {
    return (
        <div className='px-3 max-w-2xl mx-auto '>
            <h1 className='text-3xl font-bold mb-6 mt-6 text-slate-800 text-center'> About</h1>
            <p
                className='mb-4 text-slate-900'>
                This is a School Project for my software Engineering class. <br />
                It is built with ReactJS, TailwindCSS and Firebase. <br />
                It is a realtor clone that allows users to create listings, sign up and sign in.
            </p>
            <p
                className='mb-4 text-slate-900'>
                This Application showcases the following features: Authentication, Authorization, CRUD operations, Image Upload, Pagination, and more.
                <br />
            </p>
            <p
                className='mb-4 text-slate-900'>
                You can sign up with Google Auth or Email and Password. <br />
                Or you can try it out by signing in and creating a listing with this account: <br /> Test30@gmail.com <br /> Password: Test30
                <br /> <br />
                It is a work in progress build and I will update it as I learn more about ReactJS and Firebase.
            </p>
        </div>
    )
}

export default About