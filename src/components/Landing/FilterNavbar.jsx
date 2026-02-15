import { useSearchParams } from 'react-router-dom';
import Filter from '../../UI/Landing/Filter';
import FilterDropDown from '../../UI/Landing/FilterDropDown';
import useGetCategories from '../../features/Advertisement/useGetCategories';

function FilterNavbar({ setOpen }) {

    const [searchParams, setSearchParams] = useSearchParams();

    const { isLoading, isError, categories } = useGetCategories();
    console.log(categories);



    const categoryOptions = [
        {
            label: "همه دسته‌بندی‌ها",
            value: "",  
        },
        ...(categories?.map(category => ({
            label: category.name,
            value: String(category.id)
        })) || [])
    ];


    const statusOptions = [
        {
            label: "همه",
            value: "ALL",
        },
        {
            label: "ارزان ترین",
            value: "cheap",
        },
        {
            label: "گران ترین",
            value: "expensive",
        },
    ];

    const handleClearFilter = () => {
        const newSearchParams = new URLSearchParams(searchParams);

        newSearchParams.delete("sort");
        newSearchParams.delete("status");
        setSearchParams(newSearchParams);
        setOpen(false);
    };


    return (
        <div className="" >

            <div className="space-y-5" >
                <Filter
                    filterField="sort"
                    options={statusOptions}
                />

                <FilterDropDown filterField="category" options={categoryOptions} />
                <FilterDropDown filterField="sort" options={categoryOptions} />
            </div>


            <div className="flex my-5 gap-3" >

                <button
                    onClick={setOpen}
                    className="btn btn--primary w-full " >
                    اعمال فیلتر
                </button>

                <button
                    onClick={handleClearFilter}
                    className="btn--light w-full border shadow " >
                    حذف فیلتر
                </button>
            </div>



        </div>


    )
}

export default FilterNavbar