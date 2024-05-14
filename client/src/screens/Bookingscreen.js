import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function Bookingscreen(match) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  let { roomid, fromdate, todate } = useParams();
  const firstdate = moment(fromdate , 'DD-MM-YYYY')
  const lastdate = moment(todate , 'DD-MM-YYYY')

  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays()+1
  const [totalamount, settotalamount] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", { roomid: roomid })
        ).data;

        setRoom(data);
        settotalamount(room ?  room.room.rentperday * totaldays : 0)
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
    
  }, []);

  

  async function bookRoom(){
    const bookingDetails = {
      room,
      userid: JSON.parse( localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays
    }

    try {
      const result = await axios.post('/api/bookings/bookroom ', bookingDetails)
    } catch (error){

    }
  }


  return (
    <div className="m-5">
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error...</h1>
      ) : (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.room.name}</h1>
              <img src={room.room.imageurls[0]} alt="" className="smallimg" />
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name: </p>
                  <p>From Date: {fromdate} </p>
                  <p>To Date: {todate} </p>
                  <p>Max Count: {room.room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days : {totaldays}</p>
                  <p>Rent per day : {room.room.rentperday}</p>
                  <p>Total Amount : { room.room.rentperday * totaldays }</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={bookRoom}>Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;