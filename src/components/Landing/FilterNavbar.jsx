import Filter from '../../UI/Landing/Filter';
import FilterDropDown from '../../UI/Landing/FilterDropDown';

function FilterNavbar() {

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
            value: "OPEN",
        },
        {
            label: "گران ترین",
            value: "CLOSED",
        },
    ];

    return (
        <div className="" >

            <div className="space-y-5" >
                <Filter
                    filterField="status"
                    options={statusOptions}
                />

                <FilterDropDown filterField="sort" options={sortOptions} />
                <FilterDropDown filterField="sort" options={sortOptions} />
            </div>


            <div className="flex my-5 gap-3" >

                <button className="btn btn--primary w-full " >
                    اعمال فیلتر
                </button>

                <button className="btn--light w-full border border-gray-100 " >
                    حذف فیلتر
                </button>
            </div>



        </div>


    )
}

export default FilterNavbar