import React, { useEffect, useState } from "react";
import { SERVER_API_URL } from '../../server/server';
import axios from "axios";
import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

const Bargains = () => {
    const [form, setForm] = useState({
        main_category: "",
        max_discount_percent: "",
        attempt_limit: "",
        counter_buffer: "",
        status: true
    });
    const [editId, setEditId] = useState(null);
    const [offers, setOffers] = useState([]);

    const getData = async () => {
        const res = await axios.get(`${SERVER_API_URL}/api/bargains`);
        setOffers(res.data.data);
    }

    useEffect(() => {
        getData();
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        try {

            if (editId) {

                await axios.put(
                    `${SERVER_API_URL}/api/bargains/${editId}`,
                    form
                );

            } else {

                await axios.post(
                    `${SERVER_API_URL}/api/bargains`,
                    form
                );

            }

            getData();

            setEditId(null);

            setForm({
                main_category: "",
                max_discount_percent: "",
                attempt_limit: "",
                counter_buffer: 20,
            });

        } catch (err) {
            console.log(err);
        }
    };

    const deleteOffer = async (id) => {
        await axios.delete(`${SERVER_API_URL}/api/bargains/${id}`);
        getData();
    }
    return (
        <>
            {/* <Header /> */}
            <div className='main-layout'>
                <div className='sidebar-layout'>
                    <Sidebar />
                </div>
                <div className='component-layout'>

                    <div className="offer-page">

                        <div className="offer-card">

                            <h2>Bargain Offer Settings</h2>

                            <form onSubmit={submit}>

                                <select
                                    value={form.main_category}
                                    onChange={(e) => setForm({ ...form, main_category: e.target.value })}
                                >

                                    <option>Select Category</option>
                                    <option value="" disabled>
                                        Select Category
                                    </option>
                                    <option value="eyewear">Eyewear</option>
                                    <option value="footwear">Footwear</option>
                                    <option value="jewellery">Jewellery</option>
                                    <option value="purse">Purse</option>
                                    <option value="clothings">Clothings</option>

                                </select>

                                <input
                                    type="number"
                                    placeholder="Maximum Discount %"
                                    value={form.max_discount_percent}
                                    onChange={(e) => setForm({ ...form, max_discount_percent: e.target.value })}
                                />

                                <input
                                    type="number"
                                    placeholder="Attempt Limit"
                                    value={form.attempt_limit}
                                    onChange={(e) => setForm({ ...form, attempt_limit: e.target.value })}
                                />

                                <input
                                    type="number"
                                    placeholder="Counter Buffer"
                                    value={form.counter_buffer}
                                    onChange={(e) => setForm({ ...form, counter_buffer: e.target.value })}
                                />

                                <label className="switch">

                                    <input
                                        type="checkbox"
                                        checked={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.checked })}
                                    />

                                    <span className="slider"></span>

                                </label>

                                <button>Create Offer</button>

                            </form>

                        </div>


                        <div className="table-card">

                            <table>

                                <thead>

                                    <tr>

                                        <th>Category</th>
                                        <th>Discount</th>
                                        <th>Attempt</th>
                                        <th>Buffer</th>
                                        <th>Status</th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        offers.map(item => (

                                            <tr key={item.id}>

                                                <td>{item.main_category}</td>

                                                <td>{item.max_discount_percent}%</td>

                                                <td>{item.attempt_limit}</td>

                                                <td>{item.counter_buffer}%</td>

                                                <td>

                                                    {
                                                        item.status
                                                            ?
                                                            <span className="active">Active</span>
                                                            :
                                                            <span className="inactive">Inactive</span>
                                                    }

                                                </td>

                                                <td>

                                                    <button
                                                        className="edit"
                                                        onClick={() => {
                                                            setEditId(item.id);

                                                            setForm({
                                                                main_category: item.main_category,
                                                                max_discount_percent: item.max_discount_percent,
                                                                attempt_limit: item.attempt_limit,
                                                                counter_buffer: item.counter_buffer,
                                                                status: item.status
                                                            });

                                                            window.scrollTo({
                                                                top: 0,
                                                                behavior: "smooth"
                                                            });
                                                        }}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="delete"
                                                        onClick={() => deleteOffer(item.id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )

}
export default Bargains