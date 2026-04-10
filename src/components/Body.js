import { useEffect, useState } from 'react';
import RestaurantCard from './restaurantCard';
import { useState } from "react";
import {API_URL} from '../constants/common'
import { Link } from 'react-router';

const Body = () => {
    const [searchText, setSearchText] = useState("");
    const [resList, setResList] = useState([]);
    const [filteredListData, setFilteredListData] = useState([]);

    useEffect(() => {
        fetchRestaurantList();
    }, []);

    const fetchRestaurantList = async () => {
        const response = await fetch(API_URL);
        const json = await response.json();
        const restaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setResList(restaurants);
        setFilteredListData(restaurants);
    }

    const handleSearch = () => {
        const filteredListData = resList.filter((res) => 
            res.info.name.toLowerCase().includes(searchText.toLowerCase())
        )
        setFilteredListData(filteredListData);
    }

    return (
        <>
            <h1>Body</h1>
            <div>
                <input type="text" value={searchText} 
                    onChange={(e) => setSearchText(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
                <p>{searchText}</p>
            </div>
            <div className='rest-container'>
                {
                    filteredListData.map((restaurant) => (
                        <Link 
                            key={restaurant.info.id}
                            to={'/restaurant/'+ restaurant.info.id}>
                            <RestaurantCard resListData={restaurant} />
                        </Link>
                    ))
                 }
            </div>

        </>
    )
}

export default Body;