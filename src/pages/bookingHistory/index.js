import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { getBooking, getBookingOwner } from "../../api/bookingAPI";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const [tab, setTab] = useState(false);
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const [items, setItems] = useState(Data);
  const [all, setAll] = useState(true);

  useEffect(() => {
    if (!Cookies.get("access-token")) {
      navigate("/");
    }
  }, [navigate]);

  const [filter_data, setFilterData] = useState({
    per_day_price: 2000,
    per_hour_price: 2000,
    price_per_km: 2000,
    date: new Date().toISOString().slice(0, 10),
    status: "none",
    brand: "none",
  });

  const filter_by_status = [
    "Pending",
    "Accepted",
    "Rejected",
    "In Progress",
    "Completed",
    "Cancelled",
  ];
  const filter_by_brands = ["Mahindra", "John Deer", "CLAAS"];

  async function Booking() {
    const { data } = await getBooking();
    console.log(data, "getBooking");
    setData(data);
    setItems(data); // Ensure that items are updated after fetching data
  }

  useEffect(() => {
    Booking();
  }, []);

  const filter = ({ type }) => {
    if (all) {
      setItems(Data);
    } else {
      let filteredData = Data;
      switch (type) {
        case "status":
          filteredData = Data.filter((item) => item.status === filter_data.status);
          break;
        case "brands":
          filteredData = Data.filter(
            (item) => item.equipment.manufacturer === filter_data.brand
          );
          break;
        case "date":
          filteredData = Data.filter(
            (item) => item.created_at.slice(0, 10) === filter_data.date
          );
          break;
        default:
          break;
      }
      setItems(filteredData);
    }
  };

  async function BookingOwner() {
    const { data } = await getBookingOwner();
    console.log(data, "getBooking");
    setData(data);
    setItems(data); // Ensure that items are updated after fetching data
  }

  return (
    <div>
      <div className="p-3 pt-0">
        <div className="flex mb-7">
          <button
            className={`w-1/2 py-4 ${!tab && "text-[#68AC5D] border-b-[#68AC5D] border-b-2"}`}
            onClick={() => {
              setTab(false);
              Booking();
            }}
          >
            Customer
          </button>
          <button
            className={`w-1/2 py-4 ${tab && "text-[#68AC5D] border-b-[#68AC5D] border-b-2"}`}
            onClick={() => {
              setTab(true);
              BookingOwner();
            }}
          >
            Owner
          </button>
        </div>
        <div className="flex max-w-7xl mx-auto">
          <div
            className="flex w-1/4 flex-col rounded-b-3xl"
            style={{ boxShadow: "0px 15px 15px rgba(104, 172, 93, 0.5)" }}
          >
            <div className="bg-[#68AC5D] p-6 rounded-t-3xl">
              <h1 className="text-white font-semibold text-xl text-center">
                Booking Filters
              </h1>
            </div>
            <div className="border-x-2 p-4">
              <div className="flex flex-col">
                <h1 className="font-bold text-lg text-[#4F4F4F] underline mb-3 decoration-[#68AC5D]">
                  Status
                </h1>
                {filter_by_status.map((item, i) => (
                  <button
                    className="text-left mb-1"
                    key={i}
                    onClick={() => {
                      setAll(false);
                      setFilterData({ ...filter_data, status: item });
                      filter({ type: "status" });
                    }}
                  >
                    {item}
                  </button>
                ))}
                <h1 className="font-bold text-lg text-[#4F4F4F] underline mb-3 mt-6 decoration-[#68AC5D]">
                  Brands
                </h1>
                {filter_by_brands.map((item, i) => (
                  <button
                    className="text-left mb-1"
                    key={i}
                    onClick={() => {
                      setAll(false);
                      setFilterData({ ...filter_data, brand: item });
                      filter({ type: "brands" });
                    }}
                  >
                    {item}
                  </button>
                ))}
                {/* Price and other filters... */}
              </div>
            </div>
          </div>
          <div className="w-3/4 p-5 rounded-2xl border border-[#4F4F4F] m-2">
            {items.length > 0 ? (
              <div>
                <h1 className="text-xl font-semibold text-[#4F4F4F]">Booking History</h1>
                <div>
                  <table className="w-full mt-4">
                    <thead className="border-b bg-gray-200">
                      <tr>
                        <th className="py-4">Date</th>
                        <th className="py-4">Booking ID</th>
                        <th className="py-4">Equipment Name</th>
                        <th className="py-4">Manufacturer</th>
                        <th className="py-4">Request Status</th>
                        <th className="py-4">All Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, i) => (
                        <tr key={i} className="bg-white border-b text-center hover:bg-gray-100">
                          <td className="py-1 text-lg">{format(new Date(item.created_at), "yyyy-MM-dd")}</td>
                          <td className="py-1 text-lg">{item.booking_id}</td>
                          <td className="py-1 text-lg">{item.equipment.title}</td>
                          <td className="py-1 text-lg">{item.equipment.manufacturer}</td>
                          <td className="py-1 text-lg">{item.status}</td>
                          <td className="py-1 text-lg">
                            <button onClick={() => navigate(`/bookingRequest/${item.id}`)} className="text-blue-400 cursor-pointer">
                              All Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="h-full">
                <h1 className="text-4xl font-bold text-[#4f4f4f] relative left-1/3 top-1/2">
                  Nothing to show here... :(
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
