import { ThreeDot } from "react-loading-indicators"


function Loading({size}) {
    return (
    <div className="text-center p-3" >
        <ThreeDot
        size={size}
        color="blue"
        />
    </div>
    )
}

export default Loading