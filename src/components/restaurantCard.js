const RestaurantCard = (props) => {
    const {name, cuisines, costForTwo} = props?.resListData?.info;

    return (
        <div>
            <h1>name: {name}</h1>
            <h2>cusines: {cuisines?.join(', ')}</h2>
            <h3>Price: {costForTwo}</h3>
        </div>
    )
}

export default RestaurantCard;