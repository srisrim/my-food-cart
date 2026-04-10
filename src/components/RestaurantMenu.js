// import { useEffect, useState } from "react";
// import { MENU_API } from "../constants/common";
// import { useParams } from "react-router";

// const RestaurantMenu = () => {
//     const [resMenu, setResMenu] = useState();
//     const { id } = useParams();

//     const CORS_PROXY = "https://corsproxy.io/?";

//     useEffect(() => {
//         fetchRestaurantMenu();
//     }, []);

//     const fetchRestaurantMenu = async () => {
//         const res = await fetch(CORS_PROXY + encodeURIComponent(MENU_API + id));
//         const data = await res.json();
//         console.log(data);
//     }


//     return (
//         <>
//             <div className="restaurant-menu">
//                 <h2>Menu Card</h2>
//             </div>
//         </>
//     )
// }

// export default RestaurantMenu;

import Shimmer1 from "./Shimmer1";
import { useParams } from "react-router";
import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ResCategory from "./ResCategory";

const RestaurantMenu = () => {
  const { id } = useParams();

  const resInfo = useRestaurantMenu(id);
  const [showIndex, setShowIndex] = useState(0);

  if (resInfo === null) return <Shimmer1 />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    totalRatingsString,
    avgRatingString,
    areaName,
    sla,
    feeDetails,
  } = resInfo?.cards[2]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
  // console.log(itemCards);

//   console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
//   console.log("category below");
//   console.log(categories);
//   console.log("category above");

  return (
    <div className="menu">
      <div className="title1 mb-4">
        Home / India / {resInfo?.cards[0]?.card?.card.text}
      </div>
      <h1 className="heading11">{name}</h1>
      <hr />
      <div className="menucard">
        <div>
          <div className="rating">
            <span className="span">★</span> &nbsp;
            {avgRatingString}({totalRatingsString})&nbsp; • &nbsp;
            {costForTwoMessage}
          </div>
        </div>
        <div className="cuisines">{cuisines}</div>
        <div className="outlet">
          <div className="sc-lizKOf bBYPYZ">
            <div className="sc-fsvrbR jnMRZP"></div>
            <div className="sc-jOnpCo kEBcrx"></div>
            <div className="sc-fsvrbR jnMRZP"></div>
          </div>
          <div className="wewqdiok">
            Outlet
            <span className="card1">&nbsp; &nbsp;{areaName}</span>▾
            <div>{sla?.slaString}</div>
          </div>
        </div>
        <hr />
        <div className="msg">
          <img
            width="20px"
            height="20px"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/v1648635511/Delivery_fee_new_cjxumu"
          />
          {feeDetails?.message.replace("<b>2.3 kms</b>", "2.3 km ")}
        </div>
      </div>
      <div className="boxgray"></div>
      {/* Categories Accordion */}
      {
        categories.map((category , index) => {
          return <ResCategory 
                    key={category?.card?.card?.title} 
                    data={category?.card?.card}
                    showItems={index === showIndex ? true : false}
                    setShowIndex={()=> setShowIndex(index)}
          />
        })
      }
    </div>
  );
};

export default RestaurantMenu;