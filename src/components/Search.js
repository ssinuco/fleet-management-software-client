import React, {useContext, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Search.css';
import AppContext from "../context/AppContext";
import {useLazyQuery} from "@apollo/client";
import {TAXIS} from "../hoc/taxis";
import {POSITIONS} from "../hoc/positions";

const Search = () => {
    const INITIAL_DATE = '2008-02-02'
    const [date, setDate] = React.useState(INITIAL_DATE);
    const [taxi, setTaxi] = React.useState(null);
    const [taxiQuery, setTaxiQuery] = React.useState('');
    const [taxis, setTaxis] = React.useState([]);
    const { setPositions } = useContext(AppContext);
    const [getTaxis, { data: taxisResponse }] = useLazyQuery(TAXIS);
    const [getPositions, { data: positionsResponse }] = useLazyQuery(POSITIONS);

    const onClickView = () => {
        getPositions({ variables: { taxiId: taxi.id, date: date } });
    }

    useEffect(() => {
        let active = true;

        if (taxiQuery === '') {
            setTaxis(taxi ? [taxi] : []);
            return undefined;
        }

        getTaxis({ variables: { query: taxiQuery, page: 1, pageSize: 10 } });

        return () => {
            active = false;
        };
    }, [taxi, taxiQuery]);

    useEffect(() => {
        if(!taxisResponse){
            return;
        }
        let newOptions = [];
        if (taxisResponse.taxis) {
            newOptions = [...taxisResponse.taxis];
        }
        setTaxis(newOptions);
    }, [taxisResponse])

    useEffect(() => {
        if(!positionsResponse){
            return;
        }
        setPositions(positionsResponse.trajectories);
    }, [positionsResponse])

    return (
        <div className="container">
            <Autocomplete
                id="combo-box-demo"
                className="autocomplete"
                options={taxis}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.plate)}
                onChange={(event, newValue) => {
                    setTaxis(newValue ? [newValue, ...taxis] : taxis);
                    setTaxi(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    setTaxiQuery(newInputValue);
                }}
                renderInput={
                    (params) => <TextField {...params} label="Taxi's plate" variant="outlined"/>
                }
            />

            <TextField
                id="date"
                type="date"
                defaultValue={INITIAL_DATE}
                format="yyyy-MM-dd"
                onChange={e => setDate(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={onClickView}>
                View
            </Button>
            <Button variant="contained">
                Export
            </Button>
        </div>
    );
}
export default Search;
