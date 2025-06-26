import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DataVisualization from './components/DataVisualization';
import { getApod, getMarsPhotos, getEpic, getNeoWs, searchNasaImages } from './services/apiService';
import './App.css';


let searchTimeout = null;

const fetchApodRange = async (days, endDate) => {
  const results = [];
  const end = endDate ? new Date(endDate) : new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(end);
    date.setDate(end.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const apod = await getApod(dateStr);
    results.push(apod);
  }
  return results;
};

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [selectedDate, setSelectedDate] = useState('');
  const [dataSource, setDataSource] = useState('apod');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let result;
        if (dataSource === 'apod') {
          // Always fetch an array for the chart, up to the selected date (or today)
          const endDate = selectedDate || undefined;
          result = await fetchApodRange(7, endDate);
        } else if (dataSource === 'mars') {
          result = await getMarsPhotos();
        } else if (dataSource === 'epic') {
          result = await getEpic();
        } else if (dataSource === 'neo') {
          result = await getNeoWs();
        } else if (dataSource === 'images') {
          result = await searchNasaImages(searchTerm || 'mars');
        }
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (dataSource === 'images') {
      // Debounce search for NASA Images
      if (searchTimeout) clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        fetchData();
      }, 400);
      return () => clearTimeout(searchTimeout);
    } else {
      fetchData();
    }
  }, [dataSource, selectedDate, searchTerm]);

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setLoading(true);
    setError(null);
    try {
      const apodData = await getApod(date);
      setData(apodData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomApod = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch a random date
      const start = new Date(1995, 5, 16); // APOD start date
      const end = new Date();
      const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      const dateStr = randomDate.toISOString().split('T')[0];
      const apod = await getApod(dateStr);
      setData(apod); // Set as a single object
      setSelectedDate(dateStr);
    } catch (err) {
      setError('Failed to fetch random APOD');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  return (
    <Router>
      <div className="app-bg">
        <header className="app-header">
          <h1>
            <span role="img" aria-label="rocket">🚀</span> NASA <span style={{ color: "#4fd1c5" }}>Data Visualization</span>
          </h1>
          <div className="controls">
            <select
              value={dataSource}
              onChange={e => setDataSource(e.target.value)}
              className="data-source-picker"
            >
              <option value="apod">APOD</option>
              <option value="mars">Mars Rover Photos</option>
              <option value="epic">EPIC Images</option>
              <option value="neo">Near Earth Objects</option>
              <option value="images">NASA Image/Video Library</option>
            </select>
            {dataSource === 'apod' && (
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                max={new Date().toISOString().split('T')[0]}
                className="date-picker"
              />
            )}
            <button className="theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
            </button>
            {dataSource === 'apod' && (
              <button className="random-btn" onClick={handleRandomApod}>
                🎲 Random APOD
              </button>
            )}
            {dataSource === 'images' && (
              <input
                type="text"
                placeholder="Search NASA Images"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
              />
            )}
          </div>
        </header>
        <main>

          <DataVisualization data={data} theme={theme} dataSource={dataSource} />
        </main>
      </div>
    </Router>
  );
};

export default App;