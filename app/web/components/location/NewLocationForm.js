/*global SyntheticEvent*/
/**
 *
 * @flow
 */

"use strict";

import type {Response as JSONResponse} from '~/app/api/routes/BaseJsonApiRoute';
import type {LocationDataMutableFields} from '~/app/lib/models/Location';
import type {Node as ReactNode} from 'react';

type FieldType = {
  error: ?string,
  value: string,
};

type FormComponentElement =
  | HTMLInputElement
  | HTMLSelectElement;

type Props = {
  onSubmitComplete: (response: ?JSONResponse, e: ?string) => void;
};

type LocationDataInputs = {
  location: FieldType,
  state: FieldType,
  suggestedBy: FieldType,
}

type State = {
} & LocationDataInputs;

const ApiLocationURIBuilder = require('~/app/generated/routes/ApiLocationURIBuilder');
const AsyncRequest = require('~/app/lib/util/AsyncRequest');
const Button = require('~/app/web/components/global/Button');
const React = require('react');

const cx = require('classNames');
const style = require('~/app/static_src/css/NewLocationForm.css');
const globalstyle = require('~/app/static_src/css/global.css');

const profileNames = [
  'Kristine', 'Tim',
];

const states = [
  'AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU',
  'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN',
  'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK',
  'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA',
  'WI', 'WV', 'WY',
];

class NewLocationForm extends React.Component<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      location: {
        error: null,
        value: '',
      },
      state: {
        error: null,
        value: '',
      },
      suggestedBy: {
        error: null,
        value: '',
      },
    };
  }

  _convertFieldsToMutableData(input: LocationDataInputs): LocationDataMutableFields {
    let hasErrors = false;
    const output = {};
    const updatedInputs = {};
    Object
      .keys(input)
      .filter(key => ['location', 'state', 'suggestedBy'].includes(key))
      .forEach(key => {
        if (this._isEmptyString(input[key].value)) {
          hasErrors = true;
          updatedInputs[key] = input[key];
          updatedInputs[key].error = `${key} is required`;
        } else {
          const outputKey = key !== 'location' ? key : 'locationname';
          output[outputKey] = input[key].value;
        }
      });

    if (hasErrors) {
      this.setState(updatedInputs);
      throw new Error('Cannot convert input to LocationDataMutableFields');
    }

    return output;
  }

  _handleSubmit = (e: SyntheticEvent<>): void => {
    e.preventDefault();
    try {
      const data = this._convertFieldsToMutableData(this.state);
      // @TODO need to set a loading state here.
      // loading state in the state object will mess up the current structure a
      // bit it *should* be handled well but its better to introduce redux
      const locationApiRoute = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('locationname', data.locationname)
        .setParam('state', data.state)
        .toString()
      new AsyncRequest(locationApiRoute)
        .setData(data)
        .post()
        .then((response: JSONResponse) => {
          this.props.onSubmitComplete(response);
        })
        .catch((e: string) => {
          this.props.onSubmitComplete(undefined, e);
        });
    } catch (e) {
      console.error(e, this.state);
    }
  }

  _handleInputChange = (e: SyntheticEvent<FormComponentElement>): void => {
    const input = e.currentTarget;
    const name = input.name;
    const value = input.value;
    const error = !this._isEmptyString(value) ? null : `${name} is required`;

    this.setState({
      [name]: {
        error,
        value,
      },
    });
  };

  _isEmptyString(value: ?string): boolean {
    return (value === null || value === '');
  }

  render(): ReactNode {
    const {
      location,
      state,
      suggestedBy,
    } = this.state;
    return (
      <form
        className={cx(style.root)}
        onSubmit={this._handleSubmit}
      >
        <label className={cx(style.label)}>
          <span>City/Metro area</span>
          <input
            className={cx(style.input)}
            name="location"
            onChange={this._handleInputChange}
            required={true}
            type="text"
            value={location.value}
          />
          <span
            className={cx({
              [style.error]: true,
              [globalstyle.hidden]: !location.error,
            })}
          >
            {location.error}
          </span>
        </label>
        <label className={cx(style.label)}>
          <span>State</span>
          <select
            className={cx(style.select)}
            name="state"
            onChange={this._handleInputChange}
            required={true}
            value={state.value}
          >
            <option>Select a state</option>
            {states.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <span
            className={cx({
              [style.error]: true,
              [globalstyle.hidden]: !state.error,
            })}
          >
            {state.error}
          </span>
        </label>
        <label className={cx(style.label)}>
          <span>Suggested By</span>
          <select
            className={cx(style.select)}
            name="suggestedBy"
            onChange={this._handleInputChange}
            required={true}
            value={suggestedBy.value}
          >
            <option>Select a person</option>
            {profileNames.map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <span
            className={cx({
              [style.error]: true,
              [globalstyle.hidden]: !suggestedBy.error,
            })}
          >
            {suggestedBy.error}
          </span>
        </label>
        <div className={cx(style.actions)}>
          <Button
            className={cx(style.submit)}
            href="#"
            onClick={this._handleSubmit}
            theme={Button.theme.GREEN}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

module.exports = NewLocationForm;
