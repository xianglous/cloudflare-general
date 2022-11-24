import Plot from 'react-plotly.js';
import './traffic.css';
import { Stack, Switch } from '@mui/material';
import React, {useState, useEffect} from 'react'

class LabelFont extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.text, highlighted: props.highlighted };
  }

  // onChange() {
  //   this.setState({
  //     ...this.state, 
  //     highlighted: !this.state.highlighted,
  //   });
  // }
  componentDidUpdate(prevProps) {
    if (prevProps.highlighted !== this.props.highlighted)
      this.setState({
        ...this.state,
        highlighted: this.props.highlighted,
      });
  }

  render() {
    const { text, highlighted } = this.state;
    // this.setState({text: text, highlighted: !highlighted});
    return (
      <div style={{
        color: highlighted ? 'black' : 'lightgray',
        fontWeight: highlighted ? 'bold' : 'normal',
      }}>{text}</div>
    );
  }
}

function TrafficPlot() {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Origin','http://172.23.65.194:3000/');

  const [plot_data, setPlotData] = useState([]);
  const [plot_type, setPlotType] = useState("attack-layer3");

  useEffect(() => {
    const stored_data = localStorage.getItem(plot_type);
    if (stored_data != null) {
      setPlotData(JSON.parse(stored_data));
    }
    else {
      fetch(`https://general.xianglous.workers.dev/${plot_type}`)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        const stored_data = Object.entries(data.data).map(([key, val]) => ({
          x: val.timestamps,
          y: val.values,
          type: "scatter",
          name: key,
        }));
        localStorage.setItem(plot_type, JSON.stringify(stored_data));
        setPlotData(stored_data);
      })
      .catch((err) => {console.log(err)})
    }
  }, [plot_type]);
  return (
    <div 
      style = {{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <LabelFont text="Traffic Change" highlighted={plot_type === "traffic-change"}/>
        <Switch 
          defaultChecked 
          inputProps={{ 'aria-label': 'ant design' }} 
          onChange={(event) => {
            setPlotType(event.target.checked ? "attack-layer3" : "traffic-change");
          }}
        />
        <LabelFont text="Layer 3 DDoS Attack" highlighted={plot_type === "attack-layer3"}/>
      </Stack>
      <Plot 
        data={plot_data} 
        layout={{
          displaylogo: false,
          uirevision: true,
          margin: {t: 30},
        }}
      />
    </div>
  );
}


export default TrafficPlot;
