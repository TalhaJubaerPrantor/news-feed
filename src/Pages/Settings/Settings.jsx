import { useEffect } from "react";
import useNews from "../../Components/News/useNews";

export default function App() {

    const { stories, loading } = useNews();

    if(loading) {
        console.log("loading");
    }else{
        console.log(stories);
    }


    return (
        <div>



        </div>
    );
}
