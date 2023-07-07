import React from 'react';
import { Header } from "../components/Header"
import userIcon from '../assets/svgs/userIcon2.svg'


const userDefault = {
    user_name: "user_name",
    email: "example@example.com"
}
const UserProfile = () => {

    //const { token, user, logout} = useSessionContext();
    var user = userDefault;


    return [
        <>
            <div className='flex flex-col min-h-screen'>
            <Header/>
            <section className='bg-tertiary w-full h-24 px-5 sm:h-[22vh] xl:[25vh] sm:px-9'>
                <div className='flex p-6 items-center justify-center aspect-square min-h-[90px] h-full sm:h-3/4 xl:h-[90%] bg-main rounded-xl relative top-full -translate-y-1/2'>
                    <img src={userIcon} alt="user icon" />
                </div>
            </section>


            <section className="bg-white pl-5 sm:pl-48 xl:pl-60 pt-20 sm:pt-[13vh] xl:pt-[17vh] grow">
                <p className="bg-primary mt-4 text-base sm:text-xl 2xl:text-2xl"> Nombre de usuario: </p>


                <div className="bg-main mx-4 p-4 w-fit rounded-md text-sm sm:text-xl sm:mx-0 2xl:text-2xl">
                    { user.user_name }
                </div>
                <p className="bg-primary mt-7 sm:mt-[6.67vh] text-base sm:text-xl 2xl:text-2xl"> Correo</p>


                <div className="bg-main mx-4 p-4 w-fit rounded-md text-sm sm:text-xl sm:mx-0 2xl:text-2xl">
                    { user.email }
                </div>
            </section>
            </div>
        </>
    ]
}


export default UserProfile;