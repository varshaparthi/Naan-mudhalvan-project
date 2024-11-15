import React, { useContext, useEffect, useState } from "react";
import "../styles/LandingPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GeneralContext } from "../context/GeneralContext";

const LandingPage = () => {
  const [error, setError] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userType") === "admin") {
      navigate("/admin");
    } else if (localStorage.getItem("userType") === "flight-operator") {
      navigate("/flight-admin");
    }
  }, []);

  const [Flights, setFlights] = useState([]);

  const fetchFlights = async () => {
    if (checkBox) {
      if (
        departure !== "" &&
        destination !== "" &&
        departureDate &&
        returnDate
      ) {
        const date = new Date();
        const date1 = new Date(departureDate);
        const date2 = new Date(returnDate);
        if (date1 > date && date2 > date1) {
          setError("");
          await axios
            .get("http://localhost:6001/fetch-flights")
            .then((response) => {
              setFlights(response.data);
              console.log(response.data);
            });
        } else {
          setError("Please check the dates");
        }
      } else {
        setError("Please fill all the inputs");
      }
    } else {
      if (departure !== "" && destination !== "" && departureDate) {
        const date = new Date();
        const date1 = new Date(departureDate);
        if (date1 >= date) {
          setError("");
          await axios
            .get("http://localhost:6001/fetch-flights")
            .then((response) => {
              setFlights(response.data);
              console.log(response.data);
            });
        } else {
          setError("Please check the dates");
        }
      } else {
        setError("Please fill all the inputs");
      }
    }
  };
  const { setTicketBookingDate } = useContext(GeneralContext);
  const userId = localStorage.getItem("userId");

  const handleTicketBooking = async (id, origin, destination) => {
    if (userId) {
      if (origin === departure) {
        setTicketBookingDate(departureDate);
        navigate(`/book-flight/${id}`);
      } else if (destination === departure) {
        setTicketBookingDate(returnDate);
        navigate(`/book-flight/${id}`);
      }
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="landingPage">
      <div className="landingHero">
        <div className="landingHero-title">
          <h1 className="banner-h1">Your Dream Destination Awaits  Book Your Flight in Minutes!</h1>
          <div style={{ display: "flex" }}>
            <p className="banner-p">Your Journey Starts Here  Find the Perfect Flight, Anytime, Anywhere and Fly Smart, Fly Easy  Book Your Dream Flight Today!</p>
          </div>
        </div>

        <div className="Flight-search-container input-container mb-4">
          {/* <h3>Journey details</h3> */}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              value=""
              onChange={(e) => setCheckBox(e.target.checked)}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Two-Way Travel
            </label>
          </div>
          <div className="Flight-search-container-body">
            <div className="form-floating">
              <select
                className="form-select form-select-sm mb-3"
                aria-label=".form-select-sm example"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              >
                <option value="" selected disabled>
                  Select
                </option>
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Banglore">Banglore</option>
                <option value="Delhi">Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
              <label htmlFor="floatingSelect">Departure City</label>
            </div>
            <div className="form-floating">
              <select
                className="form-select form-select-sm mb-3"
                aria-label=".form-select-sm example"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="" selected disabled>
                  Select
                </option>
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Banglore">Banglore</option>
                <option value="Delhi">Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
              <label htmlFor="floatingSelect">Destination City</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="floatingInputstartDate"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
              <label htmlFor="floatingInputstartDate" className="label-fix">
                Journey date
              </label>
            </div>
            {checkBox ? (
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInputreturnDate"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                <label htmlFor="floatingInputreturnDate">Return date</label>
              </div>
            ) : (
              ""
            )}
            <div>
              <button className="btn btn-primary" onClick={fetchFlights}>
                Search
              </button>
            </div>
          </div>
          <p>{error}</p>
        </div>

        {Flights.length > 0 ? (
          <>
            {Flights.filter(
              (Flight) =>
                Flight.origin === departure &&
                Flight.destination === destination
            ).length > 0 ? (
              <>
                <div className="availableFlightsContainer">
                  <h1>Available Flights</h1>

                  <div className="Flights">
                    {checkBox ? (
                      <>
                        {Flights.filter(
                          (Flight) =>
                            (Flight.origin === departure &&
                              Flight.destination === destination) ||
                            (Flight.origin === destination &&
                              Flight.destination === departure)
                        ).map((Flight) => {
                          return (
                            <div className="Flight" key={Flight._id}>
                              <div>
                                <p>
                                  {" "}
                                  <b>{Flight.flightName}</b>
                                </p>
                                <p>
                                  <b>Flight Number:</b> {Flight.flightId}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <b>Start :</b> {Flight.origin}
                                </p>
                                <p>
                                  <b>Departure Time:</b> {Flight.departureTime}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <b>Destination :</b> {Flight.destination}
                                </p>
                                <p>
                                  <b>Arrival Time:</b> {Flight.arrivalTime}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <b>Starting Price:</b> {Flight.basePrice}
                                </p>
                                <p>
                                  <b>Available Seats:</b> {Flight.totalSeats}
                                </p>
                              </div>
                              <button
                                className="button btn btn-primary"
                                onClick={() =>
                                  handleTicketBooking(
                                    Flight._id,
                                    Flight.origin,
                                    Flight.destination
                                  )
                                }
                              >
                                Book Now
                              </button>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {Flights.filter(
                          (Flight) =>
                            Flight.origin === departure &&
                            Flight.destination === destination
                        ).map((Flight) => {
                          return (
                            <div className="Flight">
                              <div>
                                <p>
                                  {" "}
                                  <b>{Flight.flightName}</b>
                                </p>
                                <p>
                                  <b>Flight Number:</b> {Flight.flightId}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <b>Start :</b> {Flight.origin}
                                </p>
                                <p>
                                  <b>Departure Time:</b> {Flight.departureTime}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <b>Destination :</b> {Flight.destination}
                                </p>
                                <p>
                                  <b>Arrival Time:</b> {Flight.arrivalTime}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <b>Starting Price:</b> {Flight.basePrice}
                                </p>
                                <p>
                                  <b>Available Seats:</b> {Flight.totalSeats}
                                </p>
                              </div>
                              <button
                                className="button btn btn-primary"
                                onClick={() =>
                                  handleTicketBooking(
                                    Flight._id,
                                    Flight.origin,
                                    Flight.destination
                                  )
                                }
                              >
                                Book Now
                              </button>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="availableFlightsContainer">
                  <h1> No Flights</h1>
                </div>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
