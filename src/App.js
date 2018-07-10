import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Form, FormGroup, Input, Label, Row, Table} from 'reactstrap';

export default class App extends Component {

    state = {
        filterValue: '',
        countries: []
    };

    serverData = [];

    filterChange = async (e) => {

        const newCountries = this.serverData.filter((country) => {
            return (country.name.toLowerCase()).indexOf(e.currentTarget.value.toLowerCase()) > -1
        });

        this.setState({
            filterValue: e.currentTarget.value,
            countries: newCountries
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

        const {filterValue, countries} = this.state;

        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col xs="5">
                            <Form className="mt-5">
                                <FormGroup>
                                    <Label for="filter">Filter Country</Label>
                                    <Input
                                        onChange={this.filterChange}
                                        type="text"
                                        name="filter"
                                        id="filter"
                                        placeholder="Filter Country"
                                        value={filterValue}
                                    />
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Table>
                        <thead>
                        <tr>
                            <th data-sort="first_name">
                                Country
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {countries.length ? countries.map((data) => (
                            <tr key={data.alpha3Code}>
                                <td>{data.name}</td>
                            </tr>
                        )) : (<tr><td>LOADING...</td></tr>)}
                        </tbody>
                    </Table>
                </Container>
            </React.Fragment>
        );
    }
}