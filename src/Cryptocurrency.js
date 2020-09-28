import React, { useState, useEffect } from "react";
import fetch from "node-fetch";
import _ from "underscore";

// import idToName from './idToName.json';

import Currency from "./components/Currency";
import NewCoin from "./components/NewCoin";
import TableTop from "./components/TableTop";
import Total from "./components/Total";
// import image from './background-image.jpg';

const Cryptocurrency = (props) => {
  const [worth, setWorth] = useState({});
  const [currencyIds, setCurrencyIds] = useState([]);
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    const getCoinAndValue = () => {
      const idList = !!localStorage.getItem("currencies") ? _.uniq(localStorage.getItem("currencies").split(",")) : [];

      idList.forEach((coin) => {
        const headers = new Headers();
        headers.append(
          "X-CoinAPI-Key",
          "d7D956CC7-45A8-47C0-9AC9-3261A9F1F876"
        );
        fetch(`https://rest-sandbox.coinapi.io/v1/exchangerate/${coin}/GBP`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CoinAPI-Key": "7D956CC7-45A8-47C0-9AC9-3261A9F1F876",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const value = localStorage.getItem(`${coin}`);
            setWorth({ ...worth, [data.asset_id_base]: value });
            const ids = idList.join(",");
            localStorage.setItem("currencies", ids);
            console.log(currencies);
              setCurrencies( {...currencies,
                [data.asset_id_base]: {
                  name: data.asset_id_base,
                  price: data.rate,
                  id: data.asset_id_base,
                },
              });
          });
      });
    };
    if (localStorage.getItem("currencies")) {
      const idList = _.uniq(localStorage.getItem("currencies").split(","));
      setCurrencyIds(idList);
    }
    setTimeout(() => {
      console.log(currencyIds)
      getCoinAndValue(currencyIds);
   
    }, 200);

    // setInterval(() => {
    //   console.log(currencies);
    //   // update price and exhcnage rate only
    //   getCoinAndValue(currencyIds);
    // }, 60000);
  }, []);

  const handleInputChange = (name, value) => {
    value.match(/^[0-9]{0,}([.][0-9]{1,})?$/)
      ? this.setWorth({
          worth: { ...worth, [name]: value },
        })
      : this.setWorth({
          worth: { ...worth, [name]: 0 },
        });
  };

  const addCoin = (coin) => {
    if (coin) {
      const value = prompt("Please enter the amount");
      coin = coin.trim().replace(" ", "-").toUpperCase();
      console.log(`getting coin ${coin}, beep, boop, beep`);
      const idList = currencyIds.concat(coin) || [coin];
      if (currencyIds.includes(coin)) {
        alert("This is a repeat request!");
      } else {
        fetch(`https://rest-sandbox.coinapi.io/v1/exchangerate/${coin}/GBP`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CoinAPI-Key": "7D956CC7-45A8-47C0-9AC9-3261A9F1F876",
          },
        })
          .then((res) => res.json())
          .then((data, err) => {
            if (data.error) {
              this.currencyInputRef.value = null;
              throw new Error("Invalid Coin");
            }
            localStorage.setItem("currencies", idList.join(","));
            if (value.match(/^[0-9]{0,}([.][0-9]{1,})?$/))
              localStorage.setItem(`${coin}`, value);
            else localStorage.setItem(`${coin}`, 0);
            setCurrencies({
              ...currencies,
              [data.asset_id_base]: {
                name: data.asset_id_base,
                price: data.rate,
                id: data.asset_id_base,
              },
            });
            setCurrencyIds(idList);
            setWorth({
              ...worth,
              [data.asset_id_base]: value.match(/^[0-9]{0,}([.][0-9]{1,})?$/)
                ? value
                : 0,
            });
          })
          .catch(() => alert("this coin doesn't exist"));
      }
    }
  };

  const editValue = (id, name) => {
    const storageName = name.toLowerCase();
    const value = prompt("Please enter the amount");
    if (value && value.match(/^[0-9]{0,}([.][0-9]{1,})?$/)) {
      localStorage.removeItem(`${storageName}`);
      localStorage.setItem(`${storageName}`, value);
      setWorth({
        worth: { ...this.state.worth, [name]: value },
      });
    }
  };

  const removeCoin = (name) => {
    console.log("removing coin " + name);
    const id = name.replace(" ", "-").toLowerCase();
    const index = this.state.currencyIds.indexOf(id);
    const start = index === 0 ? index - 1 : 0;
    // const newCurrencyIds = this.state.currencyIds
    //   .slice(start, index)
    //   .concat(this.state.currencyIds.slice(index + 1));
    const savedList = localStorage.getItem("currencies").split(",");
    localStorage.removeItem("currencies");
    localStorage.removeItem(`${id}`);
    localStorage.setItem(
      "currencies",
      savedList
        .slice(start, index)
        .concat(savedList.slice(index + 1))
        .join(",")
    );
    setCurrencies(_.omit(currencies, name));
    setWorth(_.omit(worth, name));
  };

  return (
    <div className="section">
      <div className="add_coin">
        <h2>Cryptocurrency Widgit</h2>
        <table className="centerTable">
          <tbody>
            <TableTop />
            {currencies
              ? _.map(currencies, (coin) => (
                  <Currency
                    data={coin}
                    worth={worth}
                    handleInputChange={handleInputChange}
                    editValue={editValue}
                    removeCoin={removeCoin}
                  />
                ))
              : null}
            <NewCoin addCoin={addCoin} />
          </tbody>
        </table>
        <div>
          <Total currencies={currencies} worth={worth} />
        </div>
      </div>
    </div>
  );
};

export default Cryptocurrency;
