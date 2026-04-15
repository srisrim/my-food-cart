import { useEffect, useState } from 'react';
import RestaurantCard from './restaurantCard';
import { useState } from "react";
import {API_URL} from '../constants/common'
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setAllRestaurants, setLoading } from '../store/restaurantsSlice';
import Modal from './modal';

const Body = () => {
    const [searchText, setSearchText] = useState("");
    // const [resList, setResList] = useState([]);
    const [filteredListData, setFilteredListData] = useState([]);
    const dispatch = useDispatch();

    // read data from store
    const { list, loading } = useSelector((state) => state.restaurants); // list it the key inside my slice

    useEffect(() => {
        fetchRestaurantList();
    }, []);

    const fetchRestaurantList = async () => {
        dispatch(setLoading(true));
        const response = await fetch(API_URL);
        const json = await response.json();
        const restaurants = json.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
        dispatch(setAllRestaurants(restaurants));
        // setResList(restaurants);
        setFilteredListData(restaurants);
        dispatch(setLoading(false));
    }

    const handleSearch = () => {
        const filteredListData = list.filter((res) => 
            res.info.name.toLowerCase().includes(searchText.toLowerCase())
        )
        setFilteredListData(filteredListData);
    }

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchText(value);
        if (value === "") {
            setFilteredListData(list);
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
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-gray-100" />
                            ))}
                        </div>
                    ) : filteredListData.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <p className="text-4xl mb-3">🔍</p>
                            <p>No items found. Try a different search.</p>
                        </div>
                    ) : (
                        <>
                            {
                                filteredListData?.map((restaurant) => (
                                    <Link
                                        key={restaurant.info.id}
                                        to={"/restaurant/" + restaurant.info.id}
                                    >
                                        <RestaurantCard resData={restaurant} />
                                    </Link>
                                ))
                            }
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Body;