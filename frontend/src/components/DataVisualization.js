import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getApod } from '../services/apiService';
import './DataVisualization.css';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const DataVisualization = ({ data, theme, dataSource, selectedDate }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch APOD data for the last 7 days
    const fetchChartData = async () => {
      let result;
      if (dataSource === 'apod') {
        if (selectedDate) {
          result = await getApod(selectedDate); // Single APOD for selected date
        } else {
          result = await fetchApodRange(7); // Fetch last 7 days for chart
        }
      }

      if (Array.isArray(result)) {
        const lineColor = theme === 'light' ? '#0077b6' : '#4fd1c5';
        setChartData({
          labels: result.map(d => d.date),
          datasets: [
            {
              label: 'Explanation Length',
              data: result.map(d => d.explanation.length),
              fill: false,
              borderColor: lineColor,
              backgroundColor: lineColor,
              pointBorderColor: lineColor,
              pointBackgroundColor: lineColor,
              tension: 0.1
            }
          ]
        });
      }
    };
    fetchChartData();
  }, [theme, dataSource, selectedDate]);

  if (!data) return <div className="dv-no-data">No data available.</div>;

  // Choose color based on theme
  const chartTextColor = theme === 'light' ? '#222' : '#f8fafc';
  const chartGridColor = theme === 'light' ? 'rgba(0,0,0,0.07)' : 'rgba(200,200,200,0.1)';
  // const lineColor = theme === 'light' ? '#0077b6' : '#4fd1c5';

  if (dataSource === 'apod') {
    const isArray = Array.isArray(data);
    const latest = isArray ? data[data.length - 1] : data;

    return (
      <div className="dv-bg">
        <div className="dv-card">
          <h2 className="dv-title">{latest.title}</h2>
          {latest.media_type === 'image' ? (
            <img className="dv-image" src={latest.url} alt={latest.title} />
          ) : latest.media_type === 'video' ? (
            <div className="dv-video-wrapper">
              <iframe
                src={latest.url}
                title={latest.title}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : null}
          <p className="dv-explanation">{latest.explanation}</p>
          <div className="dv-date">{latest.date}</div>
          {isArray && chartData && (
            <div className="dv-chart-container">
              <Line
                data={chartData}
                options={{
                  plugins: {
                    legend: { labels: { color: chartTextColor } },
                    title: {
                      display: true,
                      text: 'APOD Explanation Length (Last 7 Days)',
                      color: chartTextColor,
                      font: { size: 18 }
                    }
                  },
                  scales: {
                    x: {
                      ticks: { color: chartTextColor },
                      grid: { color: chartGridColor }
                    },
                    y: {
                      ticks: { color: chartTextColor },
                      grid: { color: chartGridColor }
                    }
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (dataSource === 'mars') {
    // Example: show Mars Rover Photos as a gallery
    return (
      <div className={`dv-bg ${theme === 'light' ? 'light' : ''}`}>
        <div className={`dv-card ${theme === 'light' ? 'light' : ''}`}>
          <h2>Mars Rover Photos</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {Array.isArray(data.photos) && data.photos.length > 0 ? (
              data.photos.slice(0, 12).map(photo => (
                <img key={photo.id} src={photo.img_src} alt={photo.camera.full_name} style={{ width: 200 }} />
              ))
            ) : (
              <p>No photos found.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (dataSource === 'epic') {
    return (
      <div className={`dv-bg ${theme === 'light' ? 'light' : ''}`}>
        <div className={`dv-card ${theme === 'light' ? 'light' : ''}`}>
          <h2>EPIC Images</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {Array.isArray(data) && data.length > 0 ? (
              data.slice(0, 12).map(item => (
                <img
                  key={item.identifier}
                  src={`https://epic.gsfc.nasa.gov/archive/natural/${item.date.split(' ')[0].replace(/-/g, '/')}/png/${item.image}.png`}
                  alt={item.caption}
                  style={{ width: 200 }}
                />
              ))
            ) : (
              <p>No images found.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (dataSource === 'neo') {
    // Flatten the NEO object into an array
    const neoArray = data.near_earth_objects
      ? Object.values(data.near_earth_objects).flat()
      : [];

    return (
      <div className={`dv-bg ${theme === 'light' ? 'light' : ''}`}>
        <div className={`dv-card ${theme === 'light' ? 'light' : ''}`}>
          <h2>Near Earth Objects</h2>
          {neoArray.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Diameter (m)</th>
                  <th>Hazardous?</th>
                  <th>Close Approach Date</th>
                </tr>
              </thead>
              <tbody>
                {neoArray.slice(0, 10).map(obj => (
                  <tr key={obj.id}>
                    <td>{obj.name}</td>
                    <td>{obj.estimated_diameter.meters.estimated_diameter_max.toFixed(1)}</td>
                    <td>{obj.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</td>
                    <td>{obj.close_approach_data[0]?.close_approach_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No NEO data found.</p>
          )}
        </div>
      </div>
    );
  }

  let recommendedImages = [];
  if (
    dataSource === 'images' &&
    data &&
    data.collection &&
    Array.isArray(data.collection.items) &&
    data.collection.items.length > 0
  ) {
    
    const allItems = data.collection.items.slice(12);
    recommendedImages = allItems
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(item => ({
        nasa_id: item.data[0].nasa_id,
        url: item.links?.[0]?.href,
        title: item.data[0].title,
      }));
  }

  if (dataSource === 'images') {
    return (
      <div className={`dv-bg ${theme === 'light' ? 'light' : ''}`}>
        <div className={`dv-card ${theme === 'light' ? 'light' : ''}`}>
          <h2>NASA Image and Video Library</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {Array.isArray(data.collection?.items) && data.collection.items.length > 0 ? (
              data.collection.items.slice(0, 12).map(item => (
                <div key={item.data[0].nasa_id}>
                  <img
                    src={item.links?.[0]?.href}
                    alt={item.data[0].title}
                    style={{ width: 200 }}
                  />
                  <div>{item.data[0].title}</div>
                </div>
              ))
            ) : (
              <p>No images found.</p>
            )}
          </div>
          {dataSource === 'images' && recommendedImages && recommendedImages.length > 0 && (
  <div className="dv-recommendations">
    <h3>You may also like:</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {recommendedImages.map(img => (
        <img key={img.nasa_id} src={img.url} alt={img.title} style={{ width: 120 }} />
      ))}
    </div>
  </div>
)}
        </div>
      </div>
    );
  }

  return <div>No visualization available for this data source.</div>;
};

export default DataVisualization;

const fetchApodRange = async (days, endDate) => {
  const end = endDate ? new Date(endDate) : new Date();
  const dateStrings = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(end);
    date.setDate(end.getDate() - i);
    dateStrings.push(date.toISOString().split('T')[0]);
  }
  // Fetch all APODs in parallel
  const results = await Promise.all(dateStrings.map(dateStr => getApod(dateStr)));
  return results;
};