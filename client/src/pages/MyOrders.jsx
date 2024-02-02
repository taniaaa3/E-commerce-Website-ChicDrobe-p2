import React, { useEffect, useState } from 'react'
import { useOrder } from '../context/useOrder'
import ReactPaginate from 'react-paginate';

const MyOrders = ({ userData }) => {
    const { orders, orderHistory } = useOrder();
    const [count, setCount] = useState(0);
    useEffect(() => {
        orderHistory();
    //    console.log(orders.map((val) => {
    //     val.products[0].products[0] ? val.products.map((me)=>{
    //             return (me);
    //         })
    //     : console.log('not working');}
    //     ))
    })
    const cancelOrder = async (orderID) => {
        await axios.put(`http://192.168.1.109:3003/order/cancelorder`, { orderID }).then((res) => {
            console.log(res);
            adminPanelOrders();
            toast.success(res.data.msg);
        }).catch((err) => {
            console.log(err);
            toast.error(err);
        })
    }
    return (
        // <div className='w-full'>

        // </div>
        <>
            {
                orders.length != 0 ?
                    <>
                        <div className="overflow-y-hidden h-screen w-full">
                            <div className="flex flex-col justify-center  items-center self-center">
                                <div className="mx-auto w-full px-4 py-8 h-screen flex flex-col justify-evenly">
                                    <div className="overflow-y-auto rounded-lg border">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-purple-500 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                                        <th className="px-5 py-3">Sr No.</th>
                                                        <th className="px-5 py-3">UserID</th>
                                                        <th className="px-5 py-3">User Name</th>
                                                        <th className="px-5 py-3">Address</th>
                                                        <th className="px-5 py-3">OrderID</th>
                                                        <th className="px-5 py-3">Product Names</th>
                                                        <th className="px-5 py-3">Product Images</th>
                                                        <th className="px-5 py-3">Payment Method</th>
                                                        <th className="px-5 py-3">Status</th>
                                                        <th className="px-5 py-3">Action</th>
                                                    </tr>
                                                </thead>
                                                {orders.slice(count, count + 3).map((val, i) => {
                                                    return (
                                                        <>
                                                            <tbody className="text-gray-500">
                                                                <tr>
                                                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                        <p className="whitespace-no-wrap text-center">{i + 1}</p>
                                                                    </td>
                                                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                        <p className="whitespace-no-wrap">{val.userID}</p>
                                                                    </td>
                                                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                        <p className="whitespace-no-wrap">{userData.firstName} {userData.lastName}</p>
                                                                    </td>
                                                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                        <p className="whitespace-no-wrap">{val.address.fullName} <br /> {val.address.phoneNumber} <br /> {val.address.address1}{val.address.address2} {val.address.city},{val.address.state} {val.address.pincode}</p>
                                                                    </td>
                                                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                        <span className="whitespace-no-wrap">{val.orderID == "Same as '_id'" ? val._id : val.orderID}</span>
                                                                    </td>
                                                                    <td className="border-b border-gray-200 bg-white w-full py-4 text-sm">
                                                                        <span className="whitespace-no-wrap">{val.products[0].product ? <span className='w-full block border border-black p-1 mt-2'>{ val.products[0].product.title} </span>
                                                                        // : val.products[0].products[0] ? val.products[0].products[0].cartItem.title 
                                                                        : val.products[0].products[0] ? val.products.map((me)=>{
                                                                            return <span className='w-full block border border-black p-1 mt-2'> {me.products[0].cartItem.title} </span>
                                                                        }) 
                                                                        : "Product names"}</span>
                                                                    </td>
                                                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                        {val.products[0].product ? <img src={`/uploads/${val.products[0].product.image1}`} alt="Product Image"  className='mt-2'/>
                                                                        : val.products[0].products[0] ? val.products.map((me)=>{
                                                                            return <img src={`/uploads/${me.products[0].cartItem.image1}`} alt="Product Image"  className='mt-2'/>
                                                                        }) : 
                                                                        <img src="/uploads/2pieceset.jpg" alt="Product Image"  className='mt-2'/>}
                                                                    </td>
                                                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                        <span className="whitespace-no-wrap">{val.paymentMethod}</span>
                                                                    </td>
                                                                    <td className={`border-b border-gray-200 bg-white px-5 py-5 text-sm`}>
                                                                        <span className={`${val.status == "Active" ? "text-green-900 bg-green-200" : val.status == "Cancelled" ? "text-red-900 bg-red-200" : val.status == "Delivered" ? "text-green-900 bg-green-200" : "text-red-900 bg-red-200"} rounded-full px-3 py-1 text-xs font-semibold`}>{val.status}</span>
                                                                    </td>

                                                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                        {val.status == "Active" ?
                                                                            <button className=" rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900" onClick={() => { cancelOrder(val.orderID) }}>Cancel</button>
                                                                            : ""}</td>
                                                                </tr>
                                                            </tbody>
                                                        </>
                                                    )
                                                })
                                                }
                                            </table>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <ReactPaginate className="flex border border-purple-400 w-full flex-row justify-center items-center" pageClassName="p-2 m-2" activeClassName="px-4 rounded-full bg-purple-400" onPageChange={(e) => setCount((e.selected * 3) % orders.length)} pageRangeDisplayed={1} marginPagesDisplayed={2} breakLabel="..." renderOnZeroPageCount={null} pageCount={orders.length / 3} previousClassName='' />
                                    </div>
                                </div>
                                <div className='border border-[#CDB4DB] w-full'></div>


                            </div>
                        </div>
                    </>
                    :
                    <div className='m-5 flex flex-col w-full justify-center items-center self-center'>
                        <i className='fa fa-bag-shopping text-7xl m-2'></i>
                        <h1 className='sm:text-5xl text-xl font-bold'>No Orders Placed :(</h1>
                    </div>}
        </>
    )
}

export default MyOrders