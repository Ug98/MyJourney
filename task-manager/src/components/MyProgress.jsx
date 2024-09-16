import React, { useState, useEffect } from 'react';
import { db } from '../firebase.config'; 
import { ref, set, onValue } from 'firebase/database';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function MyProgress() {
  const [weight, setWeight] = useState('');
  const [weights, setWeights] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const addWeight = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0]; 
    const newWeight = {
      value: parseFloat(weight),
      date: currentDate,
    };
    const weightRef = ref(db, 'weights/' + currentDate);
    set(weightRef, newWeight);
    setWeight('');
  };

  useEffect(() => {
    const weightRef = ref(db, 'weights');
    onValue(weightRef, (snapshot) => {
      const data = snapshot.val();
      const weightList = [];
      for (let id in data) {
        weightList.push(data[id]);
      }
      setWeights(weightList);
    });
  }, []);

  const data = {
    labels: weights.map(w => new Date(w.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight Progress',
        data: weights.map(w => w.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      }
    ]
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Progress</h1>
      
      <div className="weight-form-container position-relative">
        <button
          className="btn btn-light position-absolute top-0 end-0 m-2"
          onClick={() => setShowChart(!showChart)}
        >
          <i className="bi bi-bar-chart-fill"></i>
        </button>

        {showChart ? (
          <div className="chart-container">
            <Line data={data} />
          </div>
        ) : (
          <form onSubmit={addWeight} className="d-flex flex-column">
            <h2 className="text-center">Weight Loss</h2>
            <label className="mb-2">Your weight today</label>
            <input
              type="number"
              className="form-control mb-3"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
              required
            />
            <button type="submit" className="btn btn-success">Add</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default MyProgress;
