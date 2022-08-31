import './spinner.css';

interface ISpinnerProps {
  top: number;
  left: number;
}

export default function Spinner({ top, left }: ISpinnerProps): JSX.Element {
  return (
    <div 
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
      className='spinner-border main-spinner'
      role='status'
    />
  )
}
