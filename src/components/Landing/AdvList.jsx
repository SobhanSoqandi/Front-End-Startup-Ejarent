import { useSearchParams } from "react-router-dom";
import useGetAdv from "../../features/Advertisement/useGetAdv";
import Adv from "./Adv";
import Loading from "../../UI/Loading";

function AdvList() {
  const [searchParams] = useSearchParams();

  // تبدیل query string به object
  const filters = Object.fromEntries([...searchParams.entries()]);

  const { advertisements, isLoading , isError } = useGetAdv(filters);


  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className="text-center">خطا در دریافت آگهی‌ها</p>;
  }

  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {advertisements.map((advertisement) => (
        <Adv
          key={advertisement.id}
          Advertisement={advertisement}
        />
      ))}
    </div>
  );
}

export default AdvList;
