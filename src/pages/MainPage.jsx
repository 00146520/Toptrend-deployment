import { Link } from 'react-router-dom';
import friendsGroup from '../assets/svgs/grupodiversolg.svg';
import festivalpeople from '../assets/svgs/personas-festival2.svg'
import qrPhone from '../assets/svgs/qrMedium.svg'
import { Header } from '../components/Header';

const MainPage = () => {

    return(
        <>
            <Header/>
            <section className='bg-secondary py-14'>
                <div className='flex justify-evenly w-full'>
                    <img className='rounded-3xl w-2/5 sm:w-1/2 min-h-[250px] sm:min-h-[350px] object-cover md:h-auto' src={friendsGroup} alt="friendsgroup"/>

                    <div className='w-1/2 flex flex-col justify-center sm:w-2/5'>
                        <h2 className='text-center text-white text-sm mb-5 sm:text-xl lg:text-3xl xl:text-[2.5rem] xl:leading-[2.825rem]'>
                            ¡Tu catálogo de entretenimiento a un click!
                        </h2>
                        <p className='text-gray-400 text-xs px-3 sm:text-base sm:px-5 lg:text-2xl xl:text-4xl lg:px-11'>En TopTrend encontrarás  los mejores eventos para pasar el rato</p>
                        <Link to='/events' className='mt-10 mx-5 md:flex md:flex-row justify-center' >
                            <span className='bg-ourgreen text-white py-3 px-3 rounded-lg hover:bg-green-400  '>EVENTOS</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Segunda parte */}
            <section className='flex justify-evenly w-full lg:hidden bg-main py-14 '>
                <div className='w-1/2 flex flex-col justify-center sm:w-2/5'>
                    <p className='text-center text-sm mb-5 sm:text-xl'>¿Acompañado?, ¿Solo? ¡No hay problema!</p>
                    <p className='text-gray-400  text-xs px-3 sm:text-base sm:px-5'>Puedes asistir a eventos con tu grupo o tu solo</p>
                </div>

                <img className='rounded-3xl w-2/5 min-h-[250px] object-cover sm:w-[45%] md:h-auto' src={festivalpeople} alt="festival people" />
            </section>

            <section className='flex justify-evenly w-full bg-secondary py-12 lg:hidden'>
                <img src={qrPhone} alt="qr in phone" className='w-2/5 min-h-[250px] object-cover sm:w-[30%] md:h-auto' />
                
                <div className='w-1/2 flex flex-col justify-center sm:w-2/5'>
                    <p className='text-center text-white text-sm mb-5 sm:text-xl'>Ni siquiera los tickets se salvan de la modernización</p>
                    <p className='text-gray-400  text-xs px-3 sm:text-base sm:px-5'>Ahora los tickets son QR, solo tienes que mostrar tu celular en los puntos designados!</p>
                </div>
            </section>

            <section className='flex flex-col items-center w-full bg-main py-24 '>
                <p className='text-center text-black  text-xs sm:text-xl sm:px-5'>¿Aun no tienes cuenta? <br/>¡Eso es un problema, pero nosotros te ayudamos!</p>
                <Link to = '/register' className='bg-secondary hover:bg-secondaryHover text-white w-4/5 sm:w-2/5 p-3 text-xs sm:text-xl my-5 rounded-full text-center '> Regístrate </Link>
            </section>
            
        </>
    )
}
export default MainPage;
