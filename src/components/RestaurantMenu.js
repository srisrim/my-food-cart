import { useEffect, useState } from "react";
import { MENU_API } from "../constants/common";
import { useParams } from "react-router";

const RestaurantMenu = () => {
    const [resMenu, setResMenu] = useState();
    const { id } = useParams();

    const CORS_PROXY = "https://corsproxy.io/?";

    useEffect(() => {
        fetchRestaurantMenu();
    }, []);

    const fetchRestaurantMenu = async () => {
        const res = await fetch(CORS_PROXY + encodeURIComponent(MENU_API + id));
        const data = await res.json();
        console.log(data);
    }


    return (
        <>
            <div className="restaurant-menu">
                <h2>Menu Card</h2>
            </div>
        </>
    )
}

export default RestaurantMenu;