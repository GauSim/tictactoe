import * as React from 'react';
export type PlayerState = null | 'X' | 'O';
export interface FieldState {
  idx: number;
  value: PlayerState;
  isCommited: boolean;
}

export class Field extends React.Component<{
  onClick: (x: FieldState) => any,
  onMouseEnter: (x: FieldState) => any,
  onMouseLeave: (x: FieldState) => any,
  highlight: boolean;
} & FieldState> {
  hover: boolean = false;
  render() {
    return <div
      className="col"
      onMouseEnter={() => this.props.onMouseEnter(this.props)}
      onMouseLeave={() => this.props.onMouseLeave(this.props)}
      onClick={() => this.props.onClick(this.props)}
    >
      {this.props.highlight ? 'YEAH' : ''}
      {this.props.isCommited ? this.props.value : `?${this.props.value}?`}
    </div>;
  }
}