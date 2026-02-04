import Advertisements from "../../components/Landing/Advertisements"
import AdvList from "../../components/Landing/AdvList"
import FilterNavbar from "../../components/Landing/FilterNavbar"


function Landing() {
  return (
    <div className="container mx-auto" >


      <div className="flex" >
        <div className="hidden md:block p-2 m-2" >
          <FilterNavbar />
        </div>
        <div className="w-full lg:mx-16" >
          <AdvList />
        </div>
      </div>
    </div>
  )
}

export default Landing