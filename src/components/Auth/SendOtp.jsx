
import Input from '../../UI/Input';

function SendOtp() {
    return (

        <div className="flex flex-row-reverse min-h-screen" >
            <div className="hidden lg:flex w-1/2 items-center justify-center">
                <img
                    src="images\login-image.svg"
                    alt="ورود"
                    className=" mx-auto w-96 h-96"
                />
            </div>


            <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
                <div className="max-w-sm w-full md:shadow p-8 rounded-xl">
                    <div className="text-center mb-4">
                        <a className="font-bold text-orange-500 text-2xl">اجارنت</a>
                    </div>
                    <h2 className="text-lg uppercase font-semibold py-3">
                        ورود | ثبت‌نام
                    </h2>

                    <form>
                        <Input
                            type="text"
                            label="لطفاً شماره موبایل خود را وارد کنید"
                        />
                        <button className="btn w-full my-6">دریافت کد</button>
                    </form>
                </div>
            </div>

        </div>

    )
}

export default SendOtp;