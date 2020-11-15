import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';


const Metrics: React.FC = (props: HighchartsReact.Props) => {

  const [scoreData, setScoreData] = useState<number[]>([]);

  useEffect(() => {

    api.get('machines/score').then((response) => {

      setScoreData(response.data);

    }).catch(() => {

      alert('Network error');

    });

  }, []);

  const options: Highcharts.Options = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Health score metrics'
    },
    legend: {
      enabled: true,
      title: {
        text: 'Score categories'
      }
    },
    series: [{
      type: 'bar',
      name: 'Estável',
      data: [scoreData[0]]
    }, {
      type: 'bar',
      name: 'Em alerta',
      data: [scoreData[1]]
    }, {
      type: 'bar',
      name: 'Crítico',
      data: [scoreData[2]]
    }]
  };

  return (

    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        {...props}
      />
    </>

  );

};

export default Metrics;
