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
        const restaurants = json.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
        setResList(restaurants);
        setFilteredListData(restaurants);
    }

    const handleSearch = () => {
        const filteredListData = resList.filter((res) => 
            res.info.name.toLowerCase().includes(searchText.toLowerCase())
        )
        setFilteredListData(filteredListData);
    }

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchText(value);
        if (value === "") {
            setFilteredListData(resList);
        }
    };

    return (
        <>
            <div>
                {/* Top bar — search aligned to the right */}
                <div className="flex justify-center items-center px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleSearchInput}
                            placeholder="Search restaurants..."
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-400 w-64"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-orange-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-orange-600"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Restaurant grid — below the search bar */}
                <div className="rest-container px-6 py-6">
                    {filteredListData.map((restaurant) => (
                        <Link
                            key={restaurant.info.id}
                            to={"/restaurant/" + restaurant.info.id}
                        >
                            <RestaurantCard resData={restaurant} />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Body;