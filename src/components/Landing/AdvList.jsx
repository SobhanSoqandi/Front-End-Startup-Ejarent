import useGetAdv from "../../features/Advertisement/useGetAdv";
import Adv from "./Adv";
import Loading from "../../UI/Loading";
import { IoRefreshSharp } from "react-icons/io5";



function AdvList() {
    const { advertisements, isLoading, isError , refetch } = useGetAdv();

    if (isLoading) {
        return <div className="pt-40" > <Loading /> </div>;
    }

        if (isError) {
        return (
            <div className="text-center pt-40">
                <p className="mb-4">آگهی یافت نشد</p>
                <button
                    onClick={() => refetch()}
                    className="p-2 text-sm flex mx-auto items-center gap-x-1 bg-blue-500 text-white rounded-lg"
                >
                    <IoRefreshSharp className="text-lg" />
                    تلاش مجدد
                </button>
            </div>
        );
    }

    return (
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {advertisements?.map((advertisement) => (
                <Adv
                    key={advertisement.id} 
                    Advertisement={advertisement}  
                />
            ))}
        </div>
    );
}

export default AdvList;