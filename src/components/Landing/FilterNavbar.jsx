import { useSearchParams } from 'react-router-dom';
import Filter from '../../UI/Landing/Filter';
import FilterDropDown from '../../UI/Landing/FilterDropDown';

function FilterNavbar() {

    const [searchParams, setSearchParams] = useSearchParams();

    const sortOptions = [
        {
            label: "مرتب سازی (جدید ترین)",
            value: "latest",
        },
        {
            label: "مرتب سازی (قدیمی ترین)",
            value: "earliest",
        },
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
    };


    return (
        <div className="" >

            <div className="space-y-5" >
                <Filter
                    filterField="sort"
                    options={statusOptions}
                />

                <FilterDropDown filterField="sort" options={sortOptions} />
                <FilterDropDown filterField="sort" options={sortOptions} />
            </div>


            <div className="flex my-5 gap-3" >

                <button className="btn btn--primary w-full " >
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