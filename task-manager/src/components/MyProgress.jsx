import React, { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { ref, set, onValue } from 'firebase/database';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Dropdown } from 'react-bootstrap';
import { addWidget, deleteWidget, getWidgets } from '../services/service';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
function MyProgress() {
  const [weight, setWeight] = useState('');
  const [weights, setWeights] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [addingWidget, setAddingWidget] = useState(false);

  const handleAddWidget = (e) => {
    e.preventDefault();
    addWidget(newWidgetName, newStartDate).then(() => {
      setNewWidgetName('');
      setNewStartDate('');
      setAddingWidget(false);
    });
  };

  useEffect(() => {
    getWidgets((fetchedWidgets) => {
      setWidgets(fetchedWidgets);
    });
  }, []);

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
  const calculateTimeElapsed = (startDate) => {
    const now = new Date();
    const elapsed = now - new Date(startDate);
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsed / 1000 / 60) % 60);
    const seconds = Math.floor((elapsed / 1000) % 60);

    return `${days} days ${hours}:${minutes}:${seconds}`;
  };

  const handleDeleteWidget = (id) => {
    deleteWidget(id).then(() => {
      setWidgets((prevWidgets) => prevWidgets.filter(widget => widget.id !== id));
    });
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWidgets((prevWidgets) => [...prevWidgets]);
    }, 1000);

    return () => clearInterval(intervalId);
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
      {addingWidget ? (
        <form onSubmit={handleAddWidget} className="mb-4">
          <div className="mb-3">
            <label className="form-label">Widget Name</label>
            <input
              type="text"
              className="form-control"
              value={newWidgetName}
              onChange={(e) => setNewWidgetName(e.target.value)}
              placeholder="Enter widget name"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={newStartDate}
              onChange={(e) => setNewStartDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Add Widget</button>
        </form>
      ) : (
        <Dropdown className="position-fixed" style={{ top: '10px', right: '10px' }}>
          <Dropdown.Toggle
            variant="light"
            className="rounded-circle"
            style={{ fontSize: '36px', padding: '10px' }}
          >
            +
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setAddingWidget(true)}>Add Timer</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      <div className="row">
        {widgets.map((widget, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="weight-form-container shadow-sm">
              <div className="card-body">
                <h4 className="text-center">{widget.name}</h4>
                <p className="text-center">{calculateTimeElapsed(widget.startDate)}</p>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => handleDeleteWidget(widget.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
