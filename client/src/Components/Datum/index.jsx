import React, { Component } from "react";
import { graphql } from "react-apollo";

export const Datum = readQuery => {
  const DataProvider = graphql(readQuery, {
    skip: typeof readQuery === "undefined",
    options: props => ({
      variables: {
        id: props.id,
      },
    }),
  });
  const DataWrapper = component => {
    const WithData = DataProvider(component);
    type Props = {
      id: string,
      params: {
        id: string,
      },
      match: {
        params: {
          id?: string,
        },
      },
    };
    class _Datum extends Component<Props> {
      render() {
        const id =
          typeof this.props.id === "undefined"
            ? this.props.match.params.id
            : this.props.id;

        return (
          <WithData {...this.props} id={id}>
            <Component />
          </WithData>
        );
      }
    }
    _Datum.defaultProps = {
      id: undefined,
      params: {
        id: undefined,
      },
    };
    return _Datum;
  };

  return DataWrapper;
};
