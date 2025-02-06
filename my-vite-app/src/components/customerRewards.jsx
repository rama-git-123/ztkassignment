import React, { useState, useEffect } from "react";

const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, customer: "Alice", amount: 120, date: "2024-01-15" },
        { id: 2, customer: "Bob", amount: 75, date: "2024-01-20" },
        { id: 3, customer: "Alice", amount: 200, date: "2024-02-10" },
        { id: 4, customer: "Bob", amount: 50, date: "2024-02-15" },
        { id: 5, customer: "Alice", amount: 90, date: "2024-03-05" },
      ]);
    }, 1000);
  });
};

const calculateRewards = (transactions) => {
  const rewards = {};

  transactions.forEach(({ customer, amount, date }) => {
    const month = new Date(date).toLocaleString("default", { month: "long" });

    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2 + 50; // 2 points over $100, 1 point for $50-$100
    } else if (amount > 50) {
      points += amount - 50;
    }

    if (!rewards[customer]) rewards[customer] = {};
    if (!rewards[customer][month]) rewards[customer][month] = 0;

    rewards[customer][month] += points;
  });

  return rewards;
};

const CustomerRewards = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState({});

  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data);
      setRewards(calculateRewards(data));
    });
  }, []);

  return (
    <div>
      <h2>Customer Rewards</h2>
      {Object.keys(rewards).map((customer) => (
        <div key={customer}>
          <h3>{customer}</h3>
          {Object.keys(rewards[customer]).map((month) => (
            <p key={month}>
              {month}: {rewards[customer][month]} points
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CustomerRewards;
