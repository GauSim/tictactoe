import * as React from 'react';

export interface FieldState {
  fieldIdx: number;
  rowIdx: number;
  value: null | 'X' | 'O';
}

export class Field extends React.Component<{ onFieldClick: (x: FieldState) => any } & FieldState> {
  render() {
    return <div className="col" onClick={() => this.props.value ? void 0 : this.props.onFieldClick(this.props)}>
      {this.props.value}
    </div>;
  }
}