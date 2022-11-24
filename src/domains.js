import {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './utils.js'


function DomainList() {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Origin','http://172.23.65.194:3000/');

  const [domain_data, setDomainData] = useState([]);
  useEffect(() => {
    fetch(`https://general.xianglous.workers.dev/popular-domains`)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      setDomainData(data.rankingEntries);
    })
    .catch((err) => {console.log(err)})
  }, []);
  return (
    <TableContainer component={Paper}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Table sx={{ minWidth: 400 }} size="medium" aria-label="domains">
        <TableHead>
          <TableRow key="header">
            <TableCell sx={{width: 100}}>Rank</TableCell>
            <TableCell>Domain</TableCell>
            <TableCell>Category</TableCell>
            <TableCell sx={{textAlign: "center"}}>Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {domain_data.map((data) => (
            <TableRow key={data.domain}>
              <TableCell>{data.rank + 1}</TableCell>
              <TableCell><a href={`https://${data.domain}`} target="_blank">{data.domain}</a></TableCell>
              <TableCell>{data.Category}</TableCell>
              <TableCell 
                sx={{
                  color: data.rankChange == 0 ? "black" : data.rankChange > 0 ? "green" : "red" ,
                  textAlign: "center",
                }}
              >{`${data.rankChange == 0 ? "--" : data.rankChange > 0 ? "\u25B2" : "\u25BC"}${data.rankChange ? Math.abs(data.rankChange) : ""}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default DomainList;