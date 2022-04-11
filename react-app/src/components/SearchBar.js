import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './SearchBar.css'
import { FcCancel } from "react-icons/fc"
const Search = () => {
    const event = useSelector((state) => Object.values(state.events))
    const [filteredEvents, setfilteredEvents] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        setSearch('')
    },[])

    useEffect(() => {
        if (search === ""){
            return setSearch("")
        } else {
            setSearch(search)
        }

        const filtered = event?.filter((value, key) => {
            if(value === ''){
                return value;
            }else if (value?.eventName.toLowerCase().includes(search?.toLowerCase())) return value
        })
        setfilteredEvents(filtered)

    }, [search])

    return (
        <div className='search-bar'>
            <div className='search-input'>
                <input
                    type='text'
                    placeholder='Search'
                    onChange={(e) => setSearch(e.target.value) }
                    value={search}
                />
                    <button className='cancel'><FcCancel className='cancel-button' onClick={() => setSearch("")}/></ button>
            </div>
            {search &&(
                <div className='search-results'>
                    {filteredEvents?.map((ele, key) => {
                        return <NavLink className='search-item' to={`/events/${ele?.id}`} onClick={() => setSearch("")}>
                            <p>{ele?.eventName} </p>
                            </NavLink>
                    })}
                </div>
            )} 
        </div>
    )
}

export default Search