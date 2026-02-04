import { useMutation } from "@tanstack/react-query";
import { checkOtp } from "../../services/authService";
import Input from "../../UI/Input"
import OTPInput from "react-otp-input";
import { useEffect, useState } from "react";
import { FaPenToSquare, FaRegPenToSquare } from "react-icons/fa6";
import { PiNotePencilLight } from "react-icons/pi";
import { LuSquareArrowRight } from "react-icons/lu";
import Loading from "../../UI/Loading";
import toast from "react-hot-toast";
import ToPersianNumber from "../../Utils/ToPersianNumber";
import { useNavigate } from "react-router-dom";


function CheckOtp({ phoneNumber = "09151540707", onBack }) {

    const navigate = useNavigate();

    const [time, setTime] = useState(50)

    const { isPending: isCheckingOtp, mutateAsync } = useMutation({
        mutationFn: checkOtp,
    });

    const [otp, setOtp] = useState(0);

    const checkOtpHandler = async (e) => {
        e.preventDefault();
        try {
            const { message } = await mutateAsync({ phoneNumber, otp });
            localStorage.setItem("userphoneNumber" , phoneNumber);
            // localStorage.setItem("userPhone", phoneNumber);
            toast.success(message);
            navigate("/complete-profile");
            toast.arguments(" لطفا پروفایل خودرا تکمیل کنید ")

        } catch (error) {
            toast.error(error?.response?.data?.message);

        }
    };


    useEffect(() => {
        const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
        return () => {
            if (timer) clearInterval(timer);
        }
    }, [time]);



    return (
        <div className="flex-1 lg:flex min-h-screen select-none" >
            



            <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
                <div className="max-w-sm w-full md:shadow p-8 rounded-xl">
                    <div className="flex justify-center items-center text-center relative">
                        <button
                            onClick={onBack}
                            className="text-2xl absolute right-0 text-gray-500 cursor-pointer">
                            <LuSquareArrowRight />
                        </button>
                        <a className="font-[lalezar] font-bold text-orange-500 text-2xl">اجارنت</a>
                    </div>
                    <div className="flex py-10" >
                        <p className="text-gray-500 text-md" > کد تایید به شماره {ToPersianNumber(phoneNumber)} ارسال شد </p>
                        <button
                            onClick={onBack}
                            className="text-blue-600 px-2 cursor-pointer" >
                            <FaRegPenToSquare />
                        </button>
                    </div>



                    <form onSubmit={checkOtpHandler} >

                        <p className="font-bold text-secondary-800"> کد تایید را وارد کنید :</p>
                        <OTPInput value={otp} onChange={setOtp} numInputs={4}
                            renderSeparator={<span>  </span>}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    className="outline-none my-5 transition-all border-[0.5px] border-blue-500 duration-300 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-500/50 "
                                />
                            )}
                            shouldAutoFocus

                            containerStyle="flex flex-row-reverse gap-x-2  justify-center"
                            inputStyle={{
                                color: "blue",
                                width: "3.2rem",
                                height: "3.5rem",
                                padding: "0.5rem 0.2rem",
                                borderRadius: "1rem"
                            }}

                        />

                        {
                            time <= 0 ?
                                <div className="text-gray-600 py-5 text-center text-sm" >
                                    <p className="text-blue-700 cursor-pointer" >  دریافت مجدد کد تایید </p>
                                </div>
                                :
                                <div className="text-gray-600 py-5 text-center text-sm" >
                                    <p className="text-blue-700 cursor-pointer" >
                                        {time} ثانیه تا ارسال مجدد کد
                                    </p>
                                </div>

                        }


                        {
                            isCheckingOtp ? <Loading size='Medium' />
                                : <button
                                    type='submit'
                                    className="btn w-full my-6"> تایید و ورود </button>
                        }


                    </form>
                </div>
            </div>


            <div className="lg:flex w-1/2 items-center justify-center mx-auto">
                <img
                    src="images\checkotp-image.svg"
                    alt="کد تایید چهار رقمی"
                    className=" mx-auto w-[700px]"
                />
            </div>

        </div>
    )
}

export default CheckOtp