// component renders the filtered coins

// Library imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncHistoricData } from "../../common/cryptoSlice/chartSlice";

const FilteredSearch = ({ coin, setIsOpen, setCoin }) => {
  const symbol = useSelector((state) => state.globalStore.symbol);
  const coinIds = useSelector((state) => state.globalStore.coinIds);
  const days = useSelector((state) => state.globalStore.days);
  const dispatch = useDispatch();

  return (
    <div
      className="cursor-pointer py-4 px-4 hover:bg-light-list-hover dark:hover:bg-dark-list-hover rounded-lg font-semibold flex justify-around items-center"
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(false);
        setCoin(coin?.name);
        dispatch(
          fetchAsyncHistoricData({
            id: coin,
            currency: symbol,
            days: days,
          })
        );
      }}>
      <img src={coin?.image} alt={coin?.name} width="40px" />
      <div className="">{coin?.name}</div>
      <div className="">
        {symbol}
        {coin?.current_price}
      </div>
    </div>
  );
};

export default FilteredSearch;
