
export default function Destination(props) {


    return (
        <div className="mx-8 text-left flex border-2 rounded-lg">
            {/* <div className="p-1 w-20">pic</div> */}
            <div className="p-2 flex-grow grid grid-cols-2">
                <div className="p-1 grid grid-rows-2">
                    <div className="">{props.time}</div>
                    <div className="font-bold">{props.name}</div>
                </div>
                <div className="text-gray-400">{props.description}</div>
            </div>
        </div>
    )
}