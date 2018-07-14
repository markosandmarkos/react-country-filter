import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Input, Table} from 'reactstrap';

export default class App extends Component {

    theadInfo = [
        {
            name: 'Country',
            type: 'name',
            value: ''
        },
        {
            name: 'Capital',
            type: 'capital',
            value: ''
        },
        {
            name: 'Alpha3Code',
            type: 'alpha3Code',
            value: ''
        },
        {
            name: 'Alpha2Code',
            type: 'alpha2Code',
            value: ''
        },
    ];

    state = {
        countries: [],
        theadInfo: this.theadInfo
    };

    serverData = [];

    filterChange = (e) => {

        let newCountries = this.serverData.filter((country) => {
            return (country[e.currentTarget.dataset.type].toLowerCase()).indexOf(e.currentTarget.value.toLowerCase()) > -1
        });

        this.theadInfo[e.currentTarget.dataset.someKey].value = e.currentTarget.value;

        newCountries = newCountries.length ? newCountries : [{name: 'Not Found'}];

        this.setState({
            filterValue: e.currentTarget.value,
            countries: newCountries,
            theadInfo: this.theadInfo
        });

    };

    componentDidMount = async () => {

        const COUNTRY_URL = 'https://restcountries.eu/rest/v2/all';
        const result = await fetch(COUNTRY_URL);
        this.serverData = await result.json();

        this.setState({
            countries: this.serverData
        });
    };

    render() {

        const {countries, theadInfo} = this.state;

        return (
            <React.Fragment>
                <Container>
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            {theadInfo.map((value, key) => {
                                return (
                                    <th key={value.name}>
                                        {value.name}
                                        <Input
                                            data-some-key={key}
                                            data-type={value.type}
                                            onChange={this.filterChange}
                                            type="text"
                                            name="filter"
                                            id="filter"
                                            placeholder="Filter"
                                            value={value.value}
                                        />
                                    </th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {countries.length ? countries.map((data, key) => (
                            <tr key={data.alpha3Code}>
                                <td>{++key}</td>
                                <td>{data.name}</td>
                                <td>{data.capital}</td>
                                <td>{data.alpha3Code}</td>
                                <td>{data.alpha2Code}</td>
                            </tr>
                        )) : (<tr>
                            <td>LOADING...</td>
                        </tr>)}
                        </tbody>
                    </Table>
                </Container>
            </React.Fragment>
        );
    }
}