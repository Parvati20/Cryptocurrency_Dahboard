import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Charts from "./components/Charts/Charts.jsx";
import Currency from "./components/Currency/Currency.jsx";
import Exchange from "./components/Exchange/Exchange.jsx";
import Header from "./components/Header/Header.jsx";
import Portfolio from "./components/Portfolio/Portfolio.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import TopCoins from "./components/TopSection/TopCoins.jsx";
import Login from './components/Header/Login.jsx'; // Adjust path if necessary
import Signup from './components/Header/Signup.jsx'; // Adjust path if necessary


function App() {
  const currency = useSelector((state) => state.globalStore.currency);
  const symbol = useSelector((state) => state.globalStore.symbol);

  return (
    <Router>
      <div className="min-h-screen bg-light-fill dark:bg-dark-fill text-light-base dark:text-dark-base">
        <header>
          <Header />
        </header>
        <Routes>
          <Route path="/" element={
            <div className="p-4">
              <div className="bg-light-muted dark:bg-dark-muted duration-100 rounded-xl p-4 m-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
                <main className="grid gap-4 lg:col-span-3">
                  <div className="grid gap-4 grid-cols-9 grid-rows-1">
                    <section className="dashboard_item col-span-2 text-light-base dark:text-dark-base text-sm sm:text-base">
                      <Currency />
                    </section>
                    <section className="dashboard_item col-span-7 bg-light-fill dark:bg-dark-fill text-light-base dark:text-dark-base">
                      <SearchBar currency={currency} symbol={symbol} />
                    </section>
                  </div>
                  <section className="dashboard_item h-[525px] bg-light-fill dark:bg-dark-fill text-light-base dark:text-dark-base">
                    <Charts currency={currency} symbol={symbol} />
                  </section>
                  <div className="grid md:grid-cols-2 gap-4">
                    <section className="dashboard_item md:col-span-1 bg-light-fill dark:bg-dark-fill text-light-base dark:text-dark-base">
                      <Portfolio />
                    </section>
                    <section className="dashboard_item md:col-span-1 bg-light-fill dark:bg-dark-fill text-light-base dark:text-dark-base">
                      <Exchange />
                    </section>
                  </div>
                </main>
                <aside className="dashboard_item lg:col-span-1 bg-light-fill dark:bg-dark-fill text-light-base dark:text-dark-base">
                  <TopCoins currency={currency} />
                </aside>
              </div>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;