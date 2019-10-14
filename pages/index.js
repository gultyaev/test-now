import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

const Home = () => {
  const [time, setTime] = useState(null);
  const [list, setList] = useState(null);
  const [localTiming, setLocalTiming] = useState(null);

  useEffect(() => {
    const start = performance.now();

    async function getElephant() {
      const res = await fetch('/api/elephant');
      const json = await res.json();

      setTime(json.data.time);
      setList(json.data.list);

      const localTiming = performance.now() - start;

      setLocalTiming(
        `${Math.round(localTiming / 1000)}s | ${localTiming}ms`
      );
    }

    getElephant();
  }, []);

  return (
    <div>
      <div>
        <h2>ElephantSQL timing:</h2>
        {
          time
            ? <span><b>{time}</b></span>
            : <span className="loading"></span>
        }

        <br/>

        <h2>Result:</h2>
        {
          list
            ? <ul>{
              list.map((e, i) => <li key={i}>{e.name}</li>)
            }</ul>
            : <span className="loading"></span>
        }

        <br/>

        <h2>HTTP request timing:</h2>
        {
          localTiming
            ? <span><b>{localTiming}</b></span>
            : <span className="loading"></span>
        }
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .date {
          height: 24px;
          max-width: calc(100% - 32px)
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
        }
        .date p {
          text-align: center;
        }
        .date span {
          width: 176px;
          text-align: center;
        }
        @keyframes Loading {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }
        .date .loading {
          max-width: 100%;
          height: 24px;
          border-radius: 4px;
          display: inline-block;
          background: linear-gradient(270deg, #D1D1D1, #EAEAEA);
          background-size: 200% 200%;
          animation: Loading 2s ease infinite;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  )
}

export default Home
